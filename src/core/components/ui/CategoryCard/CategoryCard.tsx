import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import clsx from 'clsx';
import { ICategory } from '@/core/api/queryFetchers/getCategoriesQuery';

interface ICategoryCard {
    category: ICategory;
    size: 'xl' | 'sm' | 'xs';
}

export const CategoryCard = ({ category, size }: ICategoryCard) => {
    const { id, name, menu_title, slug, full_slug, image, icon, is_published, order, children } = category;
    return (
        <div className={clsx(styles.categoryCard, styles[`categoryCard_size_${size}`])}>
            {image && <Image className={styles.image} src={image} alt={name || 'alt'} width={274} height={194} />}
            <p className={styles.title}>{name}</p>
        </div>
    )
}
