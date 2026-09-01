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

const tsv = () => {
    return (
        <div className="card-body">
            <h2 className="card-title">TSV</h2>

            <p className="card-text">
                TSV (Tab-Separated Values) is a plain text format used to store tabular
                data. Each row represents a record, while individual fields are separated
                by tab characters instead of commas. TSV is commonly used for data exchange,
                spreadsheets, and scientific datasets.
            </p>

            <h3>Rules</h3>
            <ul>
                <li>Each line represents a single row of data.</li>
                <li>Fields are separated by tab characters (\t).</li>
                <li>The first row is commonly used as a header.</li>
                <li>All rows should contain the same number of columns.</li>
                <li>Tabs inside field values should be escaped or avoided.</li>
                <li>Line breaks separate records.</li>
                <li>UTF-8 encoding is recommended for maximum compatibility.</li>
            </ul>

            <h3>Validation</h3>
            <ul>
                <li>Each row must contain the same number of fields.</li>
                <li>The document should include a valid header row.</li>
                <li>Column names within the header must be unique.</li>
                <li>Tab characters must be used as field separators.</li>
                <li>Malformed rows or inconsistent delimiters should be reported as errors.</li>
                <li>The document should be valid UTF-8 text.</li>
            </ul>
        </div>
    );
};

const ini = () => {
    return (
        <div className="card-body">
            <h2 className="card-title">INI</h2>

            <p className="card-text">
                INI (Initialization File) is a simple configuration format
                commonly used for application settings. It stores data as
                key-value pairs and organizes related settings into sections.
            </p>

            <h3>Rules</h3>
            <ul>
                <li>Each setting is written as a key-value pair using an equals sign (=).</li>
                <li>Related settings can be grouped into sections using square brackets.</li>
                <li>Section names must be enclosed in square brackets, for example [database].</li>
                <li>Keys should be unique within the same section.</li>
                <li>Values can contain strings, numbers, booleans, or empty values.</li>
                <li>Whitespace around keys and values is generally ignored.</li>
                <li>Comments can be written using semicolon (;) or hash (#) characters.</li>
                <li>INI files are usually plain UTF-8 text files.</li>
            </ul>

            <h3>Validation</h3>
            <ul>
                <li>Each non-empty setting line must contain a valid key and value separator.</li>
                <li>Section names must use matching square brackets.</li>
                <li>Keys must not be empty.</li>
                <li>Section definitions must be syntactically valid.</li>
                <li>Malformed key-value pairs should be rejected.</li>
                <li>Quoted values must have matching opening and closing quotes.</li>
                <li>Duplicate keys within the same section should be avoided.</li>
                <li>Values should use a consistent representation for booleans and numbers.</li>
            </ul>
        </div>
    );
};

const properties = () => {
    return (
        <div className="card-body">
            <h2 className="card-title">Properties</h2>

            <p className="card-text">
                Properties is a simple text-based configuration format
                commonly used by Java applications and frameworks such as
                Spring. It stores configuration values as key-value pairs.
            </p>

            <h3>Rules</h3>

            <ul>
                <li>
                    Each property consists of a key and a value.
                </li>

                <li>
                    The key and value can be separated using an equals sign (=)
                    or a colon (:).
                </li>

                <li>
                    Property names can use dots to represent nested
                    configuration, for example <code>database.host</code>.
                </li>

                <li>
                    Empty lines are ignored.
                </li>

                <li>
                    Comments can start with <code>#</code> or <code>!</code>.
                </li>

                <li>
                    Whitespace around keys and separators is generally ignored.
                </li>

                <li>
                    Values can contain strings, numbers, booleans, or null.
                </li>

                <li>
                    Special characters can be escaped using a backslash.
                </li>
            </ul>

            <h3>Validation</h3>

            <ul>
                <li>
                    Every property must contain a non-empty key.
                </li>

                <li>
                    Property definitions must contain a valid separator.
                </li>

                <li>
                    Property names must not be duplicated.
                </li>

                <li>
                    Nested properties must not conflict with scalar properties.
                </li>

                <li>
                    Escape sequences must use valid Properties syntax.
                </li>

                <li>
                    The input must contain valid text-based property
                    definitions.
                </li>
            </ul>

            <h3>Example</h3>

            <pre>
{`app.name=My Application
app.debug=true
server.port=8080

database.host=localhost
database.port=3306`}
            </pre>
        </div>
    );
};

const hcl = () => {
    return (
        <div className="card-body">
            <h2 className="card-title">
                HCL
            </h2>

            <p className="card-text">
                HCL (HashiCorp Configuration Language) is a
                configuration language developed by HashiCorp.
                It is used by tools such as Terraform, Nomad,
                Consul, and Vault.
            </p>

            <p className="card-text">
                HCL is designed for human-readable configuration
                and supports attributes, blocks, labels, collections,
                and expressions.
            </p>

            <h3>Rules</h3>

            <ul>
                <li>
                    Attributes are written as
                    <code> key = value </code>.
                </li>

                <li>
                    Blocks are enclosed in curly braces.
                </li>

                <li>
                    Blocks can have zero or more labels.
                </li>

                <li>
                    Strings are normally enclosed in double quotes.
                </li>

                <li>
                    Boolean values are written as
                    <code> true </code> or <code> false </code>.
                </li>

                <li>
                    <code>null</code> represents a null value.
                </li>

                <li>
                    Lists are enclosed in square brackets.
                </li>

                <li>
                    Objects are enclosed in curly braces and contain
                    key-value pairs.
                </li>

                <li>
                    Comments can use <code>#</code>,
                    <code>//</code>, or block comments
                    <code>/* ... */</code>.
                </li>

                <li>
                    Identifiers can contain letters, numbers,
                    underscores, and hyphens.
                </li>
            </ul>

            <h3>Validation</h3>

            <ul>
                <li>
                    Attribute names must be valid identifiers.
                </li>

                <li>
                    Every attribute must contain a valid value
                    expression.
                </li>

                <li>
                    Braces, brackets, and strings must be properly
                    closed.
                </li>

                <li>
                    Duplicate attributes within the same body
                    are not allowed.
                </li>

                <li>
                    Block syntax must contain a valid block name
                    and body.
                </li>

                <li>
                    Strings must have matching quotation marks.
                </li>

                <li>
                    Comments must use valid HCL comment syntax.
                </li>
            </ul>

            <h3>Example</h3>

            <pre>
{`app_name = "My Application"
debug = true

server {
  host = "localhost"
  port = 8080
}

database {
  host = "localhost"
  port = 3306
}`}
            </pre>
        </div>
    );
};

export default {
    json,
    xml,
    yaml,
    csv,
    toml,
    tsv,
    ini,
    properties,
    hcl
};