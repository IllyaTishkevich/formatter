import { useDispatch, useSelector } from 'react-redux'
import { setViewMode } from '../../store/converterSlice'

const ViewModeToggle = () => {
    const dispatch = useDispatch()
    const mode = useSelector((s) => s.converter.viewMode)

    const toggle = () => {
        dispatch(setViewMode(mode === 'pretty' ? 'minify' : 'pretty'))
    }

    return (
        <button
            className={`btn btn-sm p-1 lh-1 ${
                mode === 'pretty'
                    ? 'btn-success'
                    : 'btn-warning'
            }`}
            onClick={toggle}
        >
            {mode === 'pretty' ? 'pretty' : 'min'}
        </button>
    )
}

export default ViewModeToggle;