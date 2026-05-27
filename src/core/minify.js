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

            const xml = compactXmlBuilder.build(parsed)

            return `<?xml version="1.0" encoding="UTF-8"?>${xml}`
        }

        case 'yaml': {
            const parsed = yaml.load(text)

            return JSON.stringify(parsed)
        }

        default:
            return text
    }
}