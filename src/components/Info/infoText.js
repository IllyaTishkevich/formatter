const json = () => {
    return <div className="card-body">
            <h2 className="card-title">JSON</h2>
            <p className="card-text">
                JSON is a lightweight text-based data format commonly used for APIs,
                web applications, and data exchange.
            </p>

            <h3>Rules</h3>
            <ul>
                <li>Data is organized using objects {} and arrays [].</li>
                <li>Object keys must be enclosed in double quotes.</li>
                <li>String values must use double quotes.</li>
                <li>Trailing commas are not allowed.</li>
                <li>Supported types: strings, numbers, booleans, null, objects, and arrays.</li>
            </ul>

            <h3>Validation</h3>
            <ul>
                <li>All brackets and braces must be properly closed.</li>
                <li>Keys and strings must use double quotes.</li>
                <li>Commas and colons must be placed correctly.</li>
                <li>The document must follow valid JSON syntax.</li>
            </ul>
        </div>
}

const xml = () => {
    return <div className="card-body">
            <h2 className="card-title">XML</h2>
            <p className="card-text">
                XML is a markup language used to store and transport structured data.
                It is widely used in integrations, documents, and enterprise systems.
            </p>

            <h3>Rules</h3>
            <ul>
                <li>Every opening tag must have a matching closing tag.</li>
                <li>Elements must be properly nested.</li>
                <li>The document must contain a single root element.</li>
                <li>Tag names are case-sensitive.</li>
                <li>Attributes must be enclosed in quotes.</li>
            </ul>

            <h3>Validation</h3>
            <ul>
                <li>All tags must be properly closed.</li>
                <li>Elements must be correctly nested.</li>
                <li>The document must contain exactly one root element.</li>
                <li>Reserved characters such as &lt;, &gt;, and &amp; must be escaped.</li>
                <li>XML can optionally be validated against DTD or XSD schemas.</li>
            </ul>
        </div>
}

const yaml = () => {
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

const csv = () => {
    return (
        <div className="card-body">
            <h2 className="card-title">CSV</h2>

            <p className="card-text">
                CSV (Comma-Separated Values) is a lightweight tabular data format used for
                storing structured data in plain text. It is widely used for data exchange
                between systems, spreadsheets, and databases.
            </p>

            <h3>Rules</h3>
            <ul>
                <li>Each line represents a single row of data.</li>
                <li>Fields are separated by commas (,).</li>
                <li>The first row is often used as a header.</li>
                <li>All rows should have the same number of columns.</li>
                <li>Fields containing commas, quotes, or line breaks must be enclosed in double quotes.</li>
                <li>Double quotes inside fields must be escaped by doubling them ("").</li>
                <li>No strict indentation rules apply, but formatting must remain consistent.</li>
            </ul>

            <h3>Validation</h3>
            <ul>
                <li>All rows must have equal column count.</li>
                <li>CSV must not contain malformed or unescaped quotes.</li>
                <li>Empty lines should be ignored or handled consistently.</li>
                <li>Header (if present) must match expected schema.</li>
                <li>Commas inside quoted fields must not be treated as separators.</li>
                <li>Encoding should be UTF-8 for compatibility.</li>
            </ul>
        </div>
    );
};

const toml = () => {
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

export default {
    json,
    xml,
    yaml,
    csv,
    toml
};