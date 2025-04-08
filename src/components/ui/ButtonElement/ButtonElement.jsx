import styles from './ButtonElement.module.css'

const ButtonElement = ({children, className = ''}) => {
  const newClassName = className.split(' ').map(item => styles[item]).filter(Boolean).join(' ');

  return (
    <button className={`${styles.button} ${newClassName}`}>{children}</button>
  )
}

export default ButtonElement;