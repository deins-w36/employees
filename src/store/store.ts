import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import employeesReducer from './reducers/employeesSlice'
import filtersReducer from './reducers/filtersSlice'

const rootReducer = combineReducers({
    employeesReducer,
    filtersReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
