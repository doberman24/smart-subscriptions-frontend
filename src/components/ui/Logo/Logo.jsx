import React from 'react'
import styles from './Logo.module.css'
import check from '@/assets/icons/check.png'

const Logo = () => {
  return (
    <div className={`${styles.mainLogo} no-select`}>
      <img src={check} height="35px" alt="check" />
      <span className={styles.initial}>S</span>
      <span className={`${styles.logoName} no-select`}>mart<br />ubscriptions</span>
    </div>
  )
}

export default Logo