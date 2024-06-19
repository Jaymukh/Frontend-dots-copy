import React from 'react';
import styles from "./Card.module.css";

export enum CardVariant {
    contained,
    transparent,
    bordered

}

export enum CardSize {
    small,
    medium,
    default,
}

interface ButtonProps {
    onClick?: () => void;
    variant?: CardVariant,
    size?: CardSize,
    // theme?: ButtonTheme,
    classname?: string,
    children?: React.ReactNode,
}

const getSizeClass = (size: CardSize) => {
    let className = "";
    switch (size) {
        case CardSize.small:
            className = `${styles.card_small}`;
            break;
        case CardSize.medium:
            className = `${styles.card_medium}`;
            break;
        case CardSize.default:
            className = `${styles.card_default}`;
            break;
    }
    return className;
}
const getVariantClass = (variant: CardVariant) => {
    let className = "";
    switch (variant) {
        case CardVariant.bordered:
            className = `${styles.card_bordered}`;
            break;
        case CardVariant.contained:
            className = `${styles.card_contained}`;
            break;
        case CardVariant.transparent:
            className = `${styles.card_transparent}`;
            break;
    }
    return className;
}

export const Card = ({
    onClick,
    variant = CardVariant.contained,
    size = CardSize.default,
    children,
    classname
}: ButtonProps) => {
    return (
        <div
            className={`${getVariantClass(variant)} ${getSizeClass(size)} ${classname}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
