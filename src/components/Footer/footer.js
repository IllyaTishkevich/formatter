import { Link } from 'react-router-dom';
import ConverterMenu from "./ConverterMenu";
import ToolsMenu from "./ToolsMenu";


const Footer = () => {
    const year = new Date().getFullYear();
    return <footer className="py-3">
        <div className="container-fluid">
            <div className="row">
                <div className="col-10 p3">
                    <ConverterMenu/>
                </div>
            </div>
            <div className="row">
                <div className="col-2 p3">
                    <ToolsMenu/>
                </div>
            </div>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-between py-1 px-4 border-top">
            <span>© {year} ValidFormat</span><span><Link to="/policy" className="nav-link p-0 text-body-secondary">Privacy Policy</Link></span>
        </div>
    </footer>
}

export default Footer;