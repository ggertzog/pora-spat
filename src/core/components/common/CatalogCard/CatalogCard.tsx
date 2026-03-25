'use client';

import React, { useCallback, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { ProductTag } from '../../ui/ProductTag/ProductTag';
import { ButtonIcon } from '../../ui/ButtonIcon/ButtonIcon';
import { ButtonRounded } from '../../ui/ButtonRounded/ButtonRounded';

interface ICatalogCard {
    title: string;
    size: 'xxl' | 'xl' | 'md' | 'sm' | 'xs';
    images: string[] | StaticImageData[];
    discount?: number;
    price?: number;
}

export const CatalogCard = ({ images, title, size, discount }: ICatalogCard) => {
    const [isLiked, setIsLiked] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const maxImgCount = 3;

    function handleLike() {
        setIsLiked(prev => !prev);
    }

    const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, currentTarget } = event;
        const { left, width } = currentTarget.getBoundingClientRect();
        
        const count = images.length <= maxImgCount ? images.length : maxImgCount

        const sectionWidth = width / count
        const offsetX = clientX - left
        const imgIndex = Math.floor(offsetX / sectionWidth)
  
        setCurrentImageIndex(imgIndex)
    }, [images.length]);

    const handleMouseLeave = useCallback(() => {
        setCurrentImageIndex(0);
    }, [])

    console.log(Array.from({ length: images.length <= maxImgCount ? images.length : maxImgCount }));
    

    return (
        <div className={clsx(styles.catalogCard, styles[`catalogCard_size_${size}`])}>
            <div className={styles.sliderWrap} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                {discount && <ProductTag icon={true} text={`-${discount}%`} type="discount" />}
                <ButtonIcon className={styles.likeButton} isActive={isLiked} onClick={handleLike} />
                {images && images.map((image, index) => (
                    <Image className={clsx(styles.img, index === currentImageIndex && styles.img_visible)} key={index} src={image} alt={title} fill />
                ))}
            </div>
            <div className={styles.pagination}>
            {Array.from({ length: images.length <= maxImgCount ? images.length : maxImgCount }).map((_, index) => (
                <div key={index} className={clsx(styles.paginationItem, index === currentImageIndex && styles.paginationItem_active)} />
            ))}
            </div>
            <div className={styles.infoWrap}>
                <div className={styles.descWrap}>
                    <div className={styles.priceWrap}>
                        {discount && <span className={clsx(styles.price, styles.priceNew)}>40 990 ₽</span>}
                        <span className={clsx(styles.price, discount && styles.priceOld)}>50 990 ₽</span>
                    </div>
                    <p className={styles.title}>{title}</p>
                </div>
                <div className={styles.buttonWrap}>
                    <div className={styles.specifications}>
                        <ul className={styles.specificationsList}>
                            <li className={styles.specificationsItem}>
                                <p>ш</p>
                                <span>105</span>
                            </li>
                            <li className={styles.specificationsItem}>
                                <p>д</p>
                                <span>202</span>
                            </li>
                            <li className={styles.specificationsItem}>
                                <p>в</p>
                                <span>109</span>
                            </li>
                        </ul>
                        <div className={styles.dimensions}>
                            <p>Спальное место</p>
                            <span>(140x200 см)</span>
                        </div>
                    </div>
                    <ButtonRounded icon="truck" size="h48" onClick={() => setIsLiked(!isLiked)} text="Доставим за 7 дней" />
                </div>
            </div>
        </div>
    )
}
