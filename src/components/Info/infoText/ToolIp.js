const ToolIp = () => {
    return (
        <div className="card-body">
            <h2 className="card-title">IP Address Tool</h2>

            <p className="card-text">
                Shows the public IP address your browser is connecting from, along with
                everything else your request reveals about your browser and network.
            </p>

            <h3>How to use</h3>
            <ul>
                <li>Your <strong>IP address</strong> is shown on the left as soon as the page loads.</li>
                <li>Click <strong>Retry</strong> to refresh the information — useful after switching networks or a VPN.</li>
                <li>The panel on the right lists everything the server can see: browser and client hints, language and encoding preferences, request details, and the raw request headers.</li>
            </ul>

            <h3>Good to know</h3>
            <ul>
                <li>The IP address is whatever your browser's connection presents to the server — behind a proxy, VPN, or corporate network this may not be your device's own address.</li>
                <li>Nothing here is stored — each click sends a fresh request and the response isn't saved.</li>
            </ul>
        </div>
    );
};

export default ToolIp;
