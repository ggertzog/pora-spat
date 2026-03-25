import React from 'react';
import styles from './styles.module.scss';
import Image, { StaticImageData } from 'next/image';
import { ButtonRounded } from '@/core/components/ui/ButtonRounded/ButtonRounded';
import clsx from 'clsx';

interface INavigationCard {
  title: string;
  image: string | StaticImageData;
  type: 'big' | 'small';
}

export const NavigationCard = ({ title, image, type }: INavigationCard) => {
  return (
    <div className={clsx(styles.navigationCard, styles[`navigationCard_type_${type}`])}>
      <Image className={styles.image} src={image} alt={title} fill />
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <ButtonRounded className={styles.button} icon="arrowRight" size="h46" onClick={() => { }} text="Смотреть" />
      </div>
    </div>
  )
}
