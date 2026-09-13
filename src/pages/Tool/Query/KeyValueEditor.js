const KeyValueEditor = ({ rows, onChange, keyPlaceholder = 'Key', valuePlaceholder = 'Value' }) => {
    const updateRow = (index, field, value) => {
        onChange(rows.map((row, i) => i === index ? { ...row, [field]: value } : row));
    }

    const addRow = () => {
        onChange([...rows, { key: '', value: '', enabled: true }]);
    }

    const removeRow = (index) => {
        const next = rows.filter((_, i) => i !== index);
        onChange(next.length ? next : [{ key: '', value: '', enabled: true }]);
    }

    return (
        <div>
            {rows.map((row, index) => (
                <div key={index} className="d-flex gap-2 mb-2 align-items-center">
                    <input
                        type="checkbox"
                        className="form-check-input mt-0 flex-shrink-0"
                        checked={row.enabled}
                        onChange={(e) => updateRow(index, 'enabled', e.target.checked)}
                        title="Enabled"
                    />
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder={keyPlaceholder}
                        value={row.key}
                        onChange={(e) => updateRow(index, 'key', e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder={valuePlaceholder}
                        value={row.value}
                        onChange={(e) => updateRow(index, 'value', e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm flex-shrink-0"
                        onClick={() => removeRow(index)}
                        title="Remove"
                    >
                        &times;
                    </button>
                </div>
            ))}
            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={addRow}>
                + Add
            </button>
        </div>
    )
}

export default KeyValueEditor;
