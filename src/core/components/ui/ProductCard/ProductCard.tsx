'use client'
import Image from 'next/image';
import React, { FC, useState } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import BedImg from '@p/assets/images/bed.png';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { ProductTag } from '../ProductTag/ProductTag';

interface IProductCard {
  color: 'main' | 'secondary';
  size: 'xl' | 'xs';
}

// TODO: Вынести в пропсы хардкод

export const ProductCard: FC<IProductCard> = ({ color, size }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className={clsx(styles.productCard, styles[`productCard_color_${color}`], styles[`productCard_size_${size}`])}>
      <div className={styles.imgWrap}>
        <Image className={styles.img} src={BedImg} alt='bed' fill />
        <ButtonIcon isActive={isLiked} onClick={() => setIsLiked(!isLiked)} />
        <div className={styles.tagsWrap}>
          <ProductTag icon={true} text="-10%" type="discount" />
          <ProductTag icon={true} text="В наличии" type="availability" />
        </div>
      </div>
      <div className={styles.info}>
        <p className={styles.title}>Кровать Арина</p>
        <div className={styles.price}>
          <span className={clsx(styles.priceItem, styles.priceItemNew)}>40 990 ₽</span>
          <span className={clsx(styles.priceItem, styles.priceItemOld)}>50 990 ₽</span>
        </div>
      </div>
    </div>
  )
}
