//libs
import React from "react";
import Link from "next/link";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";

type NavItem = {
  title: string;
  href: string;
};

type NavListProps = {
  title: string;
  items: NavItem[];
  className?: string;
};

export const NavList = ({ title, items, className }: NavListProps) => {
  return (
    <div className={clsx(styles.navList, className)}>
      <Typography className={styles.title} as="h6" variant="h6">
        {title}
      </Typography>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index}>
            <Link className={styles.link} href={item.href}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
