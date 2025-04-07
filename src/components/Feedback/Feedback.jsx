import styles from './Feedback.module.css';
import fStar from '@/assets/icons/full-star.svg'
import eStar from '@/assets/icons/empty-star.svg'

const Feedback = ({feedback, userName}) => {

  return (
    <li className={styles.singleFeedback}>
      <h5 className={styles.userNameFeed}>{userName}</h5>
      <p className={styles.textBlock}>{feedback.comment}</p>
      <div className={styles.ratingBlock}>
        <span className={styles.rating}>
          {Array.from({length: feedback.goodRate}, (_,i) => (
            <img key={i} src={fStar} height='25px' alt="star" />  
          ))}
          {Array.from({length: feedback.badRate}, (_,i) => (
            <img key={i} src={eStar} height='25px' alt="star" />  
          ))}
        </span>
        <span className={styles.publicDate}>{feedback.createdData}</span>
      </div>
    </li>
  )
}

export default Feedback;