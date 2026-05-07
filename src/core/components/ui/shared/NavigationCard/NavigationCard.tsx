import React from "react";
import styles from "./styles.module.scss";
import Image, { StaticImageData } from "next/image";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";
import clsx from "clsx";
import { components } from "@/core/types/__generated__/api-schema";

type NavigationCardData = Omit<components["schemas"]["PublicationResource"], "image"> & {
  image?: string | StaticImageData;
};

interface INavigationCard {
  card: NavigationCardData;
  className?: string;
}

// TODO: Поплыла кнопка "смотреть", нужно поправить

const NavigationCard = ({ card, className }: INavigationCard) => {
  const { title, image } = card;
  return (
    <div className={clsx(styles.navigationCard, className)}>
      <Image className={styles.image} src={image || ""} alt={title || ""} fill />
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <ButtonRounded className={styles.button} icon="arrowRight" size="h46" onClick={() => {}} text="Смотреть" />
      </div>
    </div>
  );
};

export default NavigationCard;
