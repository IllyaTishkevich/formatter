import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import { parseYaml, toYaml } from './yaml'
import { addXmlDeclaration } from '../utils/xml';

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

    // parse input
    switch (from) {
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

        case 'jwt':
            data = { token: input }
            break

        default:
            throw new Error('Unsupported input format')
    }

    switch (to) {
        case 'json':
            return JSON.stringify(data, null, 2)

        case 'xml':
            return addXmlDeclaration(builder.build(data))

        case 'yaml':
            const res = toYaml(data)
            if (!res.ok) throw new Error(res.error)
            return res.data

        case 'jwt':
            return data.token || 'cannot convert to jwt'

        default:
            throw new Error('Unsupported output format')
    }
}