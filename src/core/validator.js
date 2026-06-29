import { XMLParser } from 'fast-xml-parser'
import { parseYaml } from '../utils/yaml'
import { validateToml } from "../utils/toml";
import { validateCsv } from "../utils/csv";
import { validateTsv } from "../utils/tsv";

const xmlParser = new XMLParser()

export function validateByFormat(format, input) {
    try {
        switch (format) {
            case 'json':
                JSON.parse(input)
                return { ok: true }

            case 'xml':
                xmlParser.parse(input)
                return { ok: true }

            case 'yaml':
                const res = parseYaml(input)
                if (!res.ok) return res
                return { ok: true }

            case 'csv':
                return validateCsv(input)

            case 'toml':
                return validateToml(input)

            case 'tsv':
                return validateTsv(input)

            default:
                return { ok: false, error: 'Unknown format' }
        }
    } catch (e) {
        return { ok: false, error: e.message }
    }
}
