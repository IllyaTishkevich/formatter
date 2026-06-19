import Papa from 'papaparse'

const flatten = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, key) => {
        const value = obj[key]
        const newKey = prefix ? `${prefix}.${key}` : key

        if (
            typeof value === 'object' &&
            value !== null &&
            !Array.isArray(value)
        ) {
            Object.assign(acc, flatten(value, newKey))
        } else {
            acc[newKey] = value
        }

        return acc
    }, {})
}

const unflatten = (obj) => {
    const result = {}

    for (const [path, value] of Object.entries(obj)) {
        const keys = path.split('.')

        let current = result

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]

            if (i === keys.length - 1) {
                current[key] = value
            } else {
                if (!current[key]) {
                    current[key] = {}
                }

                current = current[key]
            }
        }
    }

    return result
}

const  validateCsv = (csv) => {
    const result = Papa.parse(csv, {
        header: true,
        skipEmptyLines: true
    })

    if (result.errors.length > 0) {
        return {
            ok: false,
            error: result.errors[0].message
        }
    }

    const fields = result.meta.fields || []

    if (fields.length === 0) {
        return {
            ok: false,
            error: 'CSV header row is required'
        }
    }

    const duplicates = fields.filter(
        (field, index) => fields.indexOf(field) !== index
    )

    if (duplicates.length > 0) {
        return {
            ok: false,
            error: `Duplicate columns: ${duplicates.join(', ')}`
        }
    }

    return {
        ok: true
    }
}

const minifyCSV = (text) => {
    return text.split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            return line
                .split(",")
                .map(cell => cell.trim())
                .join(",");
        })
        .join("\n");
}

const compressCSVStructure = (csvText, options = {}) => {
    const lines = csvText
        .split("\n")
        .map(l => l.trim())
        .filter(Boolean);

    if (lines.length === 0) return "";

    const headers = lines[0].split(",").map(h => h.trim());

    const rows = lines.slice(1).map(line =>
        line.split(",").map(v => v.trim())
    );

    // 1. сокращение названий колонок (опционально)
    const columnMap = {};
    headers.forEach((h, i) => {
        columnMap[h] = options.columnMap?.[h] || `c${i}`;
    });

    const newHeaders = headers.map(h => columnMap[h]);

    // 2. dictionary encoding для каждого столбца
    const dictionaries = headers.map(() => new Map());

    const encodedRows = rows.map(row =>
        row.map((value, colIndex) => {
            const dict = dictionaries[colIndex];

            if (!dict.has(value)) {
                dict.set(value, dict.size);
            }

            return dict.get(value);
        })
    );

    // 3. собрать результат
    const resultCsv =
        newHeaders.join(",") +
        "\n" +
        encodedRows.map(r => r.join(",")).join("\n");

    // 4. вернуть ещё словари (для декодирования)
    const dictionariesObject = dictionaries.map(dict =>
        Object.fromEntries([...dict.entries()].map(([k, v]) => [v, k]))
    );

    return {
        csv: resultCsv,
        dictionaries: dictionariesObject
    };
}

export {
    flatten,
    unflatten,
    validateCsv,
    minifyCSV,
    compressCSVStructure
}