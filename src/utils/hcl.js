const isPlainObject = (value) => {
    return (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value)
    );
};

const skipWhitespace = (input, state) => {
    while (state.pos < input.length) {
        const char = input[state.pos];

        if (/\s/.test(char)) {
            state.pos++;
            continue;
        }

        // # comment
        if (char === '#') {
            while (
                state.pos < input.length &&
                input[state.pos] !== '\n'
                ) {
                state.pos++;
            }

            continue;
        }

        // // comment
        if (
            char === '/' &&
            input[state.pos + 1] === '/'
        ) {
            state.pos += 2;

            while (
                state.pos < input.length &&
                input[state.pos] !== '\n'
                ) {
                state.pos++;
            }

            continue;
        }

        // /* comment */
        if (
            char === '/' &&
            input[state.pos + 1] === '*'
        ) {
            state.pos += 2;

            while (
                state.pos < input.length &&
                !(
                    input[state.pos] === '*' &&
                    input[state.pos + 1] === '/'
                )
                ) {
                state.pos++;
            }

            if (state.pos >= input.length) {
                throw new Error('Unclosed block comment');
            }

            state.pos += 2;
            continue;
        }

        break;
    }
};

const parseIdentifier = (input, state) => {
    skipWhitespace(input, state);

    const start = state.pos;

    while (
        state.pos < input.length &&
        /[A-Za-z0-9_-]/.test(input[state.pos])
        ) {
        state.pos++;
    }

    if (start === state.pos) {
        throw new Error(`Expected identifier at position ${state.pos}`);
    }

    return input.substring(start, state.pos);
};

const parseString = (input, state) => {
    skipWhitespace(input, state);

    if (input[state.pos] !== '"') {
        throw new Error(`Expected string at position ${state.pos}`);
    }

    state.pos++;

    let result = '';

    while (state.pos < input.length) {
        const char = input[state.pos];

        if (char === '"') {
            state.pos++;
            return result;
        }

        if (char === '\\') {
            const next = input[state.pos + 1];

            const escapes = {
                n: '\n',
                r: '\r',
                t: '\t',
                '"': '"',
                '\\': '\\'
            };

            if (escapes[next] !== undefined) {
                result += escapes[next];
                state.pos += 2;
                continue;
            }
        }

        result += char;
        state.pos++;
    }

    throw new Error('Unclosed string');
}

const parseValue = (input, state) => {
    skipWhitespace(input, state);

    const char = input[state.pos];

    // String
    if (char === '"') {
        return parseString(input, state);
    }

    // Array
    if (char === '[') {
        return parseArray(input, state);
    }

    // Object
    if (char === '{') {
        return parseObjectValue(input, state);
    }

    // Number
    const numberMatch = input
        .substring(state.pos)
        .match(/^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/);

    if (numberMatch) {
        state.pos += numberMatch[0].length;

        return Number(numberMatch[0]);
    }

    // Boolean / null / identifier
    const identifier = parseIdentifier(input, state);

    if (identifier === 'true') {
        return true;
    }

    if (identifier === 'false') {
        return false;
    }

    if (identifier === 'null') {
        return null;
    }

    // Unsupported expression
    throw new Error(
        `Unsupported HCL expression: ${identifier}`
    );
}

const parseArray = (input, state) => {
    state.pos++;

    const result = [];

    while (true) {
        skipWhitespace(input, state);

        if (input[state.pos] === ']') {
            state.pos++;
            break;
        }

        result.push(parseValue(input, state));

        skipWhitespace(input, state);

        if (input[state.pos] === ',') {
            state.pos++;
            continue;
        }

        if (input[state.pos] === ']') {
            state.pos++;
            break;
        }

        throw new Error(
            `Expected ',' or ']' at position ${state.pos}`
        );
    }

    return result;
}

const parseObjectValue = (input, state) => {
    state.pos++;

    const result = {};

    while (true) {
        skipWhitespace(input, state);

        if (input[state.pos] === '}') {
            state.pos++;
            break;
        }

        let key;

        if (input[state.pos] === '"') {
            key = parseString(input, state);
        } else {
            key = parseIdentifier(input, state);
        }

        skipWhitespace(input, state);

        if (
            input[state.pos] !== '=' &&
            input[state.pos] !== ':'
        ) {
            throw new Error(
                `Expected '=' or ':' at position ${state.pos}`
            );
        }

        state.pos++;

        const value = parseValue(input, state);

        if (Object.prototype.hasOwnProperty.call(result, key)) {
            throw new Error(`Duplicate property: ${key}`);
        }

        result[key] = value;

        skipWhitespace(input, state);

        if (input[state.pos] === ',') {
            state.pos++;
        }
    }

    return result;
}

const parseBody = (input, state, stopAtBrace = false) => {
    const result = {};

    while (state.pos < input.length) {
        skipWhitespace(input, state);

        if (
            stopAtBrace &&
            input[state.pos] === '}'
        ) {
            state.pos++;
            break;
        }

        if (state.pos >= input.length) {
            break;
        }

        const name = parseIdentifier(input, state);

        skipWhitespace(input, state);

        // Attribute
        if (input[state.pos] === '=') {
            state.pos++;

            const value = parseValue(input, state);

            if (
                Object.prototype.hasOwnProperty.call(
                    result,
                    name
                )
            ) {
                throw new Error(
                    `Duplicate attribute: ${name}`
                );
            }

            result[name] = value;

            continue;
        }

        // Block
        const labels = [];

        while (true) {
            skipWhitespace(input, state);

            if (input[state.pos] === '"') {
                labels.push(parseString(input, state));
                continue;
            }

            if (
                /[A-Za-z_]/.test(
                    input[state.pos] || ''
                )
            ) {
                labels.push(
                    parseIdentifier(input, state)
                );
                continue;
            }

            break;
        }

        skipWhitespace(input, state);

        if (input[state.pos] !== '{') {
            throw new Error(
                `Expected '=' or '{' at position ${state.pos}`
            );
        }

        state.pos++;

        const block = parseBody(
            input,
            state,
            true
        );

        if (labels.length === 0) {
            if (
                Object.prototype.hasOwnProperty.call(
                    result,
                    name
                )
            ) {
                throw new Error(
                    `Duplicate block: ${name}`
                );
            }

            result[name] = block;
            continue;
        }

        let target = result;

        if (!target[name]) {
            target[name] = {};
        }

        target = target[name];

        labels.forEach((label, index) => {
            if (index === labels.length - 1) {
                if (
                    Object.prototype.hasOwnProperty.call(
                        target,
                        label
                    )
                ) {
                    throw new Error(
                        `Duplicate block: ${name} ${labels.join(' ')}`
                    );
                }

                target[label] = block;
                return;
            }

            if (!target[label]) {
                target[label] = {};
            }

            target = target[label];
        });
    }

    return result;
}

const parseHcl = (input) => {
    if (typeof input !== 'string') {
        throw new Error('HCL input must be a string');
    }

    const state = {
        pos: 0
    };

    return parseBody(input, state);
};

const formatHclString = (value) => {
    return JSON.stringify(value);
};

const formatHclValue = (value, indent = 0) => {
    if (value === null) {
        return 'null';
    }

    if (typeof value === 'string') {
        return formatHclString(value);
    }

    if (typeof value === 'boolean') {
        return value ? 'true' : 'false';
    }

    if (typeof value === 'number') {
        if (!Number.isFinite(value)) {
            throw new Error(
                'HCL does not support non-finite numbers'
            );
        }

        return String(value);
    }

    if (Array.isArray(value)) {
        if (value.length === 0) {
            return '[]';
        }

        return `[${value
            .map(item => formatHclValue(item, indent))
            .join(', ')}]`;
    }

    if (isPlainObject(value)) {
        const spaces = ' '.repeat(indent + 2);
        const closingSpaces = ' '.repeat(indent);

        const entries = Object.entries(value)
            .map(([key, item]) => {
                return `${spaces}${key} = ${formatHclValue(
                    item,
                    indent + 2
                )}`;
            })
            .join('\n');

        return `{\n${entries}\n${closingSpaces}}`;
    }

    throw new Error(
        `Unsupported JavaScript type: ${typeof value}`
    );
}

const toHcl = (object, indent = 0) => {
    if (!isPlainObject(object)) {
        throw new Error(
            'HCL root must be a plain JavaScript object'
        );
    }

    const spaces = ' '.repeat(indent);

    const attributes = [];
    const blocks = [];

    Object.entries(object).forEach(([key, value]) => {
        if (isPlainObject(value)) {
            blocks.push({
                key,
                value
            });

            return;
        }

        attributes.push(
            `${spaces}${key} = ${formatHclValue(value, indent)}`
        );
    });

    const result = [];

    result.push(...attributes);

    blocks.forEach(({ key, value }) => {
        result.push(
            `${spaces}${key} {`
        );

        Object.entries(value).forEach(([childKey, childValue]) => {
            if (isPlainObject(childValue)) {
                result.push(
                    toHcl(
                        {
                            [childKey]: childValue
                        },
                        indent + 2
                    )
                );
            } else {
                result.push(
                    `${' '.repeat(indent + 2)}${childKey} = ${formatHclValue(
                        childValue,
                        indent + 2
                    )}`
                );
            }
        });

        result.push(`${spaces}}`);
    });

    return result.join('\n');
}

const minifyHcl = (input) => {
    if (typeof input !== 'string') {
        throw new Error('HCL input must be a string');
    }

    const lines = input
        .replace(/\r\n?/g, '\n')
        .split('\n');

    const result = [];

    let inBlockComment = false;

    lines.forEach(line => {
        let current = '';
        let inString = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const next = line[i + 1];

            if (inBlockComment) {
                if (char === '*' && next === '/') {
                    inBlockComment = false;
                    i++;
                }

                continue;
            }

            if (
                !inString &&
                char === '/' &&
                next === '*'
            ) {
                inBlockComment = true;
                i++;
                continue;
            }

            if (
                !inString &&
                char === '#'
            ) {
                break;
            }

            if (
                !inString &&
                char === '/' &&
                next === '/'
            ) {
                break;
            }

            if (char === '"' && line[i - 1] !== '\\') {
                inString = !inString;
            }

            current += char;
        }

        current = current.trim();

        if (current !== '') {
            current = current
                .replace(/\s*=\s*/g, '=')
                .replace(/\s*{\s*/g, '{')
                .replace(/\s*}\s*/g, '}')
                .replace(/\s*,\s*/g, ',');

            result.push(current);
        }
    });

    return result.join('\n');
};

const beautifyHcl = (input) => {
    if (typeof input !== 'string') {
        throw new Error('HCL input must be a string');
    }

    const object = parseHcl(input);

    return toHcl(object);
};

const validateHcl = (input) => {
    if (typeof input !== 'string') {
        return {
            ok: false,
            error: 'HCL input must be a string'
        };
    }

    if (input.trim() === '') {
        return {
            ok: false,
            error: 'HCL input is empty'
        };
    }

    try {
        parseHcl(input);

        return {
            ok: true,
            error: null
        };
    } catch (error) {
        return {
            ok: false,
            error: error.message
        };
    }
};

export  {
    parseHcl,
    toHcl,
    minifyHcl,
    beautifyHcl,
    validateHcl,
}