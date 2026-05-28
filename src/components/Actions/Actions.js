function Actions({ config, handleConvert, handleValidate }) {
    return (
        <div>
            <button className='btn btn-sm btn-outline-secondary' onClick={handleValidate}>Validate</button>
            <button className='btn btn-sm btn-outline-secondary'
                    onClick={() => handleConvert(config.inputFormat, config.outputFormat)}
            >Convert</button>
        </div>
    )
}

export default Actions;