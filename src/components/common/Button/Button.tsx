import classNames from 'classnames'
import React, { FC } from 'react'

import './button.scss'

interface IBtnProps {
    text: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    size: 'sm' | 'md'
}

const Button: FC<IBtnProps> = (props: IBtnProps) => {
    const { text = '', onClick = () => {}, size = 'md' } = props

    const clases = classNames('button', {
        [`button-${size}`]: size
    })

    return (
        <div className={clases}>
            <button onClick={onClick}>{text}</button>
        </div>
    )
}

export default Button
