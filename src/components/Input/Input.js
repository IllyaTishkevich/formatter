import Editor from '@monaco-editor/react'
import { useDispatch, useSelector } from 'react-redux'
import { setInput } from '../../store/converterSlice'
import { useCallback, useRef, useState } from 'react'
import FormatSelector from "../FormatSelector";
import useParams from "../../core/params";
import { useActions } from "../Actions";

const  Input = () => {
    const { inputFormat, outputFormat } = useParams()
    const dispatch = useDispatch()
    const input = useSelector((s) => s.converter.input)

    const { handleConvert } = useActions()
    const [stats, setStats] = useState({
        line: 1,
        column: 1,
        lines: 0,
        chars: 0,
    })

    const editorRef = useRef(null)

    const handleFormat = useCallback(() => {
        try {
            if (inputFormat === 'json') {
                const parsed = JSON.parse(editorRef.current.getValue())
                editorRef.current.setValue(JSON.stringify(parsed, null, 2))
            }

            if (inputFormat === 'xml') {
            }
        } catch (e) {
            console.log(e.message)
        }
    }, [inputFormat, outputFormat])

    const handleCopy = useCallback( () => {
        navigator.clipboard.writeText(input)
    }, [input])

    const handlePaste = useCallback(() => {
        const value = editorRef.current.getValue();

        handleConvert(value);
    }, [inputFormat, outputFormat, handleConvert])

    const handleUndo = () => {
        editorRef.current.trigger('keyboard', 'undo')
    }

    const handleRedo = () => {
        editorRef.current.trigger('keyboard', 'redo')
    }

    return (
        <div className="h-100 d-flex flex-column">
            <div className="d-flex gap-1 p-1 align-items-center">
                <div className="ms-auto d-flex gap-1">
                    <FormatSelector
                        type="input"
                        current={inputFormat}
                        opposite={outputFormat}
                        handleConvert={handleConvert}
                    />

                    <button title="Undo (Ctrl+Z)" className="btn btn-light btn-sm px-1 py-0" onClick={handleUndo}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
                            <path
                                d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
                        </svg>
                    </button>

                    <button title="Redo (Ctrl+Shift+Z)" className="btn btn-light btn-sm px-1 py-0" onClick={handleRedo}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                            <path
                                d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                        </svg>
                    </button>

                    <button title="Format (pretty view)" className="btn btn-light btn-sm px-1 py-0" onClick={handleFormat}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-list-nested" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                  d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </button>

                    <button title="Copy" className="btn btn-light btn-sm px-1 py-0" onClick={handleCopy}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-copy" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                  d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                        </svg>
                    </button>
                </div>

            </div>
            <Editor
                height="500px"
                language={inputFormat}
                value={input}
                onChange={(val) => dispatch(setInput(val || ''))}

                onMount={(editor) => {
                    editorRef.current = editor
                    editor.onDidPaste(handlePaste);
                    const updateStats = () => {
                        const model = editor.getModel()
                        const pos = editor.getPosition()

                        setStats({
                            line: pos.lineNumber,
                            column: pos.column,
                            lines: model.getLineCount(),
                            chars: input.length
                        })
                    }
                    updateStats();

                    editor.onDidChangeCursorPosition(updateStats)
                    editor.onDidChangeModelContent(updateStats)
                }}
                options={{
                    minimap: { enabled: false },
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    wordWrap: 'on'
                }}
            />
            <div className="d-flex small text-muted px-2 py-1 border-top">
                <div className="ms-auto">
                    Lines: {stats.lines} |
                    Chars: {stats.chars} |
                    Ln {stats.line}, Col {stats.column}
                </div>
            </div>
        </div>
    )
}

export default Input;