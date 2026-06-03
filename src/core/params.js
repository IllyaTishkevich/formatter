import {useMemo} from "react";
import { useParams as useReactRouterParams } from 'react-router-dom'
import SUPPORTED from "../utils/formats";

const normalizeFormat = (value) => {
    if (!value || !SUPPORTED.includes(value)) {
        return 'json'
    }
    return value
}

const useParams = () => {
    const params = useReactRouterParams()

    const config = useMemo(() => {
        const input = normalizeFormat(params.input)
        const output = params.output ?? input
        return {
            inputFormat: input,
            outputFormat: output,
        }
    }, [params])

    return config
};

export default useParams;