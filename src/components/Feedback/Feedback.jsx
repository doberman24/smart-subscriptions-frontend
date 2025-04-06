import styles from './Feedback.module.css';
import fStar from '@/assets/icons/full-star.svg'
import eStar from '@/assets/icons/empty-star.svg'

const Feedback = () => {
  return (
    <li className={styles.singleFeedback}>
      <h5 className={styles.userNameFeed}>Юзер 1</h5>
      <p className={styles.textBlock}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores vero ab amet doloribus fugit beatae ad, eveniet veritatis reprehenderit, doloremque eum necessitatibus sed magnam, excepturi aut distinctio pariatur illo architecto.</p>
      <div className={styles.ratingBlock}>
        <span className={styles.rating}>
          <img src={fStar} height='25px' alt="star" />
          <img src={fStar} height='25px' alt="star" />
          <img src={fStar} height='25px' alt="star" />
          <img src={eStar} height='25px' alt="star" />
          <img src={eStar} height='25px' alt="star" />
        </span>
        <span className={styles.publicDate}>Дата: 12.05.2024</span>
      </div>
    </li>
  )
}

export default Feedback;