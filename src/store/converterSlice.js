import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    input: '',
    output: '',
    errors: [],
    format: 'json',
}

const converterSlice = createSlice({
    name: 'converter',
    initialState,
    reducers: {
        setInput: (state, action) => {
            state.input = action.payload
        },

        setOutput: (state, action) => {
            state.output = action.payload
        },

        setErrors: (state, action) => {
            state.errors = action.payload
        },

        clear: (state) => {
            state.input = ''
            state.output = null
            state.errors = []
        },
    },
})

export const { setInput, setOutput, setErrors, clear } =
    converterSlice.actions

export default converterSlice.reducer