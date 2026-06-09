import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import yaml from 'js-yaml'

const xmlParser = new XMLParser()

const compactXmlBuilder = new XMLBuilder({
    format: false,
})

export function minifyByFormat(format, text) {
    switch (format) {
        case 'json': {
            return JSON.stringify(JSON.parse(text))
        }

        case 'xml': {
            const parsed = xmlParser.parse(text)

            return compactXmlBuilder.build(parsed)
        }

        case 'yaml': {
            const parsed = yaml.load(text)

            return JSON.stringify(parsed)
        }

        default:
            return text
    }
}