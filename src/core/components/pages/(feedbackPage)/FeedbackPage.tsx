//libs
import React from "react";

//styles
import css from "./styles.module.scss";

//components
import { BreadCrumbs } from "@/core/components/common/BreadCrumbs/BreadCrumbs";
import SectionWrapper from "@/core/components/common/SectionWrapper/SectionWrapper";
import { TitleBlock } from "@/core/components/common/(serviceComponents)/TitleBlock/TitleBlock";
import { FeedbackForm } from "./FeedbackForm/FeedbackForm";

export const FeedbackPage = () => {
  return (
    <div className={css.feedbackPage}>
      <BreadCrumbs
        crumbs={[
          { label: "Главная", href: "/" },
          { label: "Оставить обращение", href: "/feedback" },
        ]}
      />
      <SectionWrapper>
        <TitleBlock
          className={css.titleBlock}
          title="Оставить обращение"
          description="Мы несём полную ответственность за качество наших товаров и услуг. Если у вас возникли вопросы или проблемы с заказом, пожалуйста, свяжитесь с нами: заполните форму обращения. Это поможет нам быстрее разобраться в ситуации и найти решение."
        />
        <FeedbackForm />
      </SectionWrapper>
    </div>
  );
};
