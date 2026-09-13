const Yaml = () => {
    return <div className="card-body">
            <h2 className="card-title">YAML</h2>
            <p className="card-text">
                YAML is a human-readable data serialization format commonly used for
                configuration files, automation tools, and cloud infrastructure definitions.
            </p>

            <h3>Rules</h3>
            <ul>
                <li>Structure is defined by indentation.</li>
                <li>Spaces must be used for indentation; tabs are not allowed.</li>
                <li>Key-value pairs are separated by a colon.</li>
                <li>Lists are represented using a hyphen (-).</li>
                <li>Consistent indentation is required throughout the document.</li>
            </ul>

            <h3>Validation</h3>
            <ul>
                <li>Indentation must be correct and consistent.</li>
                <li>Tabs must not be used.</li>
                <li>Key-value pairs must follow valid YAML syntax.</li>
                <li>Nested structures must be properly aligned.</li>
                <li>The document must conform to YAML formatting rules.</li>
            </ul>
        </div>
}

export default Yaml;
