import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import yaml from 'js-yaml'
import { flatten, minifyCSV, unflatten } from "../utils/csv";
import { minifyToml, parseToml, toToml } from "../utils/toml";
import { parseTsv, toTsv, minifyTsv } from "../utils/tsv";
import { minifyIni, parseIni, toIni } from "../utils/ini";
import { minifyProperties, parseProperties, toProperties } from "../utils/properties";
import { minifyHcl, parseHcl, toHcl } from "../utils/hcl";
import Papa from "papaparse";


const xmlParser = new XMLParser()

const compactXmlBuilder = new XMLBuilder({
    format: false,
})

export function minifyByFormat(inputFormat, outputFormat, text) {
    let result = '';
    switch (inputFormat) {
        case 'json':
            result = JSON.parse(text);
            break;

        case 'xml':
            result = xmlParser.parse(text)
            break;

        case 'yaml':
            result = yaml.load(text);
            break;

        case 'csv':
            const flat = Papa.parse(minifyCSV(text), {
                header: true,
                skipEmptyLines: true
            }).data;

            result = flat.map(unflatten).shift();
            break;

        case 'toml':
            result = parseToml(text);
            break;

        case 'tsv':
            result = parseTsv(text);
            break;

        case 'ini':
            result = parseIni(text);
            break;

        case 'properties':
            result = parseProperties(text);
            break;

        case 'hcl':
            result = parseHcl(text);
            break;

        default:
            throw new Error('Unsupported input format');
    }


    switch (outputFormat) {
        case 'json':
            return JSON.stringify(result)

        case 'xml':
            return compactXmlBuilder.build(result)

        case 'yaml':
            return yaml.dump(result, {
                flowLevel: 0,
                lineWidth: -1,
            });

        case 'csv':
            const flat = flatten(result);
            result = Papa.unparse([flat]);
            return minifyCSV(result)

        case 'toml':
            const toml = toToml(result)
            return minifyToml(toml)

        case 'tsv': {
            const tsv = toTsv(result)
            return minifyTsv(tsv)
        }

        case 'ini':
            const ini = toIni(result)
            return minifyIni(ini)

        case 'properties':
            const properties = toProperties(result)
            return minifyProperties(properties)

        case 'hcl':
            const hcl = toHcl(result)
            return minifyHcl(hcl)

        default:
            throw new Error('Unsupported output format')
    }
}