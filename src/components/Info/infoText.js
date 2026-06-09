const json = () => {
    return <div className="card-body">
            <h5 className="card-title">JSON</h5>
            <p className="card-text">
                JSON is a lightweight text-based data format commonly used for APIs,
                web applications, and data exchange.
            </p>

            <h6>Rules</h6>
            <ul>
                <li>Data is organized using objects {} and arrays [].</li>
                <li>Object keys must be enclosed in double quotes.</li>
                <li>String values must use double quotes.</li>
                <li>Trailing commas are not allowed.</li>
                <li>Supported types: strings, numbers, booleans, null, objects, and arrays.</li>
            </ul>

            <h6>Validation</h6>
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
            <h5 className="card-title">XML</h5>
            <p className="card-text">
                XML is a markup language used to store and transport structured data.
                It is widely used in integrations, documents, and enterprise systems.
            </p>

            <h6>Rules</h6>
            <ul>
                <li>Every opening tag must have a matching closing tag.</li>
                <li>Elements must be properly nested.</li>
                <li>The document must contain a single root element.</li>
                <li>Tag names are case-sensitive.</li>
                <li>Attributes must be enclosed in quotes.</li>
            </ul>

            <h6>Validation</h6>
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
            <h5 className="card-title">YAML</h5>
            <p className="card-text">
                YAML is a human-readable data serialization format commonly used for
                configuration files, automation tools, and cloud infrastructure definitions.
            </p>

            <h6>Rules</h6>
            <ul>
                <li>Structure is defined by indentation.</li>
                <li>Spaces must be used for indentation; tabs are not allowed.</li>
                <li>Key-value pairs are separated by a colon.</li>
                <li>Lists are represented using a hyphen (-).</li>
                <li>Consistent indentation is required throughout the document.</li>
            </ul>

            <h6>Validation</h6>
            <ul>
                <li>Indentation must be correct and consistent.</li>
                <li>Tabs must not be used.</li>
                <li>Key-value pairs must follow valid YAML syntax.</li>
                <li>Nested structures must be properly aligned.</li>
                <li>The document must conform to YAML formatting rules.</li>
            </ul>
        </div>
}

export default {
    json,
    xml,
    yaml
};