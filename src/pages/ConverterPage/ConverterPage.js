import Input from "../../components/Input";
import Output from "../../components/Output";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import useActions from "../../components/Actions";
import useParams from "../../core/params";
import Body from "../../components/Body";

const ConverterPage = () => {
    const { input } = useSelector((s) => s.converter)
    const { inputFormat, outputFormat } = useParams()

    const { handleConvert, actions, Validate, Convert } = useActions()


    useEffect(() => {
        if (input.length > 0) {
            handleConvert(inputFormat, outputFormat);
        }
    }, [inputFormat, outputFormat])

    return <Body Input={Input} Output={Output} Actions={actions([Convert, Validate])} />
};

export default ConverterPage;