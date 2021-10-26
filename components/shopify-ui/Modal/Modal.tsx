import { PropsWithChildren, useEffect } from 'react'
import styles from './styles.module.scss'

export default function Modal({ children }: PropsWithChildren<any>) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <div className={styles['modal-container']}>
      <div className={styles['modal-content']}>{children}</div>
    </div>
  )
}
