import Logo from '../Logo';

const Header = () => {
    return <header className="p-3 mb-2">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                        <Logo height='24' img='icon'/>
                    </a>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    </ul>
                </div>
            </div>
        </header>
}

export default Header;