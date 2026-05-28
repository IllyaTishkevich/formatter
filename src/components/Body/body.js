import Input from "../Input";
import Output from "../Output";
import Actions from "../Actions";
import './body.css'
import {convert} from "../../core/converterEngine";
import {setErrors, setOutput} from "../../store/converterSlice";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useMemo} from "react";
import {validateByFormat} from "../../core/validator";

const Body = ({ config }) => {
    const dispatch = useDispatch()
    const input = useSelector((s) => s.converter.input)

    const handleValidate = useCallback(() => {
        const res = validateByFormat(config.inputFormat, input)

        if (!res.ok) {
            dispatch(setErrors([res.error]))
            return
        }

        dispatch(setErrors([]))
    }, [config, input])


    const handleConvert = useCallback((inputFormat, outputFormat) => {
        try {
            const result = convert(
                input,
                inputFormat,
                outputFormat
            )

            dispatch(setOutput(result))
            dispatch(setErrors([]))
        } catch (e) {
            dispatch(setErrors([e.message]))
        }
    }, [config, input]);

    const output = useMemo(() => {
        return <div className="bg-body-tertiary border rounded-3 p-1 panel panel-output">
            <Output inputFormat={config.inputFormat} outputFormat={config.outputFormat} handleConvert={handleConvert}/>
        </div>
    }, [config, input])

    return <main className="my-4 p-3">
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