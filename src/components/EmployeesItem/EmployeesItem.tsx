import React, { FC } from 'react'

import './employeesItem.scss'
import { Link } from 'react-router-dom'

interface IEmployeesItem {
    name: string
    role: string
    phone: string
    id: string | number
}

const EmployeesItem: FC<IEmployeesItem> = (props: IEmployeesItem) => {
    const { name, role, phone, id } = props

    const nameSplited = name.split(' ')
    const avatarText = nameSplited.length === 2 ? nameSplited[0][0] + nameSplited[1][0] : nameSplited[0][0]

    return (
        <Link to={`/employee/${String(id)}`} className='emploeey__link'>
            <div className='emploeey'>
                <div className='emploeey__avatar'>{avatarText}</div>
                <div className='emploeey__text'>
                    <div className='emploeey__name'>{name}</div>
                    <div className='emploeey__role'>{role}</div>
                    <div className='emploeey__phone'>{phone}</div>
                </div>
            </div>
        </Link>
    )
}

export default EmployeesItem
