import {useMemo} from "react";

function Actions({ config, handleConvert, handleValidate }) {
    const { inputFormat, outputFormat } = config;
    const label = useMemo(() => {
        if (inputFormat == outputFormat) {
            return 'Format';
        } else {
            return `Convert ${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()}`;
        }
    }, [inputFormat, outputFormat])

    return (
        <div className="d-flex flex-row flex-xl-column align-items-center align-items-xl-center justify-content-center justify-content-xl-start gap-2 my-lg-3">
            <button title="Validate" className='btn btn-secondary btn-sm w-100' onClick={handleValidate}>
                Validate
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-bookmark-check" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                          d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                    <path
                        d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                </svg>
            </button>
            <button className='btn btn-secondary btn-sm w-100' title="Convert"
                    onClick={() => handleConvert(config.inputFormat, config.outputFormat)}>
                { label }
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                </svg>
            </button>
        </div>
    )
}

export default Actions;