import Ajv from 'ajv'
import { XMLParser } from 'fast-xml-parser'
import { jwtDecode } from 'jwt-decode'
import { parseYaml } from './yaml'

const ajv = new Ajv()
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

            case 'jwt':
                return validateJWT(input)

            default:
                return { ok: false, error: 'Unknown format' }
        }
    } catch (e) {
        return { ok: false, error: e.message }
    }
}

export function validateJWT(token) {
    try {
        jwtDecode(token)
        return { ok: true }
    } catch (e) {
        return { ok: false, error: 'Invalid JWT' }
    }
}