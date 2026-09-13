const Hcl = () => {
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
                    <code>{'//'}</code>, or block comments
                    <code>{'/* ... */'}</code>.
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

export default Hcl;
