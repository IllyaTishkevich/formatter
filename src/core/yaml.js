import yaml from 'js-yaml'

export const parseYaml = (input) => {
    try {
        const data = yaml.load(input)
        return { ok: true, data }
    } catch (e) {
        return { ok: false, error: e.message }
    }
}

export const toYaml = (obj) =>  {
    try {
        const yamlStr = yaml.dump(obj, {
            indent: 2,
            noRefs: true,
        })

        return { ok: true, data: yamlStr }
    } catch (e) {
        return { ok: false, error: e.message }
    }
}