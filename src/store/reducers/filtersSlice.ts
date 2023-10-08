import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { nameRolesType } from '../../config/IRole'
import { sortNameType } from '../../config/ISort'

interface IInitState {
    search: string
    filter: nameRolesType
    isArchive: boolean
    sort: sortNameType
}

const initState: IInitState = {
    search: '',
    filter: 'all',
    isArchive: false,
    sort: 'nameAToZ'
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: initState,
    reducers: {
        changeSearch(state, { payload }: PayloadAction<string>) {
            state.search = payload
        },
        changeFilter(state, { payload }: PayloadAction<nameRolesType>) {
            state.filter = payload
        },
        changeIsArchive(state, { payload }: PayloadAction<boolean>) {
            state.isArchive = payload
        },
        changeSort(state, { payload }: PayloadAction<sortNameType>) {
            state.sort = payload
        }
    }
})

export default filtersSlice.reducer
