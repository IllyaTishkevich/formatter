import {useCallback, useMemo} from "react";
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

    const handleConvert = useCallback((inputFormat, outputFormat, string = false) => {
        try {
            let result;

            if (string !== false) {
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

    const label = useMemo(() => {
        if (inputFormat === outputFormat) {
            return 'Format';
        } else {
            return `Convert ${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()}`;
        }
    }, [inputFormat, outputFormat])

    const Validate = useMemo(() => {
        return <button title="Validate" className='btn btn-secondary btn-sm w-100' onClick={handleValidate}>
            Validate
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-bookmark-check" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                      d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                <path
                    d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
            </svg>
        </button>
    }, [handleValidate])

    const Convert = useMemo(() => {
        return <button className='btn btn-secondary btn-sm w-100' title="Convert"
                       onClick={() => handleConvert(inputFormat, outputFormat)}>
            { label }
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
            </svg>
        </button>
    }, [inputFormat, outputFormat, label, handleConvert])

    const actions = (actions) => {
        return actions.map((action, index) =>
            {
                return <div key={index}
                            className="d-flex flex-row flex-xl-column align-items-center align-items-xl-center justify-content-center justify-content-xl-start gap-2 my-lg-3">
                    {action}
                </div>
            }
        )
    }

    return {
        Validate,
        Convert,
        handleConvert,
        handleValidate
    }
}

export default useActions;