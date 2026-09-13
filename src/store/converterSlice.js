import { createSlice } from '@reduxjs/toolkit'

const INPUT_STORAGE_KEY = 'converter-input';

const readStoredInput = () => {
    try {
        return localStorage.getItem(INPUT_STORAGE_KEY) || '';
    } catch (e) {
        return '';
    }
}

const initialState = {
    input: readStoredInput(),
    output: '',
    errors: [],
    format: 'json',
}

const converterSlice = createSlice({
    name: 'converter',
    initialState,
    reducers: {
        setInput: (state, action) => {
            state.input = action.payload;
        },

        setOutput: (state, action) => {
            state.output = action.payload;
        },

        setErrors: (state, action) => {
            state.errors = action.payload;
        },

        clear: (state) => {
            state.input = '';
            state.output = null;
            state.errors = [];
        },

        addErrors: (state, action) => {
            state.errors.push(action.payload);
        },

        removeError: (state, action) => {
            state.errors.splice(action.payload, 1);
        },

        removeFirstError: (state) => {
            state.errors.shift();
        }
    },
})

export const {
    setInput,
    setOutput,
    setErrors,
    clear,
    addErrors,
    removeError,
    removeFirstError
} =
    converterSlice.actions

export { INPUT_STORAGE_KEY }

export default converterSlice.reducer