import styles from './ButtonElement.module.css'

const ButtonElement = ({children}) => {
  return (
    <button className={styles.button}>{children}</button>
  )
}

export default ButtonElement;