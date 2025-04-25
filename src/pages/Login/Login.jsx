import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './Login.module.css'

const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className={styles.loginPage}>
      <h1 className={styles.login}>Добро пожаловать!</h1>
      <form className={styles.mainForm} onSubmit={handleSubmit}>
        <label className={styles.emailLabel}>
          Логин/Email
          <input type="text" placeholder='Введите логин или email'/>
        </label>
        <label className={styles.passLabel}>
          Пароль
          <input type="password" placeholder='Введите пароль'/>
        </label>
        <label className={styles.button}>
          <ButtonElement className={'addButton'}>Войти</ButtonElement>
        </label>
      </form>
    </div>
  )
}

export default Login;