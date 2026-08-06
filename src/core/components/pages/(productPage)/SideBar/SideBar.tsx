//libs
import React from "react";

//styles
import styles from "./styles.module.scss";

//assets
import HeartIcon from "@p/assets/icons/heart.svg";

//types
import { IProductDetailed } from "@/core/types/newapi";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";
import ButtonIcon from "@/core/components/ui/shared/ButtonIcon/ButtonIcon";
import { SizePicker } from "../SizePicker/SizePicker";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { DeliveryInfo } from "../DeliveryInfo/DeliveryInfo";

interface SideBarProps {
  productData: IProductDetailed;
}

export const SideBar = ({ productData }: SideBarProps) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.preview}>
        <Typography as="h3" variant="h3" className={styles.sidebarTitle}>
          {productData?.name}
        </Typography>
        <Typography as="h1" variant="text3" className={styles.sidebarSubtitle}>
          {productData?.sub_name}
        </Typography>
        <Typography as="p" variant="tooltip" className={styles.article}>
          Артикул:{productData?.article}
        </Typography>
        <div className={styles.discountWrap}>
          <Typography as="p" variant="custom" className={styles.oldPrice}>
            {productData?.cost?.old_price} ₽
          </Typography>
          <Typography as="p" variant="custom" className={styles.discount}>
            -{productData?.cost?.discount}%
          </Typography>
        </div>
        <Typography as="p" variant="h3" className={styles.price}>
          {productData?.cost?.price} ₽
        </Typography>
        <div className={styles.buttonsWrap}>
          <ButtonRounded text="В корзину" size="h43" className={styles.addToCartButton} />
          <ButtonIcon className={styles.buttonIcon}>
            <HeartIcon />
          </ButtonIcon>
        </div>
        <Typography as="p" variant="text4" className={styles.daysForDelivery}>
          {productData?.days_for_delivery}
        </Typography>
        <div className={styles.pickersWrap}>
          <SizePicker variants={productData?.variants} className={styles.sizePicker} />
          <ColorPicker variants={productData?.variants} />
        </div>
      </div>
      <DeliveryInfo className={styles.deliveryInfo} />
    </div>
  );
};
