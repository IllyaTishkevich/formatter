import { useNavigate } from 'react-router-dom'
import SUPPORTED from "../../utils/formats";
import {useCallback} from "react";

const FormatSelector = ({ type, current, opposite, handleConvert }) => {
    const navigate = useNavigate()

    const handleChange = useCallback((e) => {
        const newFormat = e.target.value


        if (type === 'input') {
            navigate(`/${newFormat}/${opposite}`)
            handleConvert(newFormat, opposite);
        } else {
            navigate(`/${opposite}/${newFormat}`)
            handleConvert(opposite, newFormat);
        }
    }, [type, current, opposite]);

    return (
        <select
            className="form-select form-select-sm py-0"
            value={current}
            onChange={handleChange}
        >
            {SUPPORTED.map((f) => (
                <option key={f} value={f}>
                    {f.toUpperCase()}
                </option>
            ))}
        </select>
    )
}

export default FormatSelector