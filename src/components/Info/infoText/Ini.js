const Ini = () => {
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

export default Ini;
