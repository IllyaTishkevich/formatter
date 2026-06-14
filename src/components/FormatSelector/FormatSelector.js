import { useNavigate } from 'react-router-dom'
import SUPPORTED from "../../utils/formats";
import { useCallback } from "react";

const FormatSelector = ({ type, current, opposite, handleConvert }) => {
    const navigate = useNavigate()

    const handleChange = useCallback((e) => {
        const newFormat = e.target.value

        if (newFormat === opposite) {
            navigate(`/${newFormat}`)
            handleConvert();
        } else {
            if (type === 'input') {
                navigate(`/${newFormat}/${opposite}`)
                handleConvert();
            } else {
                navigate(`/${opposite}/${newFormat}`)
                handleConvert();
            }
        }
    }, [type, current, opposite]);

    return (
        <div className="d-flex align-items-center gap-2">
            <label className='h-6 d-flex align-items-center mb-0' htmlFor={`select-${type}`}><div className="badge bg-dark">Format:</div></label>
            <select
                className="form-select form-select-sm py-0"
                value={current}
                onChange={handleChange}
                name={`select-${type}`}
            >
                {SUPPORTED.map((f) => (
                    <option key={f} value={f}>
                        {f.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default FormatSelector