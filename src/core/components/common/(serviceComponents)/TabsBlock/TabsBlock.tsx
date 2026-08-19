//libs
import React from "react";

//styles
import css from "./styles.module.scss";

//components
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";
import clsx from "clsx";

interface TabsBlockProps {
  currentSlug: string;
}

export const TabsBlock = ({ currentSlug }: TabsBlockProps) => {
  const tabs = [
    {
      title: "Доставка",
      href: "/delivery",
      value: "delivery",
    },
    {
      title: "Оплата",
      href: "/payment",
      value: "payment",
    },
    {
      title: "Обмен и возврат",
      href: "/exchange-and-refund",
      value: "exchange-and-refund",
    },
  ];
  return (
    <div className={css.tabsWrap}>
      {tabs.map((item, index) => (
        <ButtonRounded
          key={`${index}${item.value}`}
          size="h43"
          variant="tab"
          as="router"
          href={item.href}
          text={item.title}
          className={clsx(css.tabButton, item.value === currentSlug && css.tabButtonActive)}
        />
      ))}
    </div>
  );
};
