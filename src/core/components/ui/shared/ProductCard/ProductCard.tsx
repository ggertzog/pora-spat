"use client";

//libs
import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

//styles
import styles from "./styles.module.scss";

//assets
import BedImg from "@p/assets/images/bed.png";
import ButtonIcon from "@/core/components/ui/shared/ButtonIcon/ButtonIcon";

//components
import ProductTag from "@/core/components/ui/shared/ProductTag/ProductTag";

//types
import { IHitSale } from "@/core/api/queryFetchers/getHitSalesQuery";

interface IProductCard {
  bgColor: "main" | "secondary";
  size: "xl" | "xs";
  card: IHitSale;
}

const ProductCard = ({ bgColor, size, card }: IProductCard) => {
  const [isLiked, setIsLiked] = useState(false);
  const { name, sub_name, image, slug, cost, gallery } = card;

  // TODO: Сделать галлерею изображений

  return (
    <div
      className={clsx(styles.productCard, styles[`productCard_color_${bgColor}`], styles[`productCard_size_${size}`])}
    >
      <Link href={`/products/${slug}`}>
        <div className={styles.imgWrap}>
          {image && <Image className={styles.img} src={image} alt={name || "фотография товара"} fill />}
          <ButtonIcon isActive={isLiked} onClick={() => setIsLiked(!isLiked)} />
          <div className={styles.tagsWrap}>
            {cost?.discount && <ProductTag icon={true} text={`-${cost.discount}%`} type="discount" />}
            <ProductTag icon={true} text="В наличии" type="availability" />
          </div>
        </div>
        <div className={styles.info}>
          <p className={styles.title}>{sub_name}</p>
          <div className={styles.price}>
            <span className={clsx(styles.priceItem, styles.priceItemNew)}>{`${cost?.price} ₽`}</span>
            {cost?.old_price && (
              <span className={clsx(styles.priceItem, styles.priceItemOld)}>{`${cost?.old_price} ₽`}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
