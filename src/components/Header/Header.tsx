import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

import './header.scss'

const Header: FC = () => {
    const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
        return {
            color: isActive ? '#fbec52' : '#fff'
        }
    }
    return (
        <header className='header'>
            <div className='header__title'>EMPLOYEES</div>
            <div className='header__nav'>
                <NavLink style={navLinkStyles} to='/'>
                    <div className='header__nav__item'>All employees</div>
                </NavLink>

                <span>/</span>
                <NavLink style={navLinkStyles} to='/add-employee'>
                    <div className='header__nav__item'>Add new employee</div>
                </NavLink>
            </div>
        </header>
    )
}

export default Header
