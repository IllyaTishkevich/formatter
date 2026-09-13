const ToolQuery = () => {
    return (
        <div className="card-body">
            <h2 className="card-title">HTTP Request Tool</h2>

            <p className="card-text">
                A free, browser-based HTTP client for testing APIs — like Postman,
                but nothing to install. Build a request on the left, send it, and
                read the response on the right.
            </p>

            <h3>How to use</h3>
            <ul>
                <li>Pick a method (<code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>PATCH</code>, <code>DELETE</code>, <code>HEAD</code>, <code>OPTIONS</code>) and enter the request URL.</li>
                <li><strong>Query Params</strong> stay in sync with the URL — edit either one and the other updates automatically. Untick a row to disable it without deleting it.</li>
                <li><strong>Authorization</strong> can generate the <code>Authorization</code> header for you — choose Bearer Token or Basic Auth instead of writing it by hand.</li>
                <li><strong>Headers</strong> are a raw JSON object, for example <code>{'{"Content-Type": "application/json"}'}</code>.</li>
                <li><strong>Body</strong> supports JSON, raw text, or <code>x-www-form-urlencoded</code> fields — it's disabled automatically for <code>GET</code>/<code>HEAD</code> requests.</li>
                <li>Click <strong>Request</strong> to send it. The response panel shows the status, timing, and body — switch to <strong>Headers</strong> to see the response headers.</li>
                <li><strong>History</strong> keeps your last 20 requests in this browser so you can reopen and resend them later.</li>
            </ul>

            <h3>Good to know</h3>
            <ul>
                <li>Requests run directly in your browser, so the target server must allow CORS — the same limitation any browser-based tool has.</li>
                <li>Auth tokens, usernames, and passwords are used only for the request itself and are never saved to history.</li>
                <li>History is stored locally in this browser only — it isn't synced or sent anywhere.</li>
            </ul>
        </div>
    );
};

export default ToolQuery;
