import styles from './ButtonElement.module.css'

const ButtonElement = ({children, onMouseDown, onClick, className = ''}) => {
  const newClassName = className.split(' ').map(item => styles[item]).filter(Boolean).join(' ');

  return (
    <button 
      onClick={onClick}
      onMouseDown={onMouseDown} 
      className={`${styles.button} ${newClassName}`}
    >
      {children}
    </button>
  )
}

export default ButtonElement;