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
                        {/*<div className="col mb-3 align-items-center">*/}
                            {/*<a href="/"*/}
                            {/*   className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"*/}
                            {/*   aria-label="Bootstrap">*/}
                            {/*    <Logo height='64' img='icon'/>*/}
                            {/*</a>*/}
                        {/*</div>*/}

                        <div className="col mb-3 align-items-end text-end">
                            <ul className="nav flex-column ">
                                <li className="nav-item mb-2">
                                    <Link to="/json/xml" className="nav-link p-0 text-body-secondary">Json to Xml</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/json/yaml" className="nav-link p-0 text-body-secondary">Json to Yaml</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/json/csv" className="nav-link p-0 text-body-secondary">Json to Csv</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/json/toml" className="nav-link p-0 text-body-secondary">Json to Toml</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/json" className="nav-link p-0 text-body-secondary">Json Format</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col mb-3 align-items-end text-end">
                            <ul className="nav flex-column ">
                                <li className="nav-item mb-2">
                                    <Link to="/xml/json" className="nav-link p-0 text-body-secondary">Xml to Json</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/xml/yaml" className="nav-link p-0 text-body-secondary">Xml to Yaml</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/xml/csv" className="nav-link p-0 text-body-secondary">Xml to Csv</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/xml/toml" className="nav-link p-0 text-body-secondary">Xml to Toml</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/xml" className="nav-link p-0 text-body-secondary">Xml Format</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col mb-3 align-items-end text-end">
                            <ul className="nav flex-column ">
                                <li className="nav-item mb-2">
                                    <Link to="/yaml/json" className="nav-link p-0 text-body-secondary">Yaml to Json</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/yaml/xml" className="nav-link p-0 text-body-secondary">Yaml to Xml</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/yaml/csv" className="nav-link p-0 text-body-secondary">Yaml to Csv</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/yaml/toml" className="nav-link p-0 text-body-secondary">Yaml to Toml</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/yaml" className="nav-link p-0 text-body-secondary">Yaml Format</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col mb-3 align-items-end text-end">
                            <ul className="nav flex-column ">
                                <li className="nav-item mb-2">
                                    <Link to="/csv/json" className="nav-link p-0 text-body-secondary">CSV to JSON</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/csv/xml" className="nav-link p-0 text-body-secondary">CSV to XML</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/csv/yaml" className="nav-link p-0 text-body-secondary">CSV to Yaml</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/csv" className="nav-link p-0 text-body-secondary">CSV Format</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col mb-3 align-items-end text-end">
                            <ul className="nav flex-column ">
                                <li className="nav-item mb-2">
                                    <Link to="/toml/json" className="nav-link p-0 text-body-secondary">Toml to Json</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/toml/xml" className="nav-link p-0 text-body-secondary">Toml to Xml</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/toml/yaml" className="nav-link p-0 text-body-secondary">Toml to Yaml</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/toml/csv" className="nav-link p-0 text-body-secondary">Toml to Csv</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/toml" className="nav-link p-0 text-body-secondary">Toml Format</Link>
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
            <span>© {year} ValidFormat</span><span><Link to="/policy" className="nav-link p-0 text-body-secondary">Privacy Policy</Link></span>
        </div>
    </footer>
}

export default Footer;