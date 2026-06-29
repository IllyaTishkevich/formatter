import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import { parseYaml, toYaml } from '../utils/yaml'
import { beautifyToml, parseToml, toToml } from "../utils/toml";
import { parseTsv, toTsv, beautifyTsv } from "../utils/tsv";
import {flatten, minifyCSV, unflatten} from "../utils/csv";
import Papa from "papaparse";

const parser = new XMLParser(
    {
        ignoreAttributes: false,
        ignoreDeclaration: false,
    }
)

const builder = new XMLBuilder(
    {
        format: true,
        indentBy: '  ',
        suppressEmptyNode: true,
        declaration: {
            include: true,
            encoding: 'UTF-8',
            version: '1.0',
        },
    }
)

export function formatter(input, format) {
    let data

    switch (format) {
        case 'json':
            data = JSON.parse(input)
            break

        case 'xml':
            data = parser.parse(input)
            break

        case 'yaml':
            const res = parseYaml(input)
            if (!res.ok) throw new Error(res.error)
            data = res.data
            break

        case 'csv':
            const flat = Papa.parse(minifyCSV(input), {
                header: true,
                skipEmptyLines: true
            }).data;

            data = flat.map(unflatten).shift();
            break

        case 'toml':
            data = parseToml(input);
            break

        case 'tsv':
            data = parseTsv(input);
            break

        default:
            throw new Error('Unsupported input format')
    }

    switch (format) {
        case 'json':
            return JSON.stringify(data, null, 2)

        case 'xml':
            return builder.build(data)

        case 'yaml':
            const res = toYaml(data)
            if (!res.ok) throw new Error(res.error)
            return res.data

        case 'csv':
            const flat = flatten(data);
            data = Papa.unparse([flat]);

            return minifyCSV(data)

        case 'toml':
            const toml = toToml(data)

            return beautifyToml(toml)

        case 'tsv':
            const tsv = toTsv(data)

            return beautifyTsv(tsv)

        default:
            throw new Error('Unsupported output format')
    }
}