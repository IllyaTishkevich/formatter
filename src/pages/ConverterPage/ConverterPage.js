import { useParams } from 'react-router-dom'
import { useMemo } from 'react'
import Body from "../../components/Body";
import SUPPORTED from "../../utils/formats";

const normalizeFormat = (value) => {
    if (!value || !SUPPORTED.includes(value)) {
        return 'json'
    }
    return value
}

const ConverterPage = () => {
    const params = useParams()

    const config = useMemo(() => {
        const input = normalizeFormat(params.input)
        const output = params.output ?? input
        return {
            inputFormat: input,
            outputFormat: output,
        }
    }, [params])

    return <Body config={config}/>
};

export default ConverterPage;