const Tsv = () => {
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

export default Tsv;
