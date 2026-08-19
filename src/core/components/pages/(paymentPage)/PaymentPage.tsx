"use client";
//libs
import React from "react";
import Image from "next/image";

//styles
import css from "./styles.module.scss";

//query fetchers
import { usePageInfoBySlugQueryOptions } from "@/core/api/queryFetchers/getPageInfoBySlug";

//hooks
import { useAccordion } from "@/core/utils/hooks/useAccordion";

//assets
import visaImg from "@p/assets/images/paymentPage/visa.png";
import mirImg from "@p/assets/images/paymentPage/mir.png";
import mastercardImg from "@p/assets/images/paymentPage/mastercard_1920.png";
import mastercardTabletImg from "@p/assets/images/paymentPage/mastercard_1024.png";
import mastercardMobileImg from "@p/assets/images/paymentPage/mastercard_768.png";
import backImg from "@p/assets/images/paymentPage/vector.png";
import backTabletImg from "@p/assets/images/paymentPage/vector_1024.png";

//components
import { BreadCrumbs } from "@/core/components/common/BreadCrumbs/BreadCrumbs";
import SectionWrapper from "@/core/components/common/SectionWrapper/SectionWrapper";
import Typography from "@/core/components/ui/shared/Typography/Typography";
import { TabsBlock } from "@/core/components/common/(serviceComponents)/TabsBlock/TabsBlock";
import { AccordionItem } from "@/core/components/common/(serviceComponents)/AccordionItem/AccordionItem";
import { TitleBlock } from "@/core/components/common/(serviceComponents)/TitleBlock/TitleBlock";

const slug = "payment";
export const PaymentPage = () => {
  const { data } = usePageInfoBySlugQueryOptions(slug);
  const { data: pageData } = data || {};

  const pageTitle = pageData?.title || pageData?.name;
  const accordion = pageData?.content?.filter((item) => item.type === "accordion");

  const { openAccordionIndex, accordionContentRefs, handleAccordionToggle } = useAccordion();

  return (
    <div className={css.paymentPage}>
      <BreadCrumbs
        crumbs={[
          { label: "Главная", href: "/" },
          { label: "Оплата", href: "/payment" },
        ]}
      />
      <SectionWrapper>
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
        <div className={css.paymentInfo}>
          <div className={css.paymentInfoWrap}>
            <Typography as="h2" variant="h2" className={css.paymentInfoTitle}>
              Выберите удобный для вас способ оплаты!
            </Typography>
            <Typography as="p" variant="h4" className={css.paymentInfoText}>
              Мы гарантируем безопасность всех онлайн-транзакций и строгое соблюдение конфиденциальности данных.
            </Typography>
          </div>
          <div className={css.visaWrap}>
            <Image src={visaImg} alt="виза" />
          </div>
          <div className={css.mirWrap}>
            <Image src={mirImg} alt="мир" />
          </div>
          <div className={css.mastercardWrap}>
            <Image className={css.mastercardImg} src={mastercardImg} alt="мастер кард" />
            <Image className={css.mastercardTableImg} src={mastercardTabletImg} alt="мастер кард" />
            <Image className={css.mastercardMobileImg} src={mastercardMobileImg} alt="мастер кард" />
          </div>
          <div className={css.backgroundWrap}>
            <Image className={css.backgroundImg} src={backImg} alt="фон" />
            <Image className={css.backgroundTabletImg} src={backTabletImg} alt="фон" />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};
