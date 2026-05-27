import { useSelector, useDispatch } from 'react-redux'
import { setOutput, setErrors } from '../../store/converterSlice'
import { convert } from '../../core/converterEngine'
import { validateByFormat } from '../../core/validator'

function Actions({ config }) {
    const dispatch = useDispatch()
    const input = useSelector((s) => s.converter.input)

    const handleValidate = () => {
        const res = validateByFormat(config.inputFormat, input)

        if (!res.ok) {
            dispatch(setErrors([res.error]))
            return
        }

        dispatch(setErrors([]))
    }

    const handleConvert = () => {
        try {
            const result = convert(
                input,
                config.inputFormat,
                config.outputFormat
            )

            dispatch(setOutput(result))
            dispatch(setErrors([]))
        } catch (e) {
            dispatch(setErrors([e.message]))
        }
    }

    return (
        <div>
            <button className='btn btn-sm btn-outline-secondary' onClick={handleValidate}>Validate</button>
            <button className='btn btn-sm btn-outline-secondary' onClick={handleConvert}>Convert</button>
        </div>
    )
}

export default Actions;