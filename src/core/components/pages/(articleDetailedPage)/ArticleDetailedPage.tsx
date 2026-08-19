"use client";
//libs
import React from "react";

//styles
import css from "./styles.module.scss";

//query fetchers
import { useArticleBySlugQuery } from "@/core/api/queryFetchers/getArticleBySlugQuery";

//components
import SectionWrapper from "@/core/components/common/SectionWrapper/SectionWrapper";
import { BreadCrumbs } from "@/core/components/common/BreadCrumbs/BreadCrumbs";
import { ImageBlock } from "./ImageBlock/ImageBlock";
import { ContentBlock } from "./ContentBlock/ContentBlock";

interface ArticleDetailedPageProps {
  slug: string;
}

export const ArticleDetailedPage = ({ slug }: ArticleDetailedPageProps) => {
  const { data } = useArticleBySlugQuery(slug);
  const { data: articleData, seo: articleSeo } = data || {};

  const articleTitle = articleData?.name || articleData?.title || "";

  const crumbs = [
    { label: "Главная", href: "/" },
    { label: "Акции и Новости", href: "/articles" },
    ...(articleTitle ? [{ label: articleTitle, href: `/articles/${slug}` }] : []),
  ];

  return (
    <div className={css.articleDetailedPage}>
      <BreadCrumbs crumbs={crumbs} />
      <SectionWrapper className={css.contentWrap}>
        <div className={css.container}>
          <ImageBlock src={articleData?.image || ""} alt={articleTitle || "Изображение"} />
          <ContentBlock
            title={articleTitle}
            htmlData={articleData?.description}
            date={articleData?.date ? new Date(articleData.date).toLocaleDateString("ru-RU") : ""}
            href={articleData?.button_url || ""}
          />
        </div>
      </SectionWrapper>
    </div>
  );
};
