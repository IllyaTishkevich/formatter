const stripLeadingQuestionMark = (input) => {
    const trimmed = input.trim();

    return trimmed.startsWith('?') ? trimmed.slice(1) : trimmed;
}

const normalizeQueryInput = (input) => {
    return stripLeadingQuestionMark(input)
        .replace(/\r\n?/g, '\n')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => line.startsWith('&') ? line.slice(1) : line)
        .join('&');
}

const parseQueryValue = (value) => {
    if (value === '') {
        return '';
    }

    if (value === 'true') {
        return true;
    }

    if (value === 'false') {
        return false;
    }

    if (value === 'null') {
        return null;
    }

    if (/^-?\d+(?:\.\d+)?$/.test(value)) {
        return Number(value);
    }

    return value;
}

const setQueryValue = (target, path, value) => {
    const keys = path.split('.');

    let current = target;

    keys.forEach((key, index) => {
        const isLast = index === keys.length - 1;

        if (isLast) {
            if (Object.prototype.hasOwnProperty.call(current, key)) {
                const existing = current[key];
                current[key] = Array.isArray(existing) ? [...existing, value] : [existing, value];
            } else {
                current[key] = value;
            }

            return;
        }

        if (
            !Object.prototype.hasOwnProperty.call(current, key) ||
            current[key] === null ||
            typeof current[key] !== 'object' ||
            Array.isArray(current[key])
        ) {
            current[key] = {};
        }

        current = current[key];
    });
}

const parseQueryString = (input) => {
    if (typeof input !== 'string') {
        throw new Error('Query string input must be a string');
    }

    const normalized = normalizeQueryInput(input);

    if (normalized === '') {
        throw new Error('Query string is empty');
    }

    const params = new URLSearchParams(normalized);
    const result = {};

    for (const [key] of params.entries()) {
        if (key === '') {
            throw new Error('Query string contains an empty parameter name');
        }
    }

    for (const [key, value] of params.entries()) {
        setQueryValue(result, key, parseQueryValue(value));
    }

    return result;
}

const flattenQueryObject = (object, prefix = '', result = {}) => {
    Object.entries(object).forEach(([key, value]) => {
        const name = prefix
            ? `${prefix}.${key}`
            : key;

        if (Array.isArray(value)) {
            value.forEach(item => appendQueryEntry(result, name, item));
            return;
        }

        if (value !== null && typeof value === 'object') {
            flattenQueryObject(value, name, result);
            return;
        }

        appendQueryEntry(result, name, value);
    });

    return result;
}

const appendQueryEntry = (result, name, value) => {
    if (!Object.prototype.hasOwnProperty.call(result, name)) {
        result[name] = [];
    }

    result[name].push(formatQueryValue(value));
}

const formatQueryValue = (value) => {
    if (value === null) {
        return 'null';
    }

    if (typeof value === 'boolean') {
        return value ? 'true' : 'false';
    }

    if (typeof value === 'number') {
        return String(value);
    }

    if (typeof value === 'string') {
        return value;
    }

    throw new Error(
        `Unsupported query string value type: ${typeof value}`
    );
}

const toQueryString = (data) => {
    if (
        data === null ||
        typeof data !== 'object' ||
        Array.isArray(data)
    ) {
        throw new Error('Query string root must be a plain object');
    }

    const grouped = flattenQueryObject(data);
    const params = new URLSearchParams();

    Object.entries(grouped).forEach(([key, values]) => {
        values.forEach(value => params.append(key, value));
    });

    return params.toString();
}

const minifyQueryString = (input) => {
    if (typeof input !== 'string') {
        throw new Error('Query string input must be a string');
    }

    return normalizeQueryInput(input);
}

const beautifyQueryString = (input) => {
    if (typeof input !== 'string') {
        throw new Error('Query string input must be a string');
    }

    const normalized = normalizeQueryInput(input);

    if (normalized === '') {
        return '';
    }

    return normalized
        .split('&')
        .map((pair, index) => index === 0 ? pair : `&${pair}`)
        .join('\n');
}

const validateQueryString = (input) => {
    if (typeof input !== 'string') {
        return {
            ok: false,
            error: 'Query string input must be a string'
        };
    }

    if (input.trim() === '') {
        return {
            ok: false,
            error: 'Query string is empty'
        };
    }

    try {
        parseQueryString(input);

        return {
            ok: true
        };
    } catch (error) {
        return {
            ok: false,
            error: error.message
        };
    }
};

export {
    parseQueryString,
    toQueryString,
    minifyQueryString,
    beautifyQueryString,
    validateQueryString
}
