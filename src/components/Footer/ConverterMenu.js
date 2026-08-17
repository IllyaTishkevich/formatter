import {Link} from "react-router-dom";
import SUPPORTED from "../../utils/formats";
import { firstToUpper } from "../../core/util";

const ConverterMenu = () => {
    const block = SUPPORTED.map((inputFormat) => <List inputFormat={inputFormat} />)

    return <>
            <div className="col mb-12 align-items-end text-end">
                <h6>Conversion pages:</h6>
            </div>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-6'>
                {block}
            </div>
        </>
}

const List = ({ inputFormat }) => {
    const list = SUPPORTED.map((outputFormat) => inputFormat !== outputFormat ? <Element inputFormat={inputFormat} outputFormat={outputFormat} /> : null)

    return <div className="col mb-3 align-items-end text-end">
        <ul className="nav flex-column ">
            { list }
            <li className="nav-item mb-2">
                <Link to={`/${inputFormat}`} className="nav-link p-0 text-body-secondary">{`${firstToUpper(inputFormat)} Format`}</Link>
            </li>
        </ul>
    </div>
}

const Element = ({ inputFormat, outputFormat }) => {
    return <li className="nav-item mb-2">
        <Link to={`/${inputFormat}/${outputFormat}`} className="nav-link p-0 text-body-secondary">{`${firstToUpper(inputFormat)} to ${firstToUpper(outputFormat)}`}</Link>
    </li>
}

export default ConverterMenu