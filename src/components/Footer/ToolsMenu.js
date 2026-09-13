import { Link } from "react-router-dom";

const TOOLS = [
    { path: '/tool/query', label: 'HTTP Request Tool' }
];

const ToolsMenu = () => {
    return <>
            <div className="col mb-12 align-items-end text-end">
                <h6>Tools:</h6>
            </div>
            <div className="col mb-3 align-items-end text-end">
                <ul className="nav flex-column">
                    { TOOLS.map((tool) => (
                        <li className="nav-item mb-2" key={tool.path}>
                            <Link to={tool.path} className="nav-link p-0 text-body-secondary">{tool.label}</Link>
                        </li>
                    )) }
                </ul>
            </div>
        </>
}

export default ToolsMenu;
