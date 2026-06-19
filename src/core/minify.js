import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import yaml from 'js-yaml'
import { minifyCSV } from "../utils/csv";

const xmlParser = new XMLParser()

const compactXmlBuilder = new XMLBuilder({
    format: false,
})

export function minifyByFormat(inputFormat,outputFormat, text) {
    let result = '';
    switch (inputFormat) {
        case 'json': {
            result = JSON.parse(text);
            break;
        }

        case 'xml': {
            result = xmlParser.parse(text)
            break;
        }

        case 'yaml': {
            result = yaml.load(text);
            break;
        }

        case 'csv': {
            result =  text
            break;
        }
    }


    switch (outputFormat) {
        case 'json': {
            return JSON.stringify(result)
        }

        case 'xml': {
            return compactXmlBuilder.build(result)
        }

        case 'yaml': {
            return yaml.dump(result, {
                flowLevel: 0,
                lineWidth: -1,
            });
        }

        case 'csv': {
            return minifyCSV(result);
        }
    }
}