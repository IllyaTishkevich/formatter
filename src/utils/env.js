const setNestedEnvProperty = (object, path, value) => {
    const keys = path.split('.');

    let current = object;

    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            if (Object.prototype.hasOwnProperty.call(current, key)) {
                throw new Error(`Duplicate variable: ${path}`);
            }

            current[key] = value;
            return;
        }

        if (!Object.prototype.hasOwnProperty.call(current, key)) {
            current[key] = {};
        }

        if (
            current[key] === null ||
            typeof current[key] !== 'object' ||
            Array.isArray(current[key])
        ) {
            throw new Error(`Variable conflict: ${path}`);
        }

        current = current[key];
    });
};

const unescapeEnvValue = (value) => {
    return value
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\\\/g, '\\')
        .replace(/\\"/g, '"');
};

const parseEnvValue = (raw) => {
    const value = raw.trim();

    if (value === '') {
        return '';
    }

    const singleQuoted = /^'([\s\S]*)'$/.exec(value);
    if (singleQuoted) {
        return singleQuoted[1];
    }

    const doubleQuoted = /^"([\s\S]*)"$/.exec(value);
    if (doubleQuoted) {
        return unescapeEnvValue(doubleQuoted[1]);
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
};

const parseEnv = (input) => {
    if (typeof input !== 'string') {
        throw new Error('ENV input must be a string');
    }

    const result = {};

    const lines = input.replace(/\r\n?/g, '\n').split('\n');

    lines.forEach((line, index) => {
        let trimmed = line.trim();

        if (trimmed === '') {
            return;
        }

        if (trimmed.startsWith('#')) {
            return;
        }

        if (trimmed.startsWith('export ')) {
            trimmed = trimmed.slice('export '.length).trim();
        }

        const separatorIndex = trimmed.indexOf('=');

        if (separatorIndex === -1) {
            throw new Error(`Invalid ENV syntax at line ${index + 1}`);
        }

        const key = trimmed
            .substring(0, separatorIndex)
            .trim();

        const rawValue = trimmed.substring(separatorIndex + 1);

        if (!key) {
            throw new Error(`Empty variable name at line ${index + 1}`);
        }

        if (!/^[A-Za-z_][A-Za-z0-9_.]*$/.test(key)) {
            throw new Error(`Invalid variable name "${key}" at line ${index + 1}`);
        }

        setNestedEnvProperty(
            result,
            key,
            parseEnvValue(rawValue)
        );
    });

    return result;
}

const flattenEnvObject = (object, prefix = '', result = {}) => {
    Object.entries(object).forEach(([key, value]) => {
        const name = prefix
            ? `${prefix}.${key}`
            : key;

        if (
            value !== null &&
            typeof value === 'object' &&
            !Array.isArray(value)
        ) {
            flattenEnvObject(
                value,
                name,
                result
            );

            return;
        }

        result[name] = value;
    });

    return result;
}

const formatEnvValue = (value) => {
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
        if (value === '' || /[\s#"\\]/.test(value)) {
            const escaped = value
                .replace(/\\/g, '\\\\')
                .replace(/"/g, '\\"')
                .replace(/\n/g, '\\n')
                .replace(/\r/g, '\\r')
                .replace(/\t/g, '\\t');

            return `"${escaped}"`;
        }

        return value;
    }

    throw new Error(
        `Unsupported ENV value type: ${typeof value}`
    );
}

const toEnv = (object) => {
    if (
        object === null ||
        typeof object !== 'object' ||
        Array.isArray(object)
    ) {
        throw new Error('ENV root must be a plain object');
    }

    const flattened = flattenEnvObject(object);

    return Object.entries(flattened)
        .map(([key, value]) => {
            return `${key}=${formatEnvValue(value)}`;
        })
        .join('\n');
}

const minifyEnv = (input) => {
    if (typeof input !== 'string') {
        throw new Error('ENV input must be a string');
    }

    return input
        .replace(/\r\n?/g, '\n')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '' && !line.startsWith('#'))
        .join('\n');
}

const beautifyEnv = (input) => {
    if (typeof input !== 'string') {
        throw new Error('ENV input must be a string');
    }

    return input
        .replace(/\r\n?/g, '\n')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '')
        .join('\n');
}

const validateEnv = (input) => {
    if (typeof input !== 'string') {
        return {
            ok: false,
            error: 'ENV input must be a string'
        };
    }

    if (input.trim() === '') {
        return {
            ok: false,
            error: 'ENV document is empty'
        };
    }

    try {
        parseEnv(input);

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
    parseEnv,
    toEnv,
    minifyEnv,
    beautifyEnv,
    validateEnv
}
