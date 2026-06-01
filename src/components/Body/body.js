import Input from "../Input";
import Output from "../Output";
import Actions from "../Actions";
import './body.css'
import { convert } from "../../core/converterEngine";
import { setOutput } from "../../store/converterSlice";
import { useDispatch, useSelector } from "react-redux";
import {useCallback, useEffect, useMemo} from "react";
import { validateByFormat } from "../../core/validator";
import useMessage from "../../core/message";

const Body = ({ config }) => {
    const { addErrorMessage, addSuccessMessage, clearMessage } = useMessage();
    const dispatch = useDispatch()
    const { input } = useSelector((s) => s.converter)
    const { inputFormat, outputFormat } = config

    const handleValidate = useCallback(() => {
        const res = validateByFormat(config.inputFormat, input)

        if (!res.ok) {
            addErrorMessage(res.error)
            return
        }

        addSuccessMessage('Success!');
    }, [config, input])

    const handleConvert = useCallback((inputFormat, outputFormat) => {
        try {
            const result = convert(
                input,
                inputFormat,
                outputFormat
            )

            dispatch(setOutput(result));
            clearMessage();
        } catch (e) {
            addErrorMessage(e.message)
        }
    }, [config, input]);

    const output = useMemo(() => {
        return <div className="bg-body-tertiary border rounded-3 p-1 panel panel-output">
            <Output inputFormat={config.inputFormat} outputFormat={config.outputFormat} handleConvert={handleConvert}/>
        </div>
    }, [config, input])

    useEffect(() => {
        if (input.length > 0) {
            handleConvert(inputFormat, outputFormat);
        }
    }, [inputFormat, outputFormat])

    return <main className="py-3 px-5">
        <div className="d-flex flex-column flex-xl-row">
            <div className="bg-body-tertiary border rounded-3 p-1 panel panel-input">
                <Input inputFormat={config.inputFormat} outputFormat={config.outputFormat} handleConvert={handleConvert}/>
            </div>
            <div className="p-1 panel panel-actions">
                <Actions config={config} input={input} handleConvert={handleConvert} handleValidate={handleValidate}/>
            </div>
            {output}
        </div>
    </main>
}

export default Body;