import React, { useCallback, FC } from 'react'

import { rolesArray, sortValues } from '../../constans/const'
import EmployeesItem from '../EmployeesItem/EmployeesItem'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IEmployee } from '../../config/IEmployee'
import { filtersSlice } from '../../store/reducers/filtersSlice'
import { nameRolesType } from '../../config/IRole'
import { sortNameType } from '../../config/ISort'

import Input from '../common/Input/Input'
import Button from '../common/Button/Button'

import './employeesList.scss'

const EmployeesList: FC = () => {
    const { employees } = useAppSelector((state) => state.employeesReducer)
    const { search, filter, isArchive, sort } = useAppSelector((state) => state.filtersReducer)
    const { changeSearch, changeFilter, changeIsArchive, changeSort } = filtersSlice.actions
    const dispatch = useAppDispatch()

    // search functions region
    const onChangeSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeSearch(e.target.value))
        // eslint-disable-next-line
    }, [])

    const onSearch = useCallback(
        (el: IEmployee) => {
            const lowercaseField = `${el.name} ${el.role}`.toLowerCase()
            const lowercaseValue = search?.toLowerCase()

            return lowercaseField?.indexOf(lowercaseValue) > -1
        },
        [search]
    )
    // end search functions region

    // filter functions region
    const onChangeFilter = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeFilter(e.target.value as nameRolesType))
        // eslint-disable-next-line
    }, [])

    const onFilter = useCallback(
        (el: IEmployee) => {
            if (filter === 'all') return true

            return el.role === filter
        },
        [filter]
    )
    // end filter functions region

    // isArchive functions region
    const onChangeIsArchive = useCallback(() => {
        dispatch(changeIsArchive(!isArchive))
        // eslint-disable-next-line
    }, [isArchive])

    const onIsArchive = useCallback((el: IEmployee) => el.isArchive === isArchive, [isArchive])
    // end isArchive functions region

    // sort functions region
    const onChangeSort = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeSort(e.target.value as sortNameType))
        // eslint-disable-next-line
    }, [])

    const sortOptions = {
        nameAToZ: (a: IEmployee, b: IEmployee) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1
            }
            return 0
        },
        nameZToA: (a: IEmployee, b: IEmployee) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1
            }
            return 0
        },
        birthdayAToJ: (a: IEmployee, b: IEmployee) => {
            const aYear = +a.birthday.split('.')[2]
            const bYear = +b.birthday.split('.')[2]

            return aYear - bYear
        },
        birthdayJToA: (a: IEmployee, b: IEmployee) => {
            const aYear = +a.birthday.split('.')[2]
            const bYear = +b.birthday.split('.')[2]

            return bYear - aYear
        }
    }
    // end sort functions region

    const onClearFilters = useCallback(() => {
        dispatch(changeSearch(''))
        dispatch(changeFilter('all'))
        dispatch(changeIsArchive(false))
        dispatch(changeSort('nameAToZ'))
        // eslint-disable-next-line
    }, [])

    const employeesItems = useCallback(
        (
            searchFunc: (el: IEmployee) => boolean,
            onFilter: (el: IEmployee) => boolean,
            onIsArchive: (el: IEmployee) => boolean,
            sortOptions: (a: IEmployee, b: IEmployee) => number
        ) => {
            if (!employees) return []
            return employees
                .filter(searchFunc)
                .filter(onFilter)
                .filter(onIsArchive)
                .sort(sortOptions)
                .map((el) => (
                    <EmployeesItem key={String(el.id)} name={el.name} phone={el.phone} role={el.role} id={el.id} />
                ))
        },
        // eslint-disable-next-line
        []
    )

    return (
        <section className='container'>
            <div className='empl'>
                <div className='empl__search'>
                    <Input
                        label={'Search'}
                        placeholder={'Search by name or role'}
                        name={'search'}
                        type='input'
                        value={search}
                        onChangeInput={onChangeSearch}
                    />
                </div>

                <div className='empl__filters'>
                    <Input
                        type='select'
                        label={'Filter role'}
                        name='role'
                        content={rolesArray}
                        value={filter}
                        onChangeSelect={onChangeFilter}
                    />

                    <div className='empl__checkbox'>
                        <label htmlFor='archive'>Is in archive</label>
                        <input name='archive' type='checkbox' checked={isArchive} onChange={onChangeIsArchive} />
                    </div>

                    <Input
                        type='select'
                        label={'Sorting'}
                        name='Sorting'
                        content={sortValues}
                        value={sort}
                        onChangeSelect={onChangeSort}
                    />

                    <Button text={'Clear all'} onClick={onClearFilters} size='md' />
                </div>

                <div className='empl__items'>
                    {employees && employeesItems(onSearch, onFilter, onIsArchive, sortOptions[sort]).length ? (
                        employeesItems(onSearch, onFilter, onIsArchive, sortOptions[sort])
                    ) : (
                        <div className='error'>Employees not found</div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default EmployeesList
