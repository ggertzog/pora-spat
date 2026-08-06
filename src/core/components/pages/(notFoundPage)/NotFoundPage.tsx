//libs
import React from "react";
import Image from "next/image";
import Link from "next/link";

//styles
import styles from "./styles.module.scss";

//assets
import img404 from "./404.png";
import Typography from "@/core/components/ui/shared/Typography/Typography";

export default function NotFoundPage() {
  return (
    <section className={styles.notFoundPage}>
      <div className={styles.imageWrap}>
        <Image className={styles.image} src={img404} fill alt="404" />
      </div>
      <div className={styles.container}>
        <Typography className={styles.title} as="h1" variant="custom">
          404
        </Typography>
        <Typography className={styles.subtitle} as="p" variant="custom">
          Страница не&nbsp;найдена
        </Typography>
        <Typography className={styles.text} as="p" variant="text1">
          Произошла ошибка. Вы&nbsp;будете перенаправлены на&nbsp;<Link className={styles.link} href='/'>главную страницу</Link>
        </Typography>
      </div>
    </section>
  );
}
