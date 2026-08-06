"use client";
//libs
import React from "react";
import Image from "next/image";
import Link from "next/link";

//styles
import styles from "./styles.module.scss";

//assets
import GRCHLogo from "@p/assets/images/grch.png";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";
import XlFooterContent from "./XlFooterContent/XlFooterContent";
import MdFooterContent from "./MdFooterContent/MdFooterContent";
import XsFooterContent from "./XsFooterContent/XsFooterContent";

//hooks
import { useMediaQuery } from "@/core/utils/hooks/useMediaQuery";

//mock data
import { catalogItems, customersItems, contactItems } from "./mock-data";

// READY: Декомпозировать файл

export const FooterContent = () => {
  const isXlLayout = useMediaQuery("(min-width: 1440px)");
  const isMdLayout = useMediaQuery("(min-width: 768px) and (max-width: 1439px)");
  if (isXlLayout) {
    return <XlFooterContent catalogItems={catalogItems} customersItems={customersItems} contactItems={contactItems} />;
  }
  if (isMdLayout) {
    return <MdFooterContent catalogItems={catalogItems} customersItems={customersItems} contactItems={contactItems} />;
  }
  return <XsFooterContent contactItems={contactItems} />;
};

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {<FooterContent />}
        <div className={styles.legal}>
          <Typography className={styles.legalText} as="span" variant="tooltip2">
            Мебельный интернет магазин
          </Typography>
          <div className={styles.legalLinks}>
            <Link href="/" className={styles.legalText}>
              Политика конфиденциальности
            </Link>
            <Link href="/" className={styles.legalText}>
              Оферта
            </Link>
          </div>
          <Link href="/" className={styles.legalText}>
            Сделано в <Image src={GRCHLogo} alt="GRCH" width={54} height={15} />
          </Link>
        </div>
      </div>
    </footer>
  );
};
