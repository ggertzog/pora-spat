import React, {FC, ButtonHTMLAttributes} from 'react'
import styles from './styles.module.scss';
import clsx from 'clsx';

interface IButtonCategory extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export const ButtonCategory: FC<IButtonCategory> = ({text, className, onClick, ...props}) => {
  return (
    <button className={clsx(styles.button, className)} onClick={onClick} {...props}>
        <span className={styles.text}>{text}</span>
    </button>
  )
}
