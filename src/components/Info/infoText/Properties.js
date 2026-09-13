const Properties = () => {
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

export default Properties;
