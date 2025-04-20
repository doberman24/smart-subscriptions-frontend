import styles from './ButtonElement.module.css'

const ButtonElement = ({children, onMouseDown, className = ''}) => {
  const newClassName = className.split(' ').map(item => styles[item]).filter(Boolean).join(' ');

  return (
    <button onMouseDown={onMouseDown} className={`${styles.button} ${newClassName}`}>{children}</button>
  )
}

export default ButtonElement;