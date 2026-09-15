import { Helmet } from "react-helmet-async";
import { useCallback, useEffect, useState } from "react";
import { ActionButton, ActionsBlock } from "../../../components/Actions";
import InfoBlock from "../../../components/Info";
import useMessage from "../../../core/message";
import { label, formatValue } from "./helpers";

// production build (.env.production) points this at the api.validformat.online
// subdomain; local dev leaves it unset, so the base is '' and the endpoint
// below stays a relative path that CRA's "proxy" field (package.json) forwards
// to the local Symfony backend - either way, the backend's own CORS headers
// make cross-origin calls fine too
const API_BASE_URL = (process.env.REACT_APP_API_URL || '').replace(/\/+$/, '');
const IP_ENDPOINT = `${API_BASE_URL}/api/ip`;

const Row = ({ name, value }) => (
    <div className="d-flex border-bottom py-1 small">
        <div className="text-muted flex-shrink-0" style={{ width: '45%' }}>{name}</div>
        <div className="text-break flex-grow-1">{value}</div>
    </div>
);

const Section = ({ title, entries }) => {
    if (!entries.length) {
        return null;
    }

    return (
        <div className="mb-3">
            <h6 className="text-uppercase text-muted small mb-1">{title}</h6>
            {entries.map(([key, value]) => (
                <Row key={key} name={label(key)} value={formatValue(value)} />
            ))}
        </div>
    );
};

const pick = (data, keys) => keys
    .filter((key) => data[key] !== undefined)
    .map((key) => [key, data[key]]);

const Ip = () => {
    const domainName = process.env.PUBLIC_URL;
    const isPrerender = navigator.userAgent === 'ReactSnap';

    const { addErrorMessage } = useMessage();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const fetchIp = useCallback(async () => {
        setLoading(true);
        setCopied(false);

        try {
            const res = await fetch(IP_ENDPOINT);

            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`);
            }

            setData(await res.json());
        } catch (e) {
            addErrorMessage(`Failed to load IP information: ${e.message}`);
        } finally {
            setLoading(false);
        }
    }, [addErrorMessage]);

    useEffect(() => {
        if (!isPrerender) {
            fetchIp();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCopy = useCallback(() => {
        if (!data?.ip) {
            return;
        }

        navigator.clipboard.writeText(data.ip);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }, [data]);

    const title = 'What Is My IP Address – Free IP & Client Info Tool';
    const description = 'See your public IP address and everything your browser and network reveal about you - browser, client hints, language, headers, and more.';
    const url_ = `${domainName}${window.location.pathname}`;

    return <>
        { isPrerender ? (
        <Helmet>
            <title>
                { title + '| ValidFormat' }
            </title>
            <meta
                name="description"
                content={ description }
            />
            <meta property="og:title" content={ title + '| ValidFormat' } />
            <meta
                property="og:description"
                content={ description }
            />
            <link rel="canonical" href={ url_ } />
            <meta property="og:url" content={ url_ } />
            <meta name="twitter:title" content={ title + '| ValidFormat' } />
            <meta name="twitter:description" content={ description } />
        </Helmet>
        ) : (
        <main className="py-3 px-5">
            <h1 className="display-6 fw-normal mb-3">IP Address Tool</h1>
            <div className="d-flex flex-column flex-xl-row">
                <div className="bg-body-tertiary border rounded-3 p-3 panel panel-input d-flex flex-column align-items-center justify-content-center text-center">
                    <div className="text-muted small mb-2">Your IP address</div>
                    <div className="display-5 fw-bold text-break">
                        { loading && !data ? '…' : (data?.ip || 'Unavailable') }
                    </div>
                    { data?.ips?.length > 1 && (
                        <div className="text-muted small mt-2 text-break">
                            Chain: {data.ips.join(' → ')}
                        </div>
                    ) }
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm mt-3"
                        onClick={handleCopy}
                        disabled={!data?.ip}
                    >
                        { copied ? 'Copied!' : 'Copy' }
                    </button>
                </div>

                <ActionsBlock>
                    <ActionButton handler={fetchIp} label={ loading ? 'Loading...' : 'Retry' } />
                </ActionsBlock>

                <div className="bg-body-tertiary border rounded-3 p-3 panel panel-output">
                    { !data ? (
                        <div className="text-muted small">
                            { loading ? 'Loading client information…' : 'No data yet.' }
                        </div>
                    ) : (
                        <>
                            <Section
                                title="Network"
                                entries={pick(data, ['ip', 'ips', 'forwardedFor', 'host', 'port', 'scheme', 'secure'])}
                            />
                            <Section
                                title="Browser"
                                entries={pick(data.browser || {}, ['name', 'version'])}
                            />
                            <Section
                                title="Client hints"
                                entries={Object.entries(data.clientHints || {})}
                            />
                            <Section
                                title="Language & encoding"
                                entries={pick(data, ['acceptLanguage', 'preferredLanguages', 'acceptEncoding', 'accept', 'dnt'])}
                            />
                            <Section
                                title="Request"
                                entries={pick(data, ['method', 'protocolVersion', 'referer', 'origin', 'requestTime'])}
                            />
                            <Section
                                title="User agent"
                                entries={pick(data, ['userAgent'])}
                            />
                            <Section
                                title="Raw headers"
                                entries={Object.entries(data.headers || {})}
                            />
                        </>
                    ) }
                </div>
            </div>
            <InfoBlock themes={['tool-ip']} />
        </main>
            )}
    </>
};

export default Ip;
