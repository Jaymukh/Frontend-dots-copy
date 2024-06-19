import styles from "./Typography.module.css";

export enum BodyType {
    p1, /* 1rem (16px) */
    p2, /* 0.875rem (14px) */
    p3, /* 0.75rem (12px) */
    p4, /* 0.625rem (10px) */
}

export enum BodyColor {
    primary,   /* rgba(16, 128, 65, 1) - green */
    secondary, /* rgba(73, 73, 73, 1) - dark grey */
    dark,      /* rgba(0, 0, 0, 1) - black */
    muted,      /* rgba(0, 0, 0, 0.6) - light black */
    warning,  /* warning-0*/
    white,
    purple
}

interface BodyProps {
    type: BodyType;
    color: BodyColor;
    children?: React.ReactNode;
    classname?: string;
    style?: any;
    onClick?: any;
}

const getColor = (color: BodyColor) => {
    let className = "";
    switch (color) {
        case BodyColor.primary:
            className = `${styles.primary}`;
            break;
        case BodyColor.secondary:
            className = `${styles.secondary}`;
            break;
        case BodyColor.dark:
            className = `${styles.dark}`;
            break;
        case BodyColor.muted:
            className = `${styles.muted}`;
            break;
        case BodyColor.warning:
            className = `${styles.warning}`;
            break;
        case BodyColor.purple:
            className = `${styles.purple}`;
            break;
        case BodyColor.white:
            className = `${styles.white}`;
            break;
    }
    return className;
}

const getType = (type: BodyType) => {
    let className = "";
    switch (type) {
        case BodyType.p1:
            className = `${styles.p1}`;
            break;
        case BodyType.p2:
            className = `${styles.p2}`;
            break;
        case BodyType.p3:
            className = `${styles.p3}`;
            break;
        case BodyType.p4:
            className = `${styles.p4}`;
            break;
    }
    return className;
}

const getCursorStyle = (onClick?: any) => {
    return onClick ? styles.cursor_pointer : '';
}

const Body = ({ type, color, children, classname, style, onClick }: BodyProps) => {
    return (
        <p className={`${getColor(color)} ${getType(type)} ${getCursorStyle(onClick)} ${classname} m-0`} style={style} onClick={onClick} >{children}</p>
    )
}

export default Body;