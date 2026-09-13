import Editor from '@monaco-editor/react'
import { Helmet } from "react-helmet-async";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { ActionButton, ActionsBlock } from "../../../components/Actions";
import InfoBlock from "../../../components/Info";
import useMessage from "../../../core/message";
import { setInput, INPUT_STORAGE_KEY } from "../../../store/converterSlice";
import KeyValueEditor from "./KeyValueEditor";
import {
    HISTORY_LIMIT,
    emptyRow,
    splitUrl,
    buildUrl,
    rowsFromQuery,
    queryFromRows,
    hasHeader,
    loadHistory,
    saveHistory
} from "./helpers";

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

const DEFAULT_HEADERS = `{
  "Content-Type": "application/json"
}`;

const DEFAULT_BODY = `{

}`;

const getResponseLanguage = (contentType) => {
    if (!contentType) {
        return 'plaintext';
    }

    if (contentType.includes('json')) {
        return 'json';
    }

    if (contentType.includes('xml') || contentType.includes('html')) {
        return 'xml';
    }

    return 'plaintext';
}

const formatResponseBody = (text, language) => {
    if (language !== 'json') {
        return text;
    }

    try {
        return JSON.stringify(JSON.parse(text), null, 2);
    } catch (e) {
        return text;
    }
}

const Query = () => {
    const domainName = process.env.PUBLIC_URL;
    const isPrerender =
        navigator.userAgent === 'ReactSnap';

    const { addErrorMessage } = useMessage();
    const dispatch = useDispatch();

    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('');
    const [params, setParams] = useState([emptyRow()]);

    const [authType, setAuthType] = useState('none');
    const [authToken, setAuthToken] = useState('');
    const [authUser, setAuthUser] = useState('');
    const [authPass, setAuthPass] = useState('');

    const [headers, setHeaders] = useState(DEFAULT_HEADERS);

    const [bodyType, setBodyType] = useState('json');
    const [body, setBody] = useState(DEFAULT_BODY);
    const [formRows, setFormRows] = useState([emptyRow()]);

    const [response, setResponse] = useState(null);
    const [responseTab, setResponseTab] = useState('body');
    const [loading, setLoading] = useState(false);

    const [history, setHistory] = useState(() => loadHistory());
    const [historyOpen, setHistoryOpen] = useState(false);

    const bodyDisabled = method === 'GET' || method === 'HEAD';

    const handleUrlChange = (value) => {
        setUrl(value);
        const { query } = splitUrl(value);
        setParams(rowsFromQuery(query));
    }

    const handleParamsChange = (newRows) => {
        setParams(newRows);
        setUrl((prevUrl) => {
            const { base, hash } = splitUrl(prevUrl);
            return buildUrl(base, queryFromRows(newRows), hash);
        });
    }

    const handleLoadHistory = (entry) => {
        setMethod(entry.method);
        setUrl(entry.url);
        setParams(rowsFromQuery(splitUrl(entry.url).query));
        setHeaders(entry.headers ?? DEFAULT_HEADERS);
        setBodyType(entry.bodyType ?? 'json');
        setBody(entry.body ?? DEFAULT_BODY);
        setFormRows(entry.formRows && entry.formRows.length ? entry.formRows : [emptyRow()]);
        setAuthType(entry.authType ?? 'none');
        setAuthToken('');
        setAuthUser('');
        setAuthPass('');
        setHistoryOpen(false);
    }

    const handleHistoryRemove = (id) => {
        setHistory((prev) => {
            const next = prev.filter((entry) => entry.id !== id);
            saveHistory(next);
            return next;
        });
    }

    const handleHistoryClear = () => {
        setHistory([]);
        saveHistory([]);
    }

    const handleRequest = useCallback(async () => {
        if (!url.trim()) {
            addErrorMessage('URL is required');
            return;
        }

        let parsedHeaders = {};

        if (headers.trim()) {
            try {
                parsedHeaders = JSON.parse(headers);
            } catch (e) {
                addErrorMessage(`Invalid headers JSON: ${e.message}`);
                return;
            }
        }

        const finalHeaders = { ...parsedHeaders };

        if (!bodyDisabled && bodyType === 'form' && !hasHeader(finalHeaders, 'content-type')) {
            finalHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        if (authType === 'bearer' && authToken.trim()) {
            finalHeaders['Authorization'] = `Bearer ${authToken.trim()}`;
        } else if (authType === 'basic' && (authUser || authPass)) {
            finalHeaders['Authorization'] = `Basic ${btoa(`${authUser}:${authPass}`)}`;
        }

        setHistory((prev) => {
            const entry = {
                id: Date.now(),
                method,
                url,
                headers,
                bodyType,
                body,
                formRows,
                authType
            };

            const next = [entry, ...prev].slice(0, HISTORY_LIMIT);
            saveHistory(next);
            return next;
        });

        setLoading(true);
        setResponse(null);
        setResponseTab('body');

        const start = performance.now();

        try {
            const options = { method, headers: finalHeaders };

            if (!bodyDisabled) {
                if (bodyType === 'form') {
                    options.body = queryFromRows(formRows);
                } else if (bodyType !== 'none' && body.trim()) {
                    options.body = body;
                }
            }

            const res = await fetch(url, options);
            const text = await res.text();

            const responseHeaders = {};
            res.headers.forEach((value, key) => {
                responseHeaders[key] = value;
            });

            setResponse({
                ok: res.ok,
                status: res.status,
                statusText: res.statusText,
                headers: responseHeaders,
                body: text,
                time: Math.round(performance.now() - start)
            });

            // send the response body to the converter's input, so it's ready to convert
            const formattedBody = formatResponseBody(text, getResponseLanguage(responseHeaders['content-type']));
            dispatch(setInput(formattedBody));

            try {
                localStorage.setItem(INPUT_STORAGE_KEY, formattedBody);
            } catch (e) {
                // storage unavailable (private mode, quota) - input is still set for this session
            }
        } catch (e) {
            addErrorMessage(`Request failed: ${e.message}`);
        } finally {
            setLoading(false);
        }
    }, [method, url, headers, bodyType, body, formRows, bodyDisabled, authType, authToken, authUser, authPass, addErrorMessage, dispatch]);

    const responseLanguage = useMemo(() => {
        return getResponseLanguage(response?.headers['content-type']);
    }, [response]);

    const responseValue = useMemo(() => {
        if (!response) {
            return '';
        }

        return formatResponseBody(response.body, responseLanguage);
    }, [response, responseLanguage]);

    const responseHeadersText = useMemo(() => {
        if (!response) {
            return '';
        }

        return Object.entries(response.headers)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
    }, [response]);

    const title = 'HTTP Request Tool Online – Free API Client';
    const description = 'Send GET, POST, PUT, PATCH, and DELETE requests online. A free, browser-based HTTP client for testing APIs, with query params, auth, custom headers, and a JSON body.';
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
            <h1 className="display-6 fw-normal mb-3">HTTP Request Tool</h1>
            <div className="d-flex flex-column flex-xl-row">
                <div className="bg-body-tertiary border rounded-3 p-3 panel panel-input">
                    <div className="d-flex gap-2 mb-2">
                        <select
                            className="form-select form-select-sm"
                            style={{ maxWidth: 110 }}
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                        >
                            {METHODS.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="https://api.example.com/endpoint"
                            value={url}
                            onChange={(e) => handleUrlChange(e.target.value)}
                        />
                    </div>

                    <div className="position-relative mb-3">
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => setHistoryOpen((open) => !open)}
                        >
                            History{ history.length > 0 && ` (${history.length})` }
                        </button>

                        { historyOpen && (
                            <div
                                className="position-absolute bg-body border rounded-3 shadow-sm p-2 mt-1"
                                style={{ zIndex: 10, minWidth: '320px', maxWidth: '90vw', maxHeight: '300px', overflowY: 'auto' }}
                            >
                                { history.length === 0 ? (
                                    <div className="text-muted small p-2">No requests yet</div>
                                ) : (
                                    <>
                                        { history.map((entry) => (
                                            <div key={entry.id} className="d-flex align-items-center gap-2 py-1 border-bottom">
                                                <button
                                                    type="button"
                                                    className="btn btn-link btn-sm text-start text-decoration-none flex-grow-1 text-truncate p-0"
                                                    onClick={() => handleLoadHistory(entry)}
                                                    title={entry.url}
                                                >
                                                    <span className="badge bg-secondary me-1">{entry.method}</span>
                                                    <span className="small">{entry.url}</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-secondary flex-shrink-0"
                                                    onClick={() => handleHistoryRemove(entry.id)}
                                                    title="Remove"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        )) }
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-danger mt-2 w-100"
                                            onClick={handleHistoryClear}
                                        >
                                            Clear history
                                        </button>
                                    </>
                                ) }
                            </div>
                        ) }
                    </div>

                    <label className="form-label small text-muted mb-1">Query Params</label>
                    <KeyValueEditor rows={params} onChange={handleParamsChange} keyPlaceholder="Param" valuePlaceholder="Value" />

                    <label className="form-label small text-muted mb-1 mt-3">Authorization</label>
                    <div className="d-flex gap-2 mb-1">
                        <select
                            className="form-select form-select-sm"
                            style={{ maxWidth: 160 }}
                            value={authType}
                            onChange={(e) => setAuthType(e.target.value)}
                        >
                            <option value="none">No Auth</option>
                            <option value="bearer">Bearer Token</option>
                            <option value="basic">Basic Auth</option>
                        </select>

                        { authType === 'bearer' && (
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Token"
                                value={authToken}
                                onChange={(e) => setAuthToken(e.target.value)}
                            />
                        ) }

                        { authType === 'basic' && (
                            <>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Username"
                                    value={authUser}
                                    onChange={(e) => setAuthUser(e.target.value)}
                                />
                                <input
                                    type="password"
                                    className="form-control form-control-sm"
                                    placeholder="Password"
                                    value={authPass}
                                    onChange={(e) => setAuthPass(e.target.value)}
                                />
                            </>
                        ) }
                    </div>
                    { authType !== 'none' && (
                        <div className="form-text mb-2">Credentials are used for the request only — not saved in history.</div>
                    ) }

                    <label className="form-label small text-muted mb-1 mt-2">Headers (JSON)</label>
                    <Editor
                        height="150px"
                        language="json"
                        value={headers}
                        onChange={(val) => setHeaders(val || '')}
                        options={{
                            minimap: { enabled: false },
                            automaticLayout: true,
                            scrollBeyondLastLine: false,
                            wordWrap: 'on'
                        }}
                    />

                    <label className="form-label small text-muted mb-1 mt-3">Body</label>
                    <select
                        className="form-select form-select-sm mb-2"
                        style={{ maxWidth: 220 }}
                        value={bodyType}
                        onChange={(e) => setBodyType(e.target.value)}
                        disabled={bodyDisabled}
                    >
                        <option value="json">JSON</option>
                        <option value="raw">Raw Text</option>
                        <option value="form">x-www-form-urlencoded</option>
                        <option value="none">None</option>
                    </select>

                    { bodyDisabled ? (
                        <div className="form-text">Body is not sent for {method} requests.</div>
                    ) : bodyType === 'none' ? (
                        <div className="form-text">No body will be sent.</div>
                    ) : bodyType === 'form' ? (
                        <KeyValueEditor rows={formRows} onChange={setFormRows} keyPlaceholder="Field" valuePlaceholder="Value" />
                    ) : (
                        <Editor
                            height="250px"
                            language={bodyType === 'json' ? 'json' : 'plaintext'}
                            value={body}
                            onChange={(val) => setBody(val || '')}
                            options={{
                                minimap: { enabled: false },
                                automaticLayout: true,
                                scrollBeyondLastLine: false,
                                wordWrap: 'on'
                            }}
                        />
                    ) }
                </div>

                <ActionsBlock>
                    <ActionButton handler={handleRequest} label={ loading ? 'Loading...' : 'Request' } />
                </ActionsBlock>

                <div className="bg-body-tertiary border rounded-3 p-3 panel panel-output">
                    <div className="d-flex gap-3 mb-2 small align-items-center" style={{ minHeight: '1.5rem' }}>
                        { response && (
                            <>
                                <span className={`badge ${response.ok ? 'bg-success' : 'bg-danger'}`}>
                                    { response.status } { response.statusText }
                                </span>
                                <span className="text-muted">{ response.time } ms</span>
                            </>
                        ) }
                        <div className="ms-auto btn-group btn-group-sm">
                            <button
                                type="button"
                                className={`btn btn-outline-secondary ${responseTab === 'body' ? 'active' : ''}`}
                                onClick={() => setResponseTab('body')}
                            >
                                Body
                            </button>
                            <button
                                type="button"
                                className={`btn btn-outline-secondary ${responseTab === 'headers' ? 'active' : ''}`}
                                onClick={() => setResponseTab('headers')}
                            >
                                Headers
                            </button>
                        </div>
                    </div>
                    <Editor
                        height="500px"
                        language={responseTab === 'headers' ? 'plaintext' : responseLanguage}
                        value={responseTab === 'headers' ? responseHeadersText : responseValue}
                        options={{
                            readOnly: true,
                            minimap: { enabled: false },
                            automaticLayout: true,
                            scrollBeyondLastLine: false,
                            wordWrap: 'on'
                        }}
                    />
                </div>
            </div>
            <InfoBlock themes={['tool-query']} />
        </main>
            )}
    </>
};

export default Query;
