import React from 'react'
import styles from './styles.module.scss'
import Image, { StaticImageData } from 'next/image'
import { Tag } from '@/core/components/ui/Tag/Tag'
import clsx from 'clsx';

interface IStockCard {
    background_image: string | StaticImageData;
    front_image?: string | StaticImageData;
    title: string;
    description: string;
    type: number;
    color_bg?: string;
    tags: string[];
}

export const StockCard = ({ background_image, front_image, title, description, type, color_bg, tags }: IStockCard) => {
    return (
        <div className={styles.stockCard}>
            <div className={styles.bgWrapper}>
                {type === 1 && (
                    <>
                        {background_image && (
                            <div className={styles.bgImageWrapper}>
                                <Image className={styles.img} src={background_image} alt={title} fill />
                            </div>
                        )}
                        {front_image && (
                            <div className={styles.frontImageWrapper}>
                                <Image className={styles.img} src={front_image} alt={title} fill />
                            </div>
                        )}
                    </>
                )}
                {type === 2 && (
                    <>
                        {background_image && (
                            <div className={styles.bgImageWrapper}>
                                <Image className={styles.img} src={background_image} alt={title} fill />
                            </div>
                        )}
                        <div
                            className={styles.gradientWrapper}
                            style={{
                                background: `linear-gradient(197deg, rgba(169, 178, 161, 0) 48.01%, ${color_bg || 'rgba(169, 178, 161, 0.9)'} 68.53%)`,
                            }}
                        ></div>
                    </>
                )}
            </div>
            <div className={styles.tagsWrap}>
                {tags && tags.map((tag, index) => (
                    <Tag key={index} text={tag} size='sm' />
                ))}
            </div>
            <div className={clsx(styles.contentWrap, type === 1 && styles.contentWrap_type_first, type === 2 && styles.contentWrap_type_second)}>
                <p className={styles.title}>{title}</p>
                <span className={styles.description}>{description}</span>
            </div>
        </div>
    )
}
