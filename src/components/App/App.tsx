import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '../Header/Header'
import EmployeesList from '../EmployeesList/EmployeesList'
import FormForEmployee from '../FormForEmployee/FormForEmployee'

import './app.scss'

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<EmployeesList />} />
                <Route path='/add-employee' element={<FormForEmployee />} />
                <Route path='/employee/:employeeId' element={<FormForEmployee />} />
            </Routes>
        </Router>
    )
}

export default App
