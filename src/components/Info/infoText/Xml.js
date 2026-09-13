const Xml = () => {
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

export default Xml;
