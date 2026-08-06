//libs
import React from "react";

//components
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";

export const SpecificationsMobile = () => {
  const tabs = ["Описание", "Характеристики", "Доставка"];
  return (
    <div>
      <div>
        {tabs.map((item, index) => (
          <ButtonRounded key={index} text={item} size="h43" />
        ))}
      </div>
    </div>
  );
};
