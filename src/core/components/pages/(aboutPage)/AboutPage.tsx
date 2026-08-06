"use client";

//libs
import React from "react";
import Image from "next/image";

//styles
import styles from "./styles.module.scss";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";
import { BreadCrumbs } from "@/core/components/common/BreadCrumbs/BreadCrumbs";

//query fetchers
import { usePageInfoBySlugQueryOptions } from "@/core/api/queryFetchers/getPageInfoBySlug";

//assets
import smallImage from "@p/assets/images/aboutPage/small-image.png";
import backImage from "@p/assets/images/aboutPage/background.png";

const slug = "about";

const AboutPage = () => {
  const { data } = usePageInfoBySlugQueryOptions(slug);
  const { data: pageData, seo: seoData } = data || {};

  const table = pageData?.content?.filter((item) => item.type === "table");

  return (
    <section className={styles.aboutPage}>
      <div className={styles.backgroundWrap}>
        <Image className={styles.image} src={backImage} alt="Фон" />
      </div>
      <div className={styles.container}>
        <BreadCrumbs
          crumbs={[
            { label: "Главная", href: "/" },
            { label: "О нас", href: "/about" },
          ]}
        />
        <Typography className={styles.title} as="h1" variant="h1">
          {pageData?.title}
        </Typography>
        <div className={styles.descriptionWrap} dangerouslySetInnerHTML={{ __html: pageData?.description || "" }}></div>

        <div className={styles.imageWrap}>
          <div className={styles.largeImageWrap}>
            <Image className={styles.image} src={pageData?.image_large || ""} alt="image" fill />
          </div>
          <div className={styles.smallImageWrap}>
            <Image className={styles.image} src={pageData?.image_small || smallImage} alt="image" fill />
          </div>
        </div>

        {table && (
          <div className={styles.tablesWrap}>
            {table.map((item) => (
              <div key={item.title} className={styles.tableItem}>
                <div className={styles.tableContent}>
                  <Typography className={styles.chapter} as="p" variant="text4">
                    {item.title?.toLowerCase().includes("цель") ? "Цель" : "Подход"}
                  </Typography>
                  <div className={styles.contentBox}>
                    <Typography className={styles.subtitle} as="h2" variant="h2">
                      {item.title}
                    </Typography>
                    <div className={styles.textWrap} dangerouslySetInnerHTML={{ __html: item.content || "" }}></div>
                  </div>
                </div>
                {item.image_large && item.image_small && (
                  <div className={styles.imageContainer}>
                    <div className={styles.tableSmallImageWrap}>
                      <Image className={styles.image} src={item.image_small || ""} alt="Мальчик" fill />
                    </div>
                    <div className={styles.tableLargeImageWrap}>
                      <Image className={styles.image} src={item.image_large || ""} alt="Мальчик" fill />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutPage;
