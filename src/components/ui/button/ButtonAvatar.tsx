import styles from "./Button.module.css";

interface ButtonAvatarProps {
    onClick?: (event: any) => void;
    image?: string;
    initial?: string;
    bgColor?: any;
    classname?: string;
    disabled?: boolean;
}

export const ButtonAvatar = ({ image, initial, onClick,  bgColor, classname, disabled }: ButtonAvatarProps) => {
    return (
        <button className={`rounded-circle border-0 padding-0 ${styles.btn_avatar} ${classname}`} style={{backgroundColor: bgColor}} onClick={onClick} disabled={disabled}>
            {image ? (
                <img src={image} alt="Avatar"  className="img-fluid rounded-circle w-100 h-100" />
            ) : (
                <>{initial}</>
            )}
        </button>
    )
}
