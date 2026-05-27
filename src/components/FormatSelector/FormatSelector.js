import { useNavigate } from 'react-router-dom'
import SUPPORTED from "../../utils/formats";

const FormatSelector = ({ type, current, opposite }) => {
    const navigate = useNavigate()

    const handleChange = (e) => {
        const newFormat = e.target.value

        if (type === 'input') {
            navigate(`/${newFormat}/${opposite}`)
        } else {
            navigate(`/${opposite}/${newFormat}`)
        }
    }

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