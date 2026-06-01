import Logo from '../Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
    const year = new Date().getFullYear();
    return <footer className="py-3">
        <div className="container-fluid">
            <div className="row">
                <div className="col-2 p-3">
                </div>
                <div className="col-8 p3">
                    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-5'>
                        <div className="col mb-3 align-items-center">
                            {/*<a href="/"*/}
                            {/*   className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"*/}
                            {/*   aria-label="Bootstrap">*/}
                            {/*    <Logo height='64' img='icon'/>*/}
                            {/*</a>*/}
                        </div>
                        <div className="col mb-3"></div>
                        <div className="col mb-3 align-items-end text-end">
                            <h5>JSON</h5>
                            <ul className="nav flex-column ">
                                <li className="nav-item mb-2">
                                    <Link to="/json/xml" className="nav-link p-0 text-body-secondary">To Xml</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/json/yaml" className="nav-link p-0 text-body-secondary">To Yaml</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/json" className="nav-link p-0 text-body-secondary">Format</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col mb-3 align-items-end text-end">
                            <h5>XML</h5>
                            <ul className="nav flex-column ">
                                <li className="nav-item mb-2">
                                    <Link to="/xml/json" className="nav-link p-0 text-body-secondary">To JSON</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/xml/yaml" className="nav-link p-0 text-body-secondary">To Yaml</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/xml" className="nav-link p-0 text-body-secondary">Format</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col mb-3 align-items-end text-end">
                            <h5>Yaml</h5>
                            <ul className="nav flex-column ">
                                <li className="nav-item mb-2">
                                    <Link to="/yaml/json" className="nav-link p-0 text-body-secondary">To JSON</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/yaml/xml" className="nav-link p-0 text-body-secondary">To XML</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/yaml" className="nav-link p-0 text-body-secondary">Format</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-2 p3">

                </div>
            </div>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-between py-1 px-4 border-top">
            <span>© {year} Illya Tsishkevich</span>
        </div>
    </footer>
}

export default Footer;