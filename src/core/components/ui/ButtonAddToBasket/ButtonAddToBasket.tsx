import React, {FC, ButtonHTMLAttributes} from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

interface IButtonAddToBasket extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

export const ButtonAddToBasket: FC<IButtonAddToBasket> = ({text, icon, className, onClick, ...props}) => {
  return (
    <button className={clsx(styles.button, className)} onClick={onClick} {...props}>
        {text && <span className={styles.text}>{text}</span>}
        {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  )
}
