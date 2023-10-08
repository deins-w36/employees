export type sortNameType = 'nameAToZ' | 'nameZToA' | 'birthdayAToJ' | 'birthdayJToA'
export type sortLabelsType =
    | 'By name (from a to z)'
    | 'By name (from z to a)'
    | 'By birthday (from adult to junior)'
    | 'By birthday (from junior to adult)'

export interface ISort {
    name: sortNameType
    label: sortLabelsType
}
