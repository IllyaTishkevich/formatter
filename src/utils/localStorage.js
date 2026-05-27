export const loadState = () => {
    try {
        const data = localStorage.getItem('converter_state')
        return data ? JSON.parse(data) : undefined
    } catch {
        return undefined
    }
}

export const saveState = (state) => {
    try {
        localStorage.setItem(
            'converter_state',
            JSON.stringify(state)
        )
    } catch (e) {
        console.error('localStorage save error', e)
    }
}