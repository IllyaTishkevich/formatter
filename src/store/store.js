import { configureStore } from '@reduxjs/toolkit'
import converterReducer from './converterSlice'
import { loadState, saveState } from '../utils/localStorage'

const preloadedState = loadState()

export const store = configureStore({
    reducer: {
        converter: converterReducer,
    },
    preloadedState,
})

store.subscribe(() => {
    saveState({
        converter: store.getState().converter,
    })
})