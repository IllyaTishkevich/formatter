function Actions({ config, handleConvert, handleValidate }) {
    return (
        <div className='flex-column align-items-center'>
            <button className='btn btn-sm' onClick={handleValidate}>Validate</button>
            <button className='btn btn-sm'
                    onClick={() => handleConvert(config.inputFormat, config.outputFormat)}
            >Convert</button>
        </div>
    )
}

export default Actions;