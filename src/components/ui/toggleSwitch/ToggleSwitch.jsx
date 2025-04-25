import styles from './ToggleSwitch.module.css'

const ToggleSwitch = ({label, onChange, checked}) => {
    return (
        <label className={styles.mainLabel}>
            {label}
        <input 
            type="checkbox" 
            className={styles.checkboxInput} 
            onChange={onChange}
            checked={checked}
        />
        <span className={styles.checkbox}></span>
        </label>
    )
};

export default ToggleSwitch;