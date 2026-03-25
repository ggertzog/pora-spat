import Link from 'next/link';
import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type NavItem = {
    title: string;
    href: string;
}

type NavListProps = {
    title: string;
    items: NavItem[];
    className?: string;
}

export const NavList = ({ title, items, className }: NavListProps) => {
    return (
        <div className={clsx(styles.navList, className)}>
            <h6 className={styles.title}>{title}</h6>
            <ul className={styles.list}>
                {items.map((item, index) => (
                    <li key={index}>
                        <Link className={styles.link} href={item.href}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
