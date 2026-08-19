"use client";
//libs
import React from "react";

//styles
import css from "./styles.module.scss";

//query fetchers
import { usePageInfoBySlugQueryOptions } from "@/core/api/queryFetchers/getPageInfoBySlug";

// hooks
import { useAccordion } from "@/core/utils/hooks/useAccordion";

//components
import { BreadCrumbs } from "@/core/components/common/BreadCrumbs/BreadCrumbs";
import SectionWrapper from "@/core/components/common/SectionWrapper/SectionWrapper";
import { TitleBlock } from "@/core/components/common/(serviceComponents)/TitleBlock/TitleBlock";
import { TabsBlock } from "@/core/components/common/(serviceComponents)/TabsBlock/TabsBlock";
import { AccordionItem } from "@/core/components/common/(serviceComponents)/AccordionItem/AccordionItem";

const slug = "exchange-and-refund";

export const ExchangeAndRefundPage = () => {
  const { data } = usePageInfoBySlugQueryOptions(slug);

  const { data: pageData } = data || {};

  const pageTitle = pageData?.title || pageData?.name;

  const accordion = pageData?.content?.filter((item) => item.type === "accordion");

  const { openAccordionIndex, accordionContentRefs, handleAccordionToggle } = useAccordion();

  return (
    <div className={css.exchangeAndRefundPage}>
      <BreadCrumbs
        crumbs={[
          { label: "Главная", href: "/" },
          { label: "Обмен и возврат", href: "/exchange-and-refund" },
        ]}
      />
      <SectionWrapper className={css.content}>
        <TitleBlock title={pageTitle || ""} description={pageData?.description || ""} />
        <TabsBlock currentSlug={slug} />
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
