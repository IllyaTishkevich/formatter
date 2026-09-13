const splitLines = (input) => {
    if (typeof input !== 'string') {
        throw new Error('NDJSON input must be a string');
    }

    return input
        .replace(/\r\n?/g, '\n')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
}

const parseNdjson = (input) => {
    const lines = splitLines(input);

    if (lines.length === 0) {
        throw new Error('NDJSON document is empty');
    }

    const records = lines.map((line, index) => {
        try {
            return JSON.parse(line);
        } catch (e) {
            throw new Error(`Invalid JSON at line ${index + 1}: ${e.message}`);
        }
    });

    return records.length === 1 ? records[0] : records;
}

const toNdjson = (data) => {
    const records = Array.isArray(data) ? data : [data];

    return records
        .map(record => JSON.stringify(record))
        .join('\n');
}

const minifyNdjson = (input) => {
    return splitLines(input)
        .map(line => JSON.stringify(JSON.parse(line)))
        .join('\n');
}

const beautifyNdjson = (input) => {
    return splitLines(input)
        .map(line => JSON.stringify(JSON.parse(line)))
        .join('\n');
}

const validateNdjson = (input) => {
    if (typeof input !== 'string') {
        return { ok: false, error: 'NDJSON input must be a string' };
    }

    if (input.trim() === '') {
        return { ok: false, error: 'NDJSON document is empty' };
    }

    try {
        parseNdjson(input);
        return { ok: true };
    } catch (error) {
        return { ok: false, error: error.message };
    }
}

export {
    parseNdjson,
    toNdjson,
    minifyNdjson,
    beautifyNdjson,
    validateNdjson
}
