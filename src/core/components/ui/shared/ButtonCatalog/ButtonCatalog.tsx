import React, { FC, ButtonHTMLAttributes, JSX } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import BedIcon from "@p/assets/icons/bed.svg";
import MattressIcon from "@p/assets/icons/mattress.svg";
import SleepIcon from "@p/assets/icons/sleep.svg";
import ChestIcon from "@p/assets/icons/chest.svg";
import WardrobeIcon from "@p/assets/icons/wardrobe.svg";
import KitchenIcon from "@p/assets/icons/kitchen.svg";
import IkeaIcon from "@p/assets/icons/ikea.svg";
import KitIcon from "@p/assets/icons/kit.svg";
import RoomIcon from "@p/assets/icons/room.svg";
import NewIcon from "@p/assets/icons/new.svg";
import SaleIcon from "@p/assets/icons/sale.svg";
import ArrowRightIcon from "@p/assets/icons/chevron-right.svg";

type TIcon = "bed" | "mattress" | "sleep" | "chest" | "wardrobe" | "kitchen" | "ikea" | "kit" | "room" | "new" | "sale";


// TODO: убрать этот вариант свг рендера
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons: Record<TIcon, (props?: any) => JSX.Element> = {
  bed: ({ ...props }) => <BedIcon {...props} />,
  mattress: ({ ...props }) => <MattressIcon {...props} />,
  sleep: ({ ...props }) => <SleepIcon {...props} />,
  chest: ({ ...props }) => <ChestIcon {...props} />,
  wardrobe: ({ ...props }) => <WardrobeIcon {...props} />,
  kitchen: ({ ...props }) => <KitchenIcon {...props} />,
  ikea: ({ ...props }) => <IkeaIcon {...props} />,
  kit: ({ ...props }) => <KitIcon {...props} />,
  room: ({ ...props }) => <RoomIcon {...props} />,
  new: ({ ...props }) => <NewIcon {...props} />,
  sale: ({ ...props }) => <SaleIcon {...props} />,
};

interface IButtonCatalog extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: TIcon;
  text: string;
}

const ButtonCatalog: FC<IButtonCatalog> = ({ icon, text, className, ...props }) => {
  const Icon = icons[icon];
  return (
    <button className={clsx(styles.button, className)} {...props}>
      <div className={styles.container}>
        <Icon className={styles.icon} />
        <span className={styles.text}>{text}</span>
      </div>
      <ArrowRightIcon className={styles.arrow} />
    </button>
  );
};

export default ButtonCatalog;