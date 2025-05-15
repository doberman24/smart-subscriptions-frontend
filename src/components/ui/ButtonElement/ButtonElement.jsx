import styles from './ButtonElement.module.css'

const ButtonElement = ({children, onMouseDown, onClick, className = '', type = ''}) => {
  const newClassName = className.split(' ').map(item => styles[item]).filter(Boolean).join(' ');

  return (
    <button 
      onClick={onClick}
      onMouseDown={onMouseDown} 
      className={`${styles.button} ${newClassName}`}
      type={type}
    >
      {children}
    </button>
  )
}

export default ButtonElement;