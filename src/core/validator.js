import { XMLParser } from 'fast-xml-parser'
import { parseYaml } from '../utils/yaml'
import { validateToml } from "../utils/toml";
import { validateCsv } from "../utils/csv";
import { validateTsv } from "../utils/tsv";
import { validateIni } from "../utils/ini";
import { validateProperties } from "../utils/properties";
import { validateHcl } from "../utils/hcl";
import { validateNdjson } from "../utils/ndjson";
import { validateEnv } from "../utils/env";
import { validateQueryString } from "../utils/querystring";

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

            case 'ini':
                return validateIni(input)

            case 'properties':
                return validateProperties(input)

            case 'hcl':
                return validateHcl(input)

            case 'ndjson':
                return validateNdjson(input)

            case 'env':
                return validateEnv(input)

            case 'querystring':
                return validateQueryString(input)

            default:
                return { ok: false, error: 'Unknown format' }
        }
    } catch (e) {
        return { ok: false, error: e.message }
    }
}
