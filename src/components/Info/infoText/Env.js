const Env = () => {
    return (
        <div className="card-body">
            <h2 className="card-title">ENV</h2>

            <p className="card-text">
                ENV (.env / dotenv) is a plain text format used to define
                environment variables. It is widely used in Node.js, Python,
                Docker, and many other application setups for local
                configuration and secrets.
            </p>

            <h3>Rules</h3>
            <ul>
                <li>Each line defines one variable as <code>KEY=VALUE</code>.</li>
                <li>An optional <code>export </code> prefix before the key is allowed.</li>
                <li>Variable names may use letters, digits, underscores, and dots.</li>
                <li>Values may be left bare, or wrapped in single or double quotes.</li>
                <li>Double-quoted values support escape sequences such as <code>\n</code> and <code>\"</code>.</li>
                <li>Empty lines are ignored.</li>
                <li>Comments start with <code>#</code>.</li>
            </ul>

            <h3>Validation</h3>
            <ul>
                <li>Every non-empty, non-comment line must contain a valid <code>KEY=VALUE</code> pair.</li>
                <li>Variable names must not be empty or duplicated.</li>
                <li>Quoted values must have matching opening and closing quotes.</li>
                <li>The document must be valid UTF-8 text.</li>
            </ul>

            <h3>Example</h3>

            <pre>
{`APP_NAME=My Application
DEBUG=true
PORT=8080

DATABASE.HOST=localhost
DATABASE.PORT=3306`}
            </pre>
        </div>
    );
};

export default Env;
