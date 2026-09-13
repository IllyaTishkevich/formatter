export const parseIni = (input) => {
    const result = {};
    let currentSection = result;

    const lines = input.replace(/\r\n/g, '\n').split('\n');

    for (let line of lines) {
        line = line.trim();

        // Empty line
        if (!line) {
            continue;
        }

        // Comment
        if (line.startsWith(';') || line.startsWith('#')) {
            continue;
        }

        // Section
        const sectionMatch = line.match(/^\[([^\]]+)]$/);

        if (sectionMatch) {
            const section = sectionMatch[1].trim();

            if (!section) {
                throw new Error('Invalid empty section name');
            }

            if (
                Object.prototype.hasOwnProperty.call(result, section) &&
                typeof result[section] !== 'object'
            ) {
                throw new Error(`Section "${section}" conflicts with an existing value`);
            }

            if (!result[section]) {
                result[section] = {};
            }

            currentSection = result[section];

            continue;
        }

        // Key/value
        const separatorIndex = line.indexOf('=');

        if (separatorIndex === -1) {
            throw new Error(`Invalid INI line: ${line}`);
        }

        const key = line.slice(0, separatorIndex).trim();
        let value = line.slice(separatorIndex + 1).trim();

        if (!key) {
            throw new Error(`Invalid empty key: ${line}`);
        }

        // Remove quotes
        if (
            value.length >= 2 &&
            (
                (value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))
            )
        ) {
            value = value.slice(1, -1);
        } else {
            value = parseIniValue(value);
        }

        currentSection[key] = value;
    }

    return result;
};

const parseIniValue = (value) => {
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

export const toIni = (obj) => {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
        throw new Error('INI root value must be an object');
    }

    const root = [];
    const sections = [];

    for (const [key, value] of Object.entries(obj)) {
        if (
            value !== null &&
            typeof value === 'object' &&
            !Array.isArray(value)
        ) {
            sections.push([key, value]);
        } else {
            root.push(`${key} = ${formatIniValue(value)}`);
        }
    }

    const result = [...root];

    for (const [section, values] of sections) {
        if (result.length > 0) {
            result.push('');
        }

        result.push(`[${section}]`);

        for (const [key, value] of Object.entries(values)) {
            if (
                value !== null &&
                typeof value === 'object' &&
                !Array.isArray(value)
            ) {
                throw new Error(
                    `Nested objects deeper than one level are not supported: ${section}.${key}`
                );
            }

            result.push(`${key} = ${formatIniValue(value)}`);
        }
    }

    return result.join('\n');
};

const formatIniValue = (value) => {
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
        if (
            value === '' ||
            /[=\n\r#;]/.test(value) ||
            value.trim() !== value
        ) {
            return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
        }

        return value;
    }

    throw new Error(`Unsupported INI value type: ${typeof value}`);
};

export const minifyIni = (input) => {
    return input
        .replace(/\r\n/g, '\n')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '')
        .filter(line => !line.startsWith(';') && !line.startsWith('#'))
        .map(line => {
            const section = line.match(/^\[([^\]]+)]$/);

            if (section) {
                return `[${section[1].trim()}]`;
            }

            const index = line.indexOf('=');

            if (index === -1) {
                return line;
            }

            const key = line.slice(0, index).trim();
            const value = line.slice(index + 1).trim();

            return `${key}=${value}`;
        })
        .join('\n');
};

export const beautifyIni = (input) => {
    const lines = input
        .replace(/\r\n/g, '\n')
        .split('\n');

    const result = [];

    for (let line of lines) {
        line = line.trim();

        if (!line) {
            continue;
        }

        if (line.startsWith(';') || line.startsWith('#')) {
            result.push(line);
            continue;
        }

        const sectionMatch = line.match(/^\[([^\]]+)]$/);

        if (sectionMatch) {
            if (result.length > 0 && result[result.length - 1] !== '') {
                result.push('');
            }

            result.push(`[${sectionMatch[1].trim()}]`);

            continue;
        }

        const index = line.indexOf('=');

        if (index === -1) {
            result.push(line);
            continue;
        }

        const key = line.slice(0, index).trim();
        const value = line.slice(index + 1).trim();

        result.push(`${key} = ${value}`);
    }

    return result.join('\n').trim();
};

export const validateIni = (input) => {
    if (typeof input !== 'string') {
        return {
            ok: false,
            error: 'INI input must be a string'
        };
    }

    if (input.trim() === '') {
        return {
            ok: false,
            error: 'INI input is empty'
        };
    }

    try {
        parseIni(input);

        return {
            ok: true
        };
    } catch (e) {
        return {
            ok: false,
            error: e.message
        };
    }
};