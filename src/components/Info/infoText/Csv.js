const Csv = () => {
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

export default Csv;
