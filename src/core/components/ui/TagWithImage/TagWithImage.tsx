import React, { FC } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import clsx from 'clsx';
import { ITag } from '@/core/api/queryFetchers/getTagsQuery';

interface ITagWithImage {
  card: ITag;
  size: 'xl' | 'xs';
}

export const TagWithImage: FC<ITagWithImage> = ({ card, size }: ITagWithImage) => {
  const { title, image_url, link } = card;
  return (
    <div className={clsx(styles.tagWithImage, styles[`tagWithImage_size_${size}`])}>
      <p className={styles.text}>{title}</p>
      <div className={styles.imageWrap}>
        {image_url && (<Image className={styles.image} src={image_url} alt='tag' fill />)}
      </div>
    </div>
  )
}
