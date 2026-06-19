import { XMLParser } from 'fast-xml-parser'
import { parseYaml } from './yaml'
import { validateCsv } from "../utils/csv";

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

            default:
                return { ok: false, error: 'Unknown format' }
        }
    } catch (e) {
        return { ok: false, error: e.message }
    }
}
