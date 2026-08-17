import Logo from '../Logo';
import { Link } from 'react-router-dom';
import ConverterMenu from "./ConverterMenu";


const Footer = () => {
    const year = new Date().getFullYear();
    return <footer className="py-3">
        <div className="container-fluid">
            <div className="row">
                <div className="col-10 p3">
                    <ConverterMenu/>
                </div>
                <div className="col-2 p3">
                    {/*<div className="col mb-3 align-items-center">*/}
                    {/*    <a href="/"*/}
                    {/*       className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"*/}
                    {/*       aria-label="Bootstrap">*/}
                    {/*        <Logo height='64' img='icon'/>*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-between py-1 px-4 border-top">
            <span>© {year} ValidFormat</span><span><Link to="/policy" className="nav-link p-0 text-body-secondary">Privacy Policy</Link></span>
        </div>
    </footer>
}

export default Footer;