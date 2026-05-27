import Logo from '../Logo';

const Footer = () => {
    return <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5">
            <div className='container'>
                    <div className="col mb-3 align-items-center">
                        <a href="/" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none" aria-label="Bootstrap">
                            <Logo height='64' img='icon'/>
                        </a>
                        <p className="text-body-secondary">© 2026</p>
                    </div>
                    <div className="col mb-3"></div>
                    <div className="col mb-3"></div>
                    <div className="col mb-3"></div>
            </div>
        </footer>
}

export default Footer;