import styles from "./Switch.module.css";

interface SwitchProps {
    isChecked: boolean;
    toggleSwitch: (event?: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    disabled?: boolean;
}

const Switch = ({ isChecked, toggleSwitch, name, disabled }: SwitchProps) => {

    return (
        <label className={`${styles.switch}`}>
            <input name={name} type="checkbox" checked={isChecked} onChange={(event) => toggleSwitch(event)} disabled={disabled} />
            <span className={`${styles.slider} round`}></span>
        </label>
    )
}

export default Switch;