//libs
import React, { useMemo, useState } from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

//types
import { IProductShort } from "@/core/types/newapi";

//stores
import { useBasket } from "@/core/store/useBasketStore";

//query fetchers
import { usePromocodeCheck } from "@/core/api/queryFetchers/getPromocodeCheckQuery";

//helpers
import { formatPrice } from "@/core/utils/helpers/formatPrice";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";
import UiInput from "@/core/components/ui/shared/UiInput/UiInput";
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";

interface BasketSidebarProps {
  className?: string;
  products: IProductShort[];
}

export const BasketSidebar = ({ className, products }: BasketSidebarProps) => {
  const [promocode, setPromocode] = useState("");
  const basket = useBasket();

  const { totalCount, totalSum, discountSum } = useMemo(() => {
    const quantityBySlug = new Map(basket.map((item) => [item.slug, item.quantity]));

    return products.reduce(
      (acc, product) => {
        const quantity = quantityBySlug.get(String(product.slug)) ?? 0;
        const price = product.cost?.price ?? 0;
        const oldPrice = product.cost?.old_price ?? price;

        acc.totalCount += quantity;
        acc.totalSum += price * quantity;
        acc.discountSum += (oldPrice - price) * quantity;

        return acc;
      },
      { totalCount: 0, totalSum: 0, discountSum: 0 },
    );
  }, [products, basket]);

  const {
    mutate: checkPromocode,
    data: appliedPromocode,
    error: promocodeError,
    isPending,
    reset,
  } = usePromocodeCheck();

  //Скидка по промокоду не может увести итоговую сумму в минус
  const promocodeSum = Math.min(Number(appliedPromocode?.sum ?? 0) || 0, totalSum);

  const finalSum = totalSum - promocodeSum;

  const handleSetPromocode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target.value;
    setPromocode(value);

    //Сбрасываем прошлый результат проверки, пока пользователь правит код
    if (appliedPromocode || promocodeError) {
      reset();
    }
  };

  const handleCheckPromocode = () => {
    const code = promocode.trim();

    if (!code || isPending) {
      return;
    }

    checkPromocode(code);
  };

  const handlePromocodeKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCheckPromocode();
    }
  };

  return (
    <div className={clsx(css.basketSidebar, className)}>
      <Typography className={css.title} as="p" variant="h4">
        Детали заказа
      </Typography>
      <div className={css.calculateBlock}>
        <div className={css.calculateWrap}>
          <Typography className={css.calculateCategory} as="span" variant="text4">
            {totalCount} товара
          </Typography>
          <div className={css.devider}></div>
          <Typography className={css.calculateValue} as="span" variant="text4">
            {formatPrice(totalSum + discountSum)} ₽
          </Typography>
        </div>
        <div className={css.calculateWrap}>
          <Typography className={css.calculateCategory} as="span" variant="text4">
            Скидка
          </Typography>
          <div className={css.devider}></div>
          <Typography className={clsx(css.calculateValue, css.calculateValue_error)} as="span" variant="text4">
            -{formatPrice(discountSum)} ₽
          </Typography>
        </div>
        {promocodeSum > 0 && (
          <div className={css.calculateWrap}>
            <Typography className={css.calculateCategory} as="span" variant="text4">
              Промокод
            </Typography>
            <div className={css.devider}></div>
            <Typography className={clsx(css.calculateValue, css.calculateValue_error)} as="span" variant="text4">
              -{formatPrice(promocodeSum)} ₽
            </Typography>
          </div>
        )}
      </div>
      <div className={css.totalBlock}>
        <Typography className={css.totalText} as="p" variant="h4">
          Итого
        </Typography>
        <div className={css.devider}></div>
        <Typography className={css.totalValue} as="p" variant="h3">
          {formatPrice(finalSum)} ₽
        </Typography>
      </div>
      <div className={css.promocode}>
        <Typography className={css.promocodeTitle} as="p" variant="h6">
          У меня есть промокод
        </Typography>
        <UiInput
          placeholder="Промокод"
          value={promocode}
          onChange={handleSetPromocode}
          onKeyDown={handlePromocodeKeyDown}
          onButtonClick={handleCheckPromocode}
          disabled={isPending}
          error={promocodeError ? (promocodeError.message ?? "Промокод не найден") : undefined}
        />
        {promocodeSum > 0 && (
          <Typography className={css.promocodeSuccess} as="p" variant="text4">
            Промокод применён
          </Typography>
        )}
      </div>
      <ButtonRounded
        data-weight
        className={css.orderButton}
        href="#"
        as="router"
        variant="beige-main"
        size="h56"
        text="Перейти к оформлению"
      />
    </div>
  );
};
