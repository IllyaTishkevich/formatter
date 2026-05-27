import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import { parseYaml, toYaml } from './yaml'

const parser = new XMLParser()
const builder = new XMLBuilder()

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

    // convert output
    switch (to) {
        case 'json':
            return JSON.stringify(data, null, 2)

        case 'xml':
            return builder.build(data)

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