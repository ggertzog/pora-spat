"use client";
//libs
import React from "react";

//styles
import styles from "./styles.module.scss";

//query fetchers
import { useProductBySlugQueryOptions } from "@/core/api/queryFetchers/getProductBySlugQuery";

//components
import ProductSlider from "./ProductSlider/ProductSlider";
import { Specifications } from "./Specifications/Specifications";
import { SideBar } from "./SideBar/SideBar";
import ReviewsSection from "@/core/components/pages/(homePage)/ReviewsSection/ReviewsSection";
import { TagsList } from "./TagsList/TagsList";

interface ProductPageProps {
  slug: string;
}

const ProductPage = ({ slug }: ProductPageProps) => {
  const cityId = 1;
  const { data } = useProductBySlugQueryOptions(slug, cityId);
  const { data: productData, seo: productSeo } = data || {};

  //Мок дата для верстки
  const mockTags = [
    { id: 1, title: "Заголовок1", slug: "/", background_color: "#cbbfb3", image_url: "/", link: "#" },
    { id: 2, title: "Заголовок2", slug: "/", background_color: "#cbbfb3", image_url: "/", link: "#" },
  ];

  const tagsArr = !!productData?.tag_list?.length ? productData?.tag_list : mockTags;

  return (
    <>
      <section className={styles.productPage}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.productPageLeft}>
              <div className={styles.sliderWrap}>
                <ProductSlider slides={productData?.gallery} />
                {tagsArr && <TagsList tags={tagsArr} />}
              </div>
              {productData && <Specifications productData={productData} className={styles.specifications} />}
            </div>
            {productData && <SideBar productData={productData} />}
          </div>
        </div>
      </section>
      {/* {productData?.reviews && <ReviewsSection className={styles.reviewSection} reviews={productData.reviews} />} */}
    </>
  );
};

export default ProductPage;
