const Json = () => {
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

export default Json;
