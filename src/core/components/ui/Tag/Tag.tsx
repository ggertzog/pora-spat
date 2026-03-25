import React, {FC} from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

interface ITag {
    text: string;
    size: 'xl' | 'sm';
}

export const Tag: FC<ITag> = ({text, size}) => {
  return (
    <div className={clsx(styles.tag, styles[`tag_size_${size}`])}>
        <span className={styles.text}>
            {text}
        </span>
    </div>
  )
}
