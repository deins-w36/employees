import { screen, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'

import EmployeesItem from './EmployeesItem'
import data from '../../employees.json'

describe('List component', () => {
    it('List renders', () => {
        const dataElems = data.map((el) => {
            return <EmployeesItem key={el.id} id={el.id} name={el.name} phone={el.phone} role={el.role} />
        })
        const DataElems = () => {
            return <div>{dataElems}</div>
        }

        render(
            <BrowserRouter>
                <DataElems />
            </BrowserRouter>
        )

        expect(screen.getByText('Илья Емельянов')).toBeInTheDocument()
    })
})
