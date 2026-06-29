import Papa from 'papaparse';
import { flatten, unflatten } from "./csv";

const parseTsv = (tsv) => {
    const result = Papa.parse(tsv, {
        header: true,
        delimiter: '\t',
        skipEmptyLines: true,
        dynamicTyping: true,
    });

    if (result.errors.length) {
        throw new Error(result.errors[0].message);
    }

    return result.data.length === 1 ? result.data.map(unflatten).shift() : result.data;
}

const toTsv = (obj) => {
    const flat = flatten(obj);
    const data = Array.isArray(flat) ? flat : [flat];

    return Papa.unparse(data, {
        delimiter: '\t',
        newline: '\n',
    });
}

const minifyTsv = (tsv) => {
    return tsv
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(Boolean)
        .join('\n');
}


const beautifyTsv = (tsv) => {
    const rows = tsv
        .trim()
        .split(/\r?\n/)
        .map(row => row.split('\t'));

    const widths = [];

    rows.forEach(row => {
        row.forEach((cell, i) => {
            widths[i] = Math.max(widths[i] || 0, cell.length);
        });
    });

    return rows
        .map(row =>
            row
                .map((cell, i) => cell.padEnd(widths[i], ' '))
                .join('\t')
        )
        .join('\n');
}

const validateTsv = (tsv) => {
    if (!tsv.trim()) {
        return {
            ok: false,
            error: 'TSV document is empty',
        };
    }

    const result = Papa.parse(tsv, {
        header: true,
        delimiter: '\t',
        skipEmptyLines: true,
    });

    if (result.errors.length) {
        return {
            ok: false,
            error: result.errors[0].message,
        };
    }

    const fields = result.meta.fields || [];

    if (!fields.length) {
        return {
            ok: false,
            error: 'Header row is required',
        };
    }

    const duplicates = fields.filter(
        (field, index) => fields.indexOf(field) !== index
    );

    if (duplicates.length) {
        return {
            ok: false,
            error: `Duplicate columns: ${duplicates.join(', ')}`,
        };
    }

    return {
        ok: true,
    };
}

export {
    parseTsv,
    toTsv,
    minifyTsv,
    beautifyTsv,
    validateTsv
}