import Editor from '@monaco-editor/react'
import { useDispatch, useSelector } from 'react-redux'
import { setInput } from '../../store/converterSlice'
import { useState } from 'react'
import FormatSelector from "../FormatSelector";
import useParams from "../../core/params";
import { useActions } from "../Actions";

const  Input = () => {
    const { inputFormat, outputFormat } = useParams()
    const dispatch = useDispatch()
    const input = useSelector((s) => s.converter.input)

    const {
        handleConvert,
        handleCleanInput,
        handleCopy,
        setEditorRef,
        handleUndo,
        handleRedo,
        handleDownloadInput,
        handlePaste
    } = useActions()

    const [stats, setStats] = useState({
        line: 1,
        column: 1,
        lines: 0,
        chars: 0,
    })

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

                    <button title="Download" className="btn btn-light btn-sm px-1 py-0"
                            onClick={handleDownloadInput}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-download" viewBox="0 0 16 16">
                            <path
                                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                            <path
                                d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                        </svg>
                    </button>

                    <button title="Clean" className="btn btn-light btn-sm px-1 py-0" onClick={handleCleanInput}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-trash" viewBox="0 0 16 16">
                            <path
                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
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
                    editor.onDidPaste(handlePaste);
                    setEditorRef(editor);

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