"use client";
//libs
import React, { useEffect, useRef, useState } from "react";

//styles
import css from "./styles.module.scss";

//helpers
import { isNumberCheck } from "@/core/utils/helpers/isNumberCheck";

//query fetchers
import { usePageInfoBySlugQueryOptions } from "@/core/api/queryFetchers/getPageInfoBySlug";
import { useCityInfoQuery } from "@/core/api/queryFetchers/getCitiesQuery";

//hooks
import { useAccordion } from "@/core/utils/hooks/useAccordion";

//components
import { BreadCrumbs } from "@/core/components/common/BreadCrumbs/BreadCrumbs";
import SectionWrapper from "@/core/components/common/SectionWrapper/SectionWrapper";
import { TabsBlock } from "@/core/components/common/(serviceComponents)/TabsBlock/TabsBlock";
import { AccordionItem } from "@/core/components/common/(serviceComponents)/AccordionItem/AccordionItem";
import { TitleBlock } from "@/core/components/common/(serviceComponents)/TitleBlock/TitleBlock";

const slug = "delivery";

export const DeliveryPage = () => {
  const cityId = 1;
  const { data } = usePageInfoBySlugQueryOptions(slug);
  const { data: pageData, seo: seoData } = data || {};
  const { data: cityData } = useCityInfoQuery(cityId);

  const table = pageData?.content?.filter((item) => item.type === "table");
  const accordion = pageData?.content?.filter((item) => item.type === "accordion");

  const { openAccordionIndex, accordionContentRefs, handleAccordionToggle } = useAccordion();

  const tables: typeof table = [
    {
      type: "table",
      title: "В пределах города",
      content: isNumberCheck(cityData?.delivery_in_city)
        ? `${cityData?.delivery_in_city} ₽`
        : `${cityData?.delivery_in_city}`,
    },
    {
      type: "table",
      title: "Подъем изделия на грузовом лифте или занос на 1-й этаж",
      content: isNumberCheck(cityData?.loads_up_lifting)
        ? `${cityData?.loads_up_lifting} ₽`
        : `${cityData?.loads_up_lifting}`,
    },
    {
      type: "table",
      title: "Подъем изделия ручной",
      content: isNumberCheck(cityData?.loads_up_stairs)
        ? `${cityData?.loads_up_stairs} ₽ <span>/ 1 этаж</span>`
        : `${cityData?.loads_up_stairs}`,
    },
  ];

  return (
    <div className={css.deliveryPage}>
      <BreadCrumbs
        crumbs={[
          { label: "Главная", href: "/" },
          { label: "Доставка", href: "/delivery" },
        ]}
      />
      <SectionWrapper className={css.contentBlock}>
        <TitleBlock title={cityData?.title_delivery || ""} description={cityData?.description_delivery || ""} />
        <TabsBlock currentSlug={slug} />
        {/* TODO: вынести таблицу в отдельный компонент */}
        <table className={css.table}>
          <tbody>
            {tables?.map((item) => (
              <tr key={item.title} className={css.row}>
                <td className={css.titleCell}>{item.title}</td>
                <td className={css.contentCell} dangerouslySetInnerHTML={{ __html: item.content || "" }}></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={css.accordionWrap}>
          {accordion?.map((item, index) => (
            <AccordionItem
              key={item.title}
              title={item.title}
              content={item.content}
              isOpen={openAccordionIndex === index}
              onToggle={() => handleAccordionToggle(index)}
              contentRef={(el) => {
                accordionContentRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};
