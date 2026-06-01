import Logo from '../Logo';

const Header = () => {
    return <header className="p-3">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                        <Logo height='24' img='icon'/>
                    </a>
                    <h6 className="mb-0">
                        One Tool. Every <span className="text-primary">Format</span>.
                    </h6>
                </div>
            </div>
        </header>
}

export default Header;