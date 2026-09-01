const parsePropertiesValue = (value) => {
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
};

const setNestedProperty = (object, path, value) => {
    const keys = path.split('.');

    let current = object;

    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            if (Object.prototype.hasOwnProperty.call(current, key)) {
                throw new Error(`Duplicate property: ${path}`);
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
            throw new Error(`Property conflict: ${path}`);
        }

        current = current[key];
    });
};

const unescapePropertiesValue = (value) => {
    return value
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\f/g, '\f')
        .replace(/\\\\/g, '\\')
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'");
};

const parseProperties = (input) => {
    if (typeof input !== 'string') {
        throw new Error('Properties input must be a string');
    }

    const result = {};

    const lines = input.replace(/\r\n?/g, '\n').split('\n');

    lines.forEach((line, index) => {
        const trimmed = line.trim();

        // Empty line
        if (trimmed === '') {
            return;
        }

        // Comment
        if (trimmed.startsWith('#') || trimmed.startsWith('!')) {
            return;
        }

        // Find first separator
        const separatorMatch = trimmed.match(/[=:]/);

        if (!separatorMatch) {
            throw new Error(`Invalid properties syntax at line ${index + 1}`);
        }

        const separatorIndex = separatorMatch.index;

        const key = trimmed
            .substring(0, separatorIndex)
            .trim();

        let value = trimmed
            .substring(separatorIndex + 1)
            .trim();

        if (!key) {
            throw new Error(`Empty property key at line ${index + 1}`);
        }

        value = unescapePropertiesValue(value);

        setNestedProperty(
            result,
            key,
            parsePropertiesValue(value)
        );
    });

    return result;
}

const flattenPropertiesObject = (object, prefix = '', result = {}) => {
    Object.entries(object).forEach(([key, value]) => {
        const propertyName = prefix
            ? `${prefix}.${key}`
            : key;

        if (
            value !== null &&
            typeof value === 'object' &&
            !Array.isArray(value)
        ) {
            flattenPropertiesObject(
                value,
                propertyName,
                result
            );

            return;
        }

        result[propertyName] = value;
    });

    return result;
}

const formatPropertiesValue = (value) => {
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
        return value
            .replace(/\\/g, '\\\\')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t')
            .replace(/"/g, '\\"');
    }

    throw new Error(
        `Unsupported properties value type: ${typeof value}`
    );
}

const toProperties = (object) => {
    if (
        object === null ||
        typeof object !== 'object' ||
        Array.isArray(object)
    ) {
        throw new Error('Properties root must be a plain object');
    }

    const flattened = flattenPropertiesObject(object);

    return Object.entries(flattened)
        .map(([key, value]) => {
            return `${key}=${formatPropertiesValue(value)}`;
        })
        .join('\n');
}

const minifyProperties = (input) => {
    if (typeof input !== 'string') {
        throw new Error('Properties input must be a string');
    }

    return input
        .replace(/\r\n?/g, '\n')
        .split('\n')
        .map(line => line.trim())
        .filter(line => {
            return (
                line !== '' &&
                !line.startsWith('#') &&
                !line.startsWith('!')
            );
        })
        .map(line => {
            const separator = line.match(/[=:]/);

            if (!separator) {
                return line;
            }

            const index = separator.index;

            const key = line
                .substring(0, index)
                .trim();

            const value = line
                .substring(index + 1)
                .trim();

            return `${key}=${value}`;
        })
        .join('\n');
}

const beautifyProperties = (input) => {
    if (typeof input !== 'string') {
        throw new Error('Properties input must be a string');
    }

    const lines = input
        .replace(/\r\n?/g, '\n')
        .split('\n');

    const result = [];

    lines.forEach(line => {
        const trimmed = line.trim();

        if (trimmed === '') {
            return;
        }

        if (
            trimmed.startsWith('#') ||
            trimmed.startsWith('!')
        ) {
            result.push(trimmed);
            return;
        }

        const separator = trimmed.match(/[=:]/);

        if (!separator) {
            result.push(trimmed);
            return;
        }

        const index = separator.index;

        const key = trimmed
            .substring(0, index)
            .trim();

        const value = trimmed
            .substring(index + 1)
            .trim();

        result.push(`${key} = ${value}`);
    });

    return result.join('\n');
}

const validateProperties = (input) => {
    if (typeof input !== 'string') {
        return {
            ok: false,
            error: 'Properties input must be a string'
        };
    }

    if (input.trim() === '') {
        return {
            ok: false,
            error: 'Properties input is empty'
        };
    }

    try {
        parseProperties(input);

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

export {
    parseProperties,
    toProperties,
    minifyProperties,
    validateProperties,
    beautifyProperties
}