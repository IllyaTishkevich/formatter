const QueryString = () => {
    return (
        <div className="card-body">
            <h2 className="card-title">Query String</h2>

            <p className="card-text">
                A query string (<code>application/x-www-form-urlencoded</code>)
                is the part of a URL used to pass key-value parameters, such
                as <code>?a=1&amp;b=2</code>. It is commonly used for API
                requests, search filters, and form submissions.
            </p>

            <h3>Rules</h3>
            <ul>
                <li>Parameters are written as <code>key=value</code> pairs.</li>
                <li>Pairs are separated by an ampersand (<code>&amp;</code>).</li>
                <li>A leading question mark (<code>?</code>) is optional and ignored.</li>
                <li>Special characters in keys and values must be percent-encoded.</li>
                <li>Spaces are encoded as <code>%20</code> or <code>+</code>.</li>
                <li>A repeated key (for example <code>tags=a&amp;tags=b</code>) becomes an array.</li>
                <li>Dot notation in a key (for example <code>user.name=John</code>) represents a nested object.</li>
            </ul>

            <h3>Validation</h3>
            <ul>
                <li>Every parameter must have a non-empty name.</li>
                <li>Percent-encoded sequences should be well-formed.</li>
                <li>The document must contain at least one parameter.</li>
                <li>Encoding should be UTF-8 for compatibility.</li>
            </ul>

            <h3>Example</h3>

            <pre>
{`a=1
&b=hello%20world
&tags=x
&tags=y
&user.name=John`}
            </pre>
        </div>
    );
};

export default QueryString;
