const Ndjson = () => {
    return (
        <div className="card-body">
            <h2 className="card-title">NDJSON</h2>

            <p className="card-text">
                NDJSON (Newline Delimited JSON) is a text format for storing
                a sequence of JSON records, one per line. It is commonly used
                for logs, data streams, and processing large datasets line
                by line.
            </p>

            <h3>Rules</h3>
            <ul>
                <li>Each line contains exactly one valid JSON value.</li>
                <li>Lines are separated by a newline character (\n).</li>
                <li>A single line must not contain embedded line breaks.</li>
                <li>Empty lines are ignored.</li>
                <li>Each line is parsed independently of the others.</li>
            </ul>

            <h3>Validation</h3>
            <ul>
                <li>Every non-empty line must be valid JSON.</li>
                <li>Malformed JSON on any line is reported with its line number.</li>
                <li>The document must contain at least one record.</li>
                <li>Encoding should be UTF-8 for compatibility.</li>
            </ul>

            <h3>Example</h3>

            <pre>
{`{"name":"Alice","age":30}
{"name":"Bob","age":25}`}
            </pre>
        </div>
    );
};

export default Ndjson;
