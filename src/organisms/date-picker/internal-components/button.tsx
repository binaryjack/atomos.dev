import React from 'react'

interface ButtonProps {
    id?: string
    title?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    className?: string
    children: React.ReactNode
}

/**
 * Simple button component for DatePicker_v3.
 * Replaces the complex Button component from the design system.
 */
export const Button: React.FC<ButtonProps> = ({
    id,
    title,
    onClick,
    disabled,
    className = '',
    children
}) => {
    return (
        <button
            id={id}
            title={title}
            onClick={onClick}
            disabled={disabled}
            className={`dp-button ${className}`}
            type="button"
        >
            {children}
        </button>
    )
}
