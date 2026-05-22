//libs
import Link from "next/link";

//styles
import styles from "./styles.module.scss";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";

type ContactItem = {
  text: string;
  href: string;
};

type ContactListProps = {
  data: ContactItem[];
};

export const ContactList = ({ data }: ContactListProps) => {
  return (
    <ul className={styles.contactList}>
      {data &&
        data.map(({ href, text }, index) => (
          <li key={index}>
            <Typography className={styles.text} href={href} as="a" variant="text3">
              {text}
            </Typography>
          </li>
        ))}
      <li className={styles.contactItem}>
        <Link className={styles.text} target="_blank" href="/feedback">
          Оставить обращение
        </Link>
      </li>
    </ul>
  );
};
