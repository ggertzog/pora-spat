import React, {FC, LinkHTMLAttributes} from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

interface IUiLink extends LinkHTMLAttributes<HTMLAnchorElement> {
    text: string;
    target?: boolean;
}

const UiLink: FC<IUiLink> = ({text, className, href, target, ...props}) => {
  return (
    <a className={clsx(styles.link, className)} href={href} target={target ? "_blank" : undefined} {...props}>
        {text}
    </a>
  )
}

export default UiLink;