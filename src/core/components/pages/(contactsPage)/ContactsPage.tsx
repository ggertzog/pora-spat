"use client";
//libs
import React from "react";

//styles
import styles from "./styles.module.scss";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";
import { BreadCrumbs } from "@/core/components/common/BreadCrumbs/BreadCrumbs";

//query fetchers
import { usePageInfoBySlugQueryOptions } from "@/core/api/queryFetchers/getPageInfoBySlug";

const slug = "contacts";

const ContactsPage = () => {
  const { data } = usePageInfoBySlugQueryOptions(slug);
  const { data: pageData, seo: seoData } = data || {};

  return (
    <section className={styles.contactsPage}>
      <div className={styles.container}>
        <BreadCrumbs
          crumbs={[
            { label: "Главная", href: "/" },
            { label: "Контакты", href: "/contacts" },
          ]}
        />
        <Typography className={styles.title} as="h1" variant="h1">
          {pageData?.title}
        </Typography>
        <div className={styles.btnsWrap}>
          <ButtonRounded className={styles.callButton} size="h56" text="Закать звонок" />
          <ButtonRounded className={styles.messageButton} size="h56" text="Оставить обращение" />
        </div>
        <div className={styles.content}>
          {pageData?.content?.map((item) => (
            <div className={styles.contentItem} key={item.title}>
              <Typography className={styles.subtitle} as="h4" variant="h4">
                {item.title}
              </Typography>
              <div className={styles.textWrap} dangerouslySetInnerHTML={{ __html: item.content || "" }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactsPage;
