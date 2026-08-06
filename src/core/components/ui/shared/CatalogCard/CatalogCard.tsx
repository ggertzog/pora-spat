"use client";

//libs
import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

//styles
import styles from "./styles.module.scss";

//types
import { IProductShort } from "@/core/types/newapi";

//assets
import HeartIcon from "@p/assets/icons/heart.svg";
import TruckIcon from "@p/assets/icons/truck.svg";
import BedImage from "@p/assets/images/bed.png";

//components
import ProductTag from "@/core/components/ui/shared/ProductTag/ProductTag";
import ButtonIcon from "@/core/components/ui/shared/ButtonIcon/ButtonIcon";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";
import { SpecificationsBlock } from "./SpecificationsBlock/SpecificationsBlock";
import Typography from "@/core/components/ui/shared/Typography/Typography";

type TSize = "xxl" | "xl" | "md" | "sm" | "xs";

interface ICatalogCard {
  card: IProductShort;
  size?: TSize;
  discount?: number;
  price?: number;
}

const CatalogCard = ({ card, size = "xxl", discount }: ICatalogCard) => {
  const { name, sub_name, slug, image, cost, gallery, group_params, days_for_delivery } = card;

  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const maxImgCount = 3;

  const images = useMemo(
    () => (gallery?.length && gallery?.length > 1 ? gallery : image ? [image] : [BedImage]),
    [gallery, image],
  );

  //TODO: Мертво, доделать
  function handleLike() {
    setIsLiked((prev) => !prev);
  }

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, currentTarget } = event;
      const { left, width } = currentTarget.getBoundingClientRect();

      const count = images && images.length <= maxImgCount ? images.length : maxImgCount;

      const sectionWidth = width / count;
      const offsetX = clientX - left;
      const imgIndex = Math.floor(offsetX / sectionWidth);

      setCurrentImageIndex(imgIndex);
    },
    [images?.length],
  );

  //Установка первого изображения в карточке продукта при выходе мыши за пределы карточки
  const handleMouseLeave = useCallback(() => {
    setCurrentImageIndex(0);
  }, []);

  return (
    <div className={clsx(styles.catalogCard, styles[`catalogCard_size_${size}`])} data-weight>
      <div className={styles.sliderWrap} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        {discount && <ProductTag icon={true} text={`-${cost?.discount}%`} type="discount" />}
        <ButtonIcon className={styles.likeButton} isActive={isLiked} onClick={handleLike}>
          <HeartIcon />
        </ButtonIcon>
        {/* Галлерея */}
        {images &&
          images
            .filter((img) => !img.toString().includes("mp4"))
            .filter((img) => !img.toString().includes("webm"))
            .slice(0, maxImgCount)
            .map((image, index) => (
              <Image
                className={clsx(styles.img, index === currentImageIndex && styles.img_visible)}
                key={index}
                src={image}
                alt={name || "Изображение"}
                fill
              />
            ))}
      </div>
      {/* Пагинация */}
      <div className={styles.pagination}>
        {Array.from({ length: images && images.length <= maxImgCount ? images.length : maxImgCount }).map(
          (_, index) => (
            <div
              key={index}
              className={clsx(styles.paginationItem, index === currentImageIndex && styles.paginationItem_active)}
            />
          ),
        )}
      </div>
      <div className={styles.infoWrap}>
        <div className={styles.descWrap}>
          <div className={styles.priceWrap}>
            {cost && cost.price && (
              <Typography as="span" variant="numbers" className={clsx(styles.price, styles.priceNew)}>
                {cost?.price} ₽
              </Typography>
            )}
            {cost && cost.old_price && (
              <Typography as="span" variant="numbers" className={clsx(styles.price, cost?.old_price && styles.priceOld)}>{cost?.old_price} ₽</Typography>
            )}
          </div>
          <Typography as="p" variant="h6" className={styles.title}>
            {sub_name}
          </Typography>
        </div>
        <div className={styles.buttonWrap}>
          {!!group_params && <SpecificationsBlock params={group_params} />}
          <ButtonRounded
            leftIcon={<TruckIcon />}
            size="h48"
            onClick={() => setIsLiked(!isLiked)}
            text={days_for_delivery}
          />
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;
