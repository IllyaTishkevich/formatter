const HISTORY_KEY = 'tool-query-history';
const HISTORY_LIMIT = 20;

const emptyRow = () => ({ key: '', value: '', enabled: true });

const splitUrl = (fullUrl) => {
    const hashIndex = fullUrl.indexOf('#');
    const withoutHash = hashIndex === -1 ? fullUrl : fullUrl.slice(0, hashIndex);
    const hash = hashIndex === -1 ? '' : fullUrl.slice(hashIndex);

    const queryIndex = withoutHash.indexOf('?');
    const base = queryIndex === -1 ? withoutHash : withoutHash.slice(0, queryIndex);
    const query = queryIndex === -1 ? '' : withoutHash.slice(queryIndex + 1);

    return { base, query, hash };
}

const buildUrl = (base, query, hash) => {
    return query ? `${base}?${query}${hash}` : `${base}${hash}`;
}

const rowsFromQuery = (query) => {
    if (!query) {
        return [emptyRow()];
    }

    const rows = [...new URLSearchParams(query).entries()]
        .map(([key, value]) => ({ key, value, enabled: true }));

    return rows.length ? rows : [emptyRow()];
}

const queryFromRows = (rows) => {
    const params = new URLSearchParams();

    rows.forEach(({ key, value, enabled }) => {
        if (enabled && key) {
            params.append(key, value);
        }
    });

    return params.toString();
}

const hasHeader = (headersObj, name) => {
    return Object.keys(headersObj).some((key) => key.toLowerCase() === name.toLowerCase());
}

const loadHistory = () => {
    try {
        const raw = localStorage.getItem(HISTORY_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

const saveHistory = (history) => {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, HISTORY_LIMIT)));
    } catch (e) {
        // localStorage unavailable (private mode, quota) - history just won't persist
    }
}

export {
    HISTORY_LIMIT,
    emptyRow,
    splitUrl,
    buildUrl,
    rowsFromQuery,
    queryFromRows,
    hasHeader,
    loadHistory,
    saveHistory
}
