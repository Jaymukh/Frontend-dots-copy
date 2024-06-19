import React from 'react';
import styles from "./Input.module.css";

interface InputProps {
    type?: string;
    placeholder: string;
    value?: any;
    name?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    disabled?: boolean;
    maxlength?: number;
    pattern?: any;
    classname?: string;
    onBlur?: any;
    ref?: any;
}

export const Input = ({ type, placeholder, value, name, onChange, disabled, maxlength, pattern, classname }: InputProps) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            disabled={disabled}
            maxLength={maxlength}
            pattern={pattern}
            className={`${styles.input} ${classname} w-100`}
        >

        </input>
    )
}