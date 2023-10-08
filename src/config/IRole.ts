export type nameRolesType = 'all' | 'driver' | 'waiter' | 'cook'
export type labelsRolesType = 'All roles' | 'Driver' | 'Waiter' | 'Cook'

export interface IRole {
    name: nameRolesType
    label: labelsRolesType
}
