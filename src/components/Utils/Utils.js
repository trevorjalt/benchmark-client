import React from 'react'
import { format as formatDate } from 'date-fns'
import './Utils.css'

export function NiceDate({ date, format='do MMMM yyyy' }) {
    return formatDate(date, format)
}

export function Button({ className, ...props }) {
    return <button className={['Button', className].join(' ')} {...props} />
}

export function Input({ className, ...props }) {
    return (
        <input className={['Input', className].join(' ')} {...props} />
    )
}

export function Required({ className, ...props }) {
    return (
        <span className={['Required', className].join(' ')} {...props}>
            &#42;
        </span>
    )
}

export function Section({ className, ...props }) {
    const classes = [
        'Section',
        className,
    ].filter(Boolean).join(' ')
    return (
        <section className={classes} {...props} />
    )
}