//libs
import React from "react";
import clsx from "clsx";
import Image from "next/image";

//styles
import css from "./styles.module.scss";

//assets
import HeartIcon from "@p/assets/icons/heart.svg";
import TrashIcon from "@p/assets/icons/trash.svg";
import MinusIcon from "@p/assets/icons/minus.svg";
import PlusIcon from "@p/assets/icons/plus.svg";
import SomethingImage from "@p/assets/images/bed2.png";

//stores
import {
  useBasketItemQuantity,
  useDecrementBasketCardQuantity,
  useDeleteFromBasket,
  useIncrementBasketCardQuantity,
  useIsBasketCardSelected,
  useToggleSelected,
} from "@/core/store/useBasketStore";
import { useFavouritesIsHydrated, useIsFavourite, useToggleFavourite } from "@/core/store/useFavouritesStore";

//types
import { IProductShort } from "@/core/types/newapi";

//helpers
import { formatPrice } from "@/core/utils/helpers/formatPrice";

//components
import UiCheckBox from "@/core/components/ui/shared/UiCheckBox/UiCheckBox";
import Typography from "@/core/components/ui/shared/Typography/Typography";
import ButtonIcon from "@/core/components/ui/shared/ButtonIcon/ButtonIcon";

interface BasketCardProps {
  className?: string;
  product: IProductShort;
}

export const BasketCard = ({ className, product }: BasketCardProps) => {
  const { name, sub_name, image, group_params, cost, slug } = product;

  // boolean карточка в избранном
  const isFavourite = useIsFavourite(String(slug));
  // boolean выделена ли карточка
  const isSelected = useIsBasketCardSelected(String(slug));
  const isHydrated = useFavouritesIsHydrated();

  // удаление по иконке корзины
  const hadnleDeleteCard = useDeleteFromBasket();
  // инкрементирование счетчика
  const handleIncrementCounter = useIncrementBasketCardQuantity();
  // декрементирование счетчика
  const handleDecrementCounter = useDecrementBasketCardQuantity();
  // выделение карточки
  const handleToggleSelected = useToggleSelected();
  // переключение избранного
  const handleToggleFavourite = useToggleFavourite();

  const counterValue = useBasketItemQuantity(String(slug));
  const calculatedPrice = formatPrice(cost?.price ? cost?.price * counterValue : 0);

  return (
    <div className={clsx(css.basketCard, className)}>
      <UiCheckBox
        className={css.checkbox}
        type="checkbox"
        variant="square"
        color="vanilla"
        checked={isSelected}
        onChange={() => handleToggleSelected(String(slug))}
      />
      <div className={css.infoBlock}>
        <div className={css.content}>
          <div className={css.imageWrap}>
            <Image className={css.image} src={image || ""} alt={name || "Изображение"} fill />
          </div>
          <div className={css.properties}>
            <Typography className={css.propertiesTitle} as="h4" variant="h4">
              {sub_name || name}
            </Typography>
            {group_params && group_params.length > 0 && (
              <ul className={css.propertiesList}>
                {group_params.map((item, index) => (
                  <li className={css.propertiesItem} key={index}>
                    <Typography className={css.propertiesText} as="span" variant="tooltip2">
                      {item.title}: {item.value}
                      {item.measure}
                    </Typography>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={css.counterWrap}>
          <div className={css.counter}>
            <button className={css.counterButton} onClick={() => handleDecrementCounter(String(slug), 1)}>
              <MinusIcon />
            </button>
            <Typography className={css.counterValue} as="span" variant="custom">
              {counterValue}
            </Typography>
            <button className={css.counterButton} onClick={() => handleIncrementCounter(String(slug), 1)}>
              <PlusIcon />
            </button>
          </div>
          <div className={clsx(css.priceWrap, css.priceWrap_mobile)}>
            <Typography className={css.currentPrice} as="p" variant="custom">
              {calculatedPrice}₽
            </Typography>
            {cost?.old_price && (
              <Typography className={css.oldPrice} as="p" variant="custom">
                {formatPrice(Number(cost?.old_price))}₽
              </Typography>
            )}
          </div>
        </div>
      </div>
      <div className={css.priceBlock}>
        <div className={clsx(css.priceWrap, css.priceWrap_desktop)}>
          <Typography className={css.currentPrice} as="p" variant="custom">
            {calculatedPrice}₽
          </Typography>
          {cost?.old_price && (
            <Typography className={css.oldPrice} as="p" variant="custom">
              {formatPrice(Number(cost?.old_price))}₽
            </Typography>
          )}
        </div>
        <div className={css.controlsWrap}>
          <ButtonIcon
            className={css.likeButton}
            isActive={isHydrated && isFavourite}
            onClick={() => handleToggleFavourite(String(slug))}
          >
            <HeartIcon />
          </ButtonIcon>
          <ButtonIcon onClick={() => hadnleDeleteCard(String(slug))} className={css.deleteButton}>
            <TrashIcon />
          </ButtonIcon>
        </div>
      </div>
    </div>
  );
};
