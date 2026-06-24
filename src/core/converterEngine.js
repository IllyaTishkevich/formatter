import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import { parseYaml, toYaml } from '../utils/yaml'
import { parseToml, toToml } from "../utils/toml";
import Papa from 'papaparse'
import { flatten, unflatten, minifyCSV } from "../utils/csv";

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

export function convert(input, from, to) {
    let data

    // parse input in object
    switch (from) {
        case 'json':
            data = JSON.parse(input);
            break;

        case 'xml':
            data = parser.parse(input);
            break;

        case 'yaml':
            const res = parseYaml(input)
            if (!res.ok) throw new Error(res.error)
            data = res.data;
            break;

        case 'csv':
            const flat = Papa.parse(minifyCSV(input), {
                header: true,
                skipEmptyLines: true
            }).data;

            data = flat.map(unflatten).shift();
            break

        case 'toml':
            data = parseToml(input);
            break;
        default:
            throw new Error('Unsupported input format')
    }

    switch (to) {
        case 'json':
            return JSON.stringify(data, null, 2);

        case 'xml':
            return builder.build(data);

        case 'yaml':
            const res = toYaml(data);
            if (!res.ok) throw new Error(res.error);

            return res.data;

        case 'csv':
            const flat = flatten(data);

            return Papa.unparse([flat]);

        case 'toml':
            return toToml(data);


        default:
            throw new Error('Unsupported output format')
    }
}