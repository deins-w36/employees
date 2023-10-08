import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IEmployee } from '../../config/IEmployee'
import employees from '../../employees.json'

interface IInitState {
    employees: IEmployee[]
    loading: boolean
    error: boolean
}

const initState: IInitState = {
    employees: employees as IEmployee[],
    loading: false,
    error: false
}

export const employeesSlice = createSlice({
    name: 'employees',
    initialState: initState,
    reducers: {
        addNewEmployee(state, { payload }: PayloadAction<IEmployee>) {
            state.employees = [...state.employees, payload]
        },
        editEmployee(state, { payload }: PayloadAction<IEmployee>) {
            const index = state.employees.findIndex((el) => el.id === payload.id)

            state.employees[index] = payload
        }
    }
})

export default employeesSlice.reducer
