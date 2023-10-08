import { IRole } from '../config/IRole'
import { ISort } from '../config/ISort'

export const rolesArray: IRole[] = [
    {
        name: 'all',
        label: 'All roles'
    },
    {
        name: 'cook',
        label: 'Cook'
    },
    {
        name: 'driver',
        label: 'Driver'
    },
    {
        name: 'waiter',
        label: 'Waiter'
    }
]

export const sortValues: ISort[] = [
    {
        name: 'nameAToZ',
        label: 'By name (from a to z)'
    },
    {
        name: 'nameZToA',
        label: 'By name (from z to a)'
    },
    {
        name: 'birthdayAToJ',
        label: 'By birthday (from adult to junior)'
    },
    {
        name: 'birthdayJToA',
        label: 'By birthday (from junior to adult)'
    }
]
