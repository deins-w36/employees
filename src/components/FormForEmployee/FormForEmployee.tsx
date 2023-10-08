import React, { useCallback, useState, FC, useMemo } from 'react'

import './formForEmployee.scss'
import Input from '../common/Input/Input'
import { rolesArray } from '../../constans/const'
import { nameRolesType } from '../../config/IRole'
import Button from '../common/Button/Button'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { employeesSlice } from '../../store/reducers/employeesSlice'
import { IEmployee } from '../../config/IEmployee'
import { uid } from 'uid'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames'

export const convertPhone = (phone: string) => {
    return phone
        .replaceAll('(', '')
        .replaceAll(')', '')
        .replaceAll('-', '')
        .replaceAll('+', '')
        .replaceAll(' ', '')
        .substring(1, phone.length)
}

const FormForEmployee: FC = () => {
    const { employeeId } = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const employeeEdit = useAppSelector((state) => {
        if (!employeeId) return
        return state.employeesReducer.employees.find((el) => String(el.id) === employeeId)
    })
    const { addNewEmployee, editEmployee } = employeesSlice.actions

    const [name, setName] = useState(employeeEdit ? employeeEdit.name : '')
    const [phone, setPhone] = useState(employeeEdit ? convertPhone(employeeEdit.phone) : '')
    const [birthday, setBirthday] = useState(employeeEdit ? employeeEdit.birthday : '')
    const [role, setRole] = useState<nameRolesType>(employeeEdit ? employeeEdit.role : 'cook')
    const [isArchive, setIsArchive] = useState(employeeEdit ? employeeEdit.isArchive : false)
    const [infoText, setInfoText] = useState('')

    //change functions
    const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value.trim())
        setInfoText('')
    }, [])

    const onChangePhone = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const reg = /^[0-9]*$/

        if ((!reg.test(value) && value !== '') || value.length >= 11) return

        setPhone(value.trim())
        setInfoText('')
    }, [])

    const onChangeBitrhday = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const reg = /^[0-9.]*$/

        if ((!reg.test(value) && value !== '') || value.length >= 11) return

        setBirthday(e.target.value.trim())
        setInfoText('')
    }, [])

    const onChangeRole = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(e.target.value as nameRolesType)
        setInfoText('')
    }, [])
    //end change functions

    //form functions
    const handleSubmit = useCallback(() => {
        const newObj: IEmployee = {
            id: employeeEdit ? employeeEdit.id : uid(),
            name,
            phone: `+7 (${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 10)}`,
            birthday,
            role,
            isArchive
        }

        if (employeeEdit) {
            dispatch(editEmployee(newObj))
            navigate('/')
        } else {
            dispatch(addNewEmployee(newObj))
        }

        handleClearForm()
        setInfoText('Success')
        // eslint-disable-next-line
    }, [name, phone, birthday, role, isArchive])

    const handleClearForm = useCallback(() => {
        setName('')
        setPhone('')
        setBirthday('')
        setIsArchive(false)
        setRole('cook')
        setInfoText('')
    }, [])
    //end form functions

    const validate = useMemo(() => {
        if (name.length < 3) return 'Length name must be more 3'
        if (phone.length !== 10) return 'Phone must be enter by special mask'
        if (birthday.length !== 10) return 'Length birthday must = 10'

        const birthdayArray = birthday.split('.')
        if (
            birthdayArray.length !== 3 &&
            !(birthdayArray[0].length === 2 && birthdayArray[1].length === 2 && birthdayArray[2].length === 4)
        ) {
            return 'Birthday must be enter by special mask'
        }

        if (!role) return 'Role is required field'

        return 'Success'
    }, [name, phone, birthday, role])

    return (
        <section className='container'>
            <div className='form-empl'>
                <div className='form-empl__title'>{employeeEdit ? 'Edit employee' : 'Add new employee'}</div>
                <div className='form-empl__form'>
                    <Input
                        type='input'
                        label='Name'
                        name='Name'
                        placeholder='Enter name'
                        value={name}
                        onChangeInput={onChangeName}
                        required
                    />
                    <Input
                        type='input'
                        label='Phone'
                        name='Phone'
                        placeholder='Enter phone with out 7 (9525563681)'
                        value={phone}
                        onChangeInput={onChangePhone}
                        required
                    />
                    <Input
                        type='input'
                        label='Birthday'
                        name='Birthday'
                        placeholder='Enter birthday (23.05.2001)'
                        value={birthday}
                        onChangeInput={onChangeBitrhday}
                        required
                    />
                    <Input
                        type='select'
                        label='Role'
                        name='Role'
                        content={rolesArray.filter((el) => el.name !== 'all')}
                        value={role}
                        onChangeSelect={onChangeRole}
                        required
                    />

                    <div className='form-empl__checkbox'>
                        <label htmlFor='archive'>Is in archive</label>
                        <input
                            name='archive'
                            type='checkbox'
                            checked={isArchive}
                            onChange={() => setIsArchive(!isArchive)}
                        />
                    </div>
                </div>
                <Button
                    text={employeeEdit ? 'Edit' : 'Add'}
                    size='md'
                    onClick={() => {
                        setInfoText(validate)

                        if (validate !== 'Success') return

                        handleSubmit()
                    }}
                />
                <div className={classNames('form-empl__info', infoText === 'Success' && 'success')}>
                    {infoText && infoText}
                </div>
            </div>
        </section>
    )
}

export default FormForEmployee
