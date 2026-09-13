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
    }, [type, opposite, handleConvert, navigate]);

    return (
        <div className="d-flex align-items-center gap-2">
            <label className='h-6 d-flex align-items-center mb-0' htmlFor={`select-${type}-id`}><div className="badge bg-dark">Format:</div>
                <select
                    className="form-select form-select-sm py-0"
                    value={current}
                    onChange={handleChange}
                    name={`select-${type}-name`}
                    id={`select-${type}-id`}
                >
                    {SUPPORTED.map((f) => (
                        <option key={f} value={f}>
                            {f.toUpperCase()}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    )
}

export default FormatSelector