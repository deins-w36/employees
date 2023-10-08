import React, { FC } from 'react'

import './input.scss'

interface IInputProps {
    label: string
    placeholder?: string
    name: string
    type: 'input' | 'select'
    value?: string
    onChangeSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
    content?: {
        name: string
        label: string
    }[]
    required?: boolean
}

const Input: FC<IInputProps> = (props: IInputProps) => {
    const {
        label,
        placeholder,
        name,
        type = 'input',
        value,
        onChangeInput = () => {},
        content = [],
        onChangeSelect = () => {},
        required = false
    } = props

    return (
        <div className='input'>
            <label htmlFor={name}>{label}</label>
            {type === 'input' ? (
                <input
                    name={name}
                    type='text'
                    placeholder={placeholder}
                    value={value}
                    onChange={onChangeInput}
                    required={required}
                />
            ) : (
                <select
                    required={required}
                    className='form-select'
                    id='element'
                    name='element'
                    value={value}
                    onChange={onChangeSelect}
                >
                    {content &&
                        content.map(({ name, label }) => {
                            return (
                                <option key={name} value={name}>
                                    {label}
                                </option>
                            )
                        })}
                </select>
            )}
        </div>
    )
}

export default Input
