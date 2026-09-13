const Toml = () => {
    return (
        <div className="card-body">
            <h2 className="card-title">TOML</h2>

            <p className="card-text">
                TOML (Tom's Obvious, Minimal Language) is a human-readable configuration
                file format designed to be easy to write and understand. It is commonly
                used for application settings, project configuration, and infrastructure tools.
            </p>

            <h3>Rules</h3>
            <ul>
                <li>Data is stored as key-value pairs.</li>
                <li>Keys may be unquoted or quoted strings.</li>
                <li>Strings, numbers, booleans, dates, arrays, and tables are supported.</li>
                <li>Tables are defined using square brackets ([table]).</li>
                <li>Nested tables use dot notation or nested table declarations.</li>
                <li>Arrays must contain values of the same type.</li>
                <li>Comments begin with the # character and continue to the end of the line.</li>
            </ul>

            <h3>Validation</h3>
            <ul>
                <li>All keys within the same table must be unique.</li>
                <li>Table definitions must not be duplicated.</li>
                <li>Arrays must contain valid TOML values.</li>
                <li>Strings must use proper quoting and escaping rules.</li>
                <li>Numbers, dates, and booleans must follow TOML syntax.</li>
                <li>The document must be valid UTF-8 encoded text.</li>
            </ul>
        </div>
    );
};

export default Toml;
