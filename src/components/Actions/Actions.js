import {useCallback, useMemo, Children} from "react";
import useMessage from "../../core/message";
import { useDispatch, useSelector } from "react-redux";
import {validateByFormat} from "../../core/validator";
import {convert} from "../../core/converterEngine";
import {setOutput} from "../../store/converterSlice";
import useParams from "../../core/params";

const useActions = () => {
    const { inputFormat, outputFormat } = useParams();
    const { addErrorMessage, addSuccessMessage, clearMessage } = useMessage();
    const dispatch = useDispatch()
    const { input } = useSelector((s) => s.converter)

    const handleValidate = useCallback(() => {
        const res = validateByFormat(inputFormat, input)

        if (!res.ok) {
            addErrorMessage(res.error)
            return
        }

        addSuccessMessage('Success!');
    }, [inputFormat, outputFormat, input])

    const handleConvert = useCallback((string = false) => {
        try {
            let result;

            if (typeof string == 'string') {
                result = convert(
                    string,
                    inputFormat,
                    outputFormat
                )
            } else {
                result = convert(
                    input,
                    inputFormat,
                    outputFormat
                )
            }

            dispatch(setOutput(result));
            clearMessage();
        } catch (e) {
            addErrorMessage(e.message)
        }
    }, [inputFormat, outputFormat, input]);

    return {
        handleConvert,
        handleValidate
    }
}

const ActionButton = ({label, handler}) => {
    return <button title={label} className='btn btn-secondary btn-sm w-100' onClick={handler}>
        {label}
    </button>
}

const ActionsBlock = ({ children }) => {
    return <div className="p-1 panel panel-actions">
        <div className="d-flex flex-row flex-xl-column align-items-center align-items-xl-center justify-content-center justify-content-xl-start gap-2 my-lg-3">
            {Children.map(children, child => child)}
        </div>
    </div>
}

export {
    useActions,
    ActionButton,
    ActionsBlock
};