import { parse, stringify } from 'smol-toml'

const parseToml = (tomlString)=> {
    return parse(tomlString)
}

const toToml = (obj) =>{
    return stringify(obj)
}

const minifyToml = (tomlString) => {
    const obj = parse(tomlString)

    return stringify(obj)
        .replace(/\n\s*\n/g, '\n')
        .trim()
}

const beautifyToml = (tomlString)=> {
    const obj = parse(tomlString)

    return stringify(obj)
}

const validateToml = (tomlString) => {
    try {
        parse(tomlString)

        return {
            ok: true
        }
    } catch (e) {
        return {
            ok: false,
            error: e.message
        }
    }
}

export {
    parseToml,
    toToml,
    minifyToml,
    beautifyToml,
    validateToml
}