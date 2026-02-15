import { useLayoutEffect, useRef, useState } from 'react';
import styles from './CalendarField.module.css'
import SubscriptionIcon from '@/components/ui/SubscriptionIcon'

const InfoBlock = ({popupPos, selectDay}) => {

    const [sizeBlock, setSizeBlock] = useState({widht: 0, height: 0});

    const ref = useRef(null);

    useLayoutEffect(() => {
        if (ref.current) {
            setSizeBlock({width: ref.current.offsetWidth, height: ref.current.offsetHeight});
        }
    }, []);


    return (
        <div 
            style={{left: popupPos.x, top: popupPos.y - sizeBlock.height}} 
            ref={ref} 
            className={styles.containerInfoBlock}
        >
            <ul className={styles.eventList}>
                {selectDay.map((subscription, index) => 
                    <li className={styles.eventBlock} key={index}>
                        <div className={styles.iconBlock}>
                            <SubscriptionIcon name={subscription.name} size={30}/>
                        </div>
                        <h4>{subscription.name}</h4>
                        <div className={styles.amountBlock}>
                            {subscription.amount && <div className={styles.amount}>К оплате: <b>{subscription.amount}</b></div>}
                            {subscription.historyPayment && <div className={styles.historyPayment}>Было оплачено: <b>{subscription.historyPayment}</b></div>}
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
};

export default InfoBlock;
