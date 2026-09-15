const label = (key) => key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (c) => c.toUpperCase());

const formatValue = (value) => {
    if (value === null || value === undefined || value === '') {
        return '—';
    }

    if (Array.isArray(value)) {
        return value.length ? value.join(', ') : '—';
    }

    if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
    }

    if (typeof value === 'object') {
        return Object.entries(value)
            .map(([k, v]) => `${label(k)}: ${formatValue(v)}`)
            .join('; ') || '—';
    }

    return String(value);
};

export { label, formatValue };
