import styles from './Feedback.module.css';
import { FaStar } from 'react-icons/fa';

const Feedback = ({feedback, userName}) => {

  return (
    <li className={styles.singleFeedback}>
      <h5 className={styles.userNameFeed}>{userName}</h5>
      <p className={styles.textBlock}>{feedback.comment}</p>
      <div className={styles.ratingBlock}>
        <span className={styles.rating}>
          {Array.from({length: feedback.goodRate}, (_,i) => (
            <FaStar key={i} fill='#facc15' />
          ))}
          {Array.from({length: 5 - feedback.goodRate}, (_,i) => (
            <FaStar key={i} fill='#d1d5db'/>
          ))}
        </span>
        <span className={styles.publicDate}>{feedback.createdData}</span>
      </div>
    </li>
  )
}

export default Feedback;