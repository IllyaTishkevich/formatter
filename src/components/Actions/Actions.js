import {useCallback, Children, useRef} from "react";
import useMessage from "../../core/message";
import { useDispatch, useSelector } from "react-redux";
import {validateByFormat} from "../../core/validator";
import {convert} from "../../core/converterEngine";
import {setInput, setOutput} from "../../store/converterSlice";
import useParams from "../../core/params";
import {minifyByFormat} from "../../core/minify";
import {formatter} from "../../core/format";

const makeDownload = (data, fileName) => {
    const text =
        typeof data === 'string'
            ? data
            : JSON.stringify(data, null, 2)

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${fileName}.txt`
    a.click()

    URL.revokeObjectURL(url)
}

const useActions = () => {
    const editorRef = useRef(null)
    const { inputFormat, outputFormat } = useParams();
    const { addErrorMessage, addSuccessMessage, clearMessage } = useMessage();
    const dispatch = useDispatch()
    const { input, output } = useSelector((s) => s.converter)

    const setEditorRef = (editor) => {
        editorRef.current = editor;
    }

    const handleMinify = useCallback(() => {
        try {
            const minified = minifyByFormat(inputFormat, outputFormat, input)

            dispatch(setOutput(minified))
        } catch (e) {
            addErrorMessage(e.message);
        }
    }, [input, inputFormat, outputFormat])

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

    const handleFormat = useCallback((string = false) => {
        try {
            let result;

            if (typeof string == 'string') {
                result = formatter(
                    string,
                    outputFormat
                )
            } else {
                result = formatter(
                    input,
                    outputFormat
                )
            }

            dispatch(setOutput(result));
            clearMessage();
        } catch (e) {
            addErrorMessage(e.message)
        }
    }, [inputFormat, outputFormat, input]);

    const handleCleanOutput = useCallback(() => {
        dispatch(setOutput(''));
    }, [output])


    const handleCleanInput = useCallback(() => {
        dispatch(setInput(''));
        dispatch(setOutput(''));
    }, [output])

    const handleCopy = useCallback( () => {
        navigator.clipboard.writeText(editorRef.current.getValue())
    }, [editorRef])

    const handleUndo = () => {
        editorRef.current.trigger('keyboard', 'undo')
    }

    const handleRedo = () => {
        editorRef.current.trigger('keyboard', 'redo')
    }

    const handleDownloadOutput = useCallback(() => {
        makeDownload(output, outputFormat)
    }, [output, outputFormat])

    const handleDownloadInput = useCallback(() => {
        makeDownload(input, inputFormat)
    }, [input, inputFormat])

    const handlePaste = useCallback(() => {
        const value = editorRef.current.getValue();

        handleConvert(value);
    }, [inputFormat, outputFormat, handleConvert])

    return {
        handleConvert,
        handleValidate,
        handleMinify,
        handleCleanOutput,
        handleCleanInput,
        setEditorRef,
        handleCopy,
        handleUndo,
        handleRedo,
        handleDownloadOutput,
        handleDownloadInput,
        handlePaste,
        handleFormat
    }
}

const ActionButton = ({label, handler}) => {
    return <button title={label} className='btn btn-outline-secondary btn-sm w-100' onClick={handler}>
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