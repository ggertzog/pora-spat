"use client";

//libs
import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//types
import { IProductShort } from "@/core/types/newapi";

//assets
import HeartIcon from "@p/assets/icons/heart.svg";
import TruckIcon from "@p/assets/icons/truck.svg";
import BedImage from "@p/assets/images/bed.png";

//stores
import { useFavouritesIsHydrated, useIsFavourite, useToggleFavourite } from "@/core/store/useFavouritesStore";
import { useAddToBasket } from "@/core/store/useBasketStore";

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

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const maxImgCount = 3;

  const images = useMemo(
    () => (gallery?.length && gallery?.length > 1 ? gallery : image ? [image] : [BedImage]),
    [gallery, image],
  );

  const isHydrated = useFavouritesIsHydrated();
  const isFavourite = useIsFavourite(String(slug));
  const toggleFavourite = useToggleFavourite();
  // TODO: Реализовать переадрисацию на страницу корзины при добавлении товара
  const addToBasket = useAddToBasket();

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
    <div className={clsx(css.catalogCard, css[`catalogCard_size_${size}`])} data-weight>
      <div className={css.sliderWrap} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        {discount && <ProductTag icon={true} text={`-${cost?.discount}%`} type="discount" />}
        <ButtonIcon
          className={css.likeButton}
          isActive={isHydrated && isFavourite}
          onClick={() => toggleFavourite(String(slug))}
        >
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
                className={clsx(css.img, index === currentImageIndex && css.img_visible)}
                key={index}
                src={image}
                alt={name || "Изображение"}
                fill
              />
            ))}
      </div>
      {/* Пагинация */}
      {images.length > 1 && (
        <div className={css.pagination}>
          {Array.from({ length: images && images.length <= maxImgCount ? images.length : maxImgCount }).map(
            (_, index) => (
              <div
                key={index}
                className={clsx(css.paginationItem, index === currentImageIndex && css.paginationItem_active)}
              />
            ),
          )}
        </div>
      )}
      <div className={css.infoWrap}>
        <div className={css.descWrap}>
          <div className={css.priceWrap}>
            {cost && cost.price && (
              <Typography as="span" variant="numbers" className={clsx(css.price, css.priceNew)}>
                {cost?.price} ₽
              </Typography>
            )}
            {cost && cost.old_price && (
              <Typography as="span" variant="numbers" className={clsx(css.price, cost?.old_price && css.priceOld)}>
                {cost?.old_price} ₽
              </Typography>
            )}
          </div>
          <Typography as="p" variant="h6" className={css.title}>
            {sub_name}
          </Typography>
        </div>
        <div className={css.buttonWrap}>
          {!!group_params && <SpecificationsBlock params={group_params} />}
          <ButtonRounded
            onClick={() => addToBasket(String(slug))}
            leftIcon={<TruckIcon />}
            size="h48"
            text={days_for_delivery}
          />
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;
