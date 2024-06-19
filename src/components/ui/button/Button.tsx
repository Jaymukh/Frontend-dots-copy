import React from 'react';
import styles from "./Button.module.css";

export enum ButtonVariant {
    contained,
    transparent,
    bordered

}

export enum ButtonSize {
    xsmall,
    small,
    medium,
    large,
    default,
}

export enum ButtonTheme {
    primary,
    secondary,
    dark,
    muted,
    warning,
    success
}

interface ButtonProps {
    onClick?: (event: any) => void;
    variant?: ButtonVariant,
    size?: ButtonSize,
    theme?: ButtonTheme,
    classname?: string,
    style?: any,
    disabled?: boolean,
    children?: React.ReactNode,
    type?: "button" | "submit" | "reset";
}

const getSizeClass = (size: ButtonSize) => {
    let className = "";
    switch (size) {
        case ButtonSize.xsmall:
            className = `${styles.btn_xsmall}`;
            break;
        case ButtonSize.small:
            className = `${styles.btn_small}`;
            break;
        case ButtonSize.medium:
            className = `${styles.btn_medium}`;
            break;
        case ButtonSize.large:
            className = `${styles.btn_large}`;
            break;
        case ButtonSize.default:
            className = `${styles.btn_default}`;
            break;
    }
    return className;
}

const getTypeVariantClass = (theme: ButtonTheme, variant: ButtonVariant) => {
    let className = "";
    switch (theme) {
        case ButtonTheme.primary:
            className = variant === ButtonVariant.transparent ? `${styles.btn_primary_transparent}` :
                (className = variant === ButtonVariant.contained ? `${styles.btn_primary_contained}` : `${styles.btn_primary}`);
            break;
        case ButtonTheme.secondary:
            className = variant === ButtonVariant.transparent ? `${styles.btn_secondary_transparent}` :
                (className = variant === ButtonVariant.contained ? `${styles.btn_secondary_contained}` : `${styles.btn_secondary}`);
            break;
        case ButtonTheme.dark:
            className = variant === ButtonVariant.transparent ? `${styles.btn_dark_transparent}` :
                (className = variant === ButtonVariant.contained ? `${styles.btn_dark_contained}` : `${styles.btn_dark}`);
            break;
        case ButtonTheme.muted:
            className = variant === ButtonVariant.transparent ? `${styles.btn_muted_transparent}` :
                (className = variant === ButtonVariant.contained ? `${styles.btn_muted_contained}` : `${styles.btn_muted}`);
            break;
        case ButtonTheme.warning:
            className = variant === ButtonVariant.transparent ? `${styles.btn_warning_transparent}` :
                (className = variant === ButtonVariant.contained ? `${styles.btn_warning_contained}` : `${styles.btn_warning}`);
            break;
        case ButtonTheme.success:
            className = variant === ButtonVariant.transparent ? `${styles.btn_success_transparent}` :
                (className = variant === ButtonVariant.contained ? `${styles.btn_success_contained}` : `${styles.btn_success}`);
            break;
    }
    return className;

}

export const Button = ({
    onClick,
    variant = ButtonVariant.contained,
    theme = ButtonTheme.primary,
    size = ButtonSize.default,
    disabled,
    children,
    type,
    classname,
    style
}: ButtonProps) => {
    return (
        <button
            className={`${getTypeVariantClass(theme, variant)} ${getSizeClass(size)} ${classname}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
            style={style}
        >
            {children}
        </button>
    );
}
