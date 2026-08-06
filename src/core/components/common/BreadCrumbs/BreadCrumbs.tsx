//libs
import React, { Fragment } from "react";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";
import Typography from "@/core/components/ui/shared/Typography/Typography";
import Link from "next/link";

interface BreadCrumbsProps {
  className?: string;
  crumbs?: {
    label: string;
    href: string;
  }[];
}

export const BreadCrumbs = ({ crumbs, className }: BreadCrumbsProps) => {
  return (
    <nav className={clsx(styles.breadCrumbs, className)}>
      <div className={styles.container}>
        {crumbs?.map((crumb, index, arr) => {
          const isLast = index === arr.length - 1;

          return (
            <span key={`${crumb.href}-${crumb.label}`}>
              {!isLast ? (
                <>
                  <Link href={crumb.href}>{crumb.label}</Link>
                  <Typography as="span" variant="tooltip2" className={styles.separator}>
                    /
                  </Typography>
                </>
              ) : (
                <Link href={crumb.href}>{crumb.label}</Link>
              )}
            </span>
          );
        })}
      </div>
    </nav>
  );
};
