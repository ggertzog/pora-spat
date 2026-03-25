import Link from 'next/link'
import styles from './styles.module.scss'

type ContactItem = {
    text: string;
    href: string;
}

type ContactListProps = {
    data: ContactItem[];
}

export const ContactList = ({ data }: ContactListProps) => {
    return (
        <ul className={styles.contactList}>
            {data && data.map(({ href, text }, index) => (
                <li key={index}>
                    <a className={styles.text} href={href}>
                        {text}
                    </a>
                </li>
            ))}
            <li className={styles.contactItem}>
                <Link className={styles.text} target="_blank" href="/feedback">
                    Оставить обращение
                </Link>
            </li>
        </ul>
    )
}
