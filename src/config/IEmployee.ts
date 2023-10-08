import { nameRolesType } from './IRole'

export interface IEmployee {
    id: number | string
    name: string
    role: nameRolesType
    phone: string
    birthday: string
    isArchive: boolean
}
