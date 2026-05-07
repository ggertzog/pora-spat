"use client";
import styles from "./styles.module.scss";
import { TitleSection } from "./TitleSection/TitleSection";
import TagsSection from "./TagsSection/TagsSection";
import CategorySection from "./CategorySection/CategorySection";
import HeroSection from "./HeroSection/HeroSection";
import ProductSection from "./ProductSection/ProductSection";
import RecommendationSection from "./RecommendationSection/RecommendationSection";
import { useHitSalesQuery } from "@/core/api/queryFetchers/getHitSalesQuery";
import { useDeliveryTomorrowQuery } from "@/core/api/queryFetchers/getDeliveryTomorrowQuery";
import RoomIdeasSection from "./RoomIdeasSection/RoomIdeasSection";
import { usePublicationsCategoryQuery } from "@/core/api/queryFetchers/getPublicationsCategoryQuery";
import ReviewsSection from "./ReviewsSection/ReviewsSection";
import DiscountSection from "./DiscountSection/DiscountSection";
import { useDiscountQuery } from "@/core/api/queryFetchers/getDiscountQuery";
import AboutSection from "./AboutSection/AboutSection";
import { useSettingsQuery } from "@/core/api/queryFetchers/getSettingsQuery";

const HomePage = () => {
  const { data: hitSales } = useHitSalesQuery();
  const { data: deliveryTomorrow } = useDeliveryTomorrowQuery();
  const { data: cards } = usePublicationsCategoryQuery();
  const { data: discountData } = useDiscountQuery();
  const { data: settingsData } = useSettingsQuery();

  return (
    <>
      {/* <HeroSection />
      <TagsSection />
      <CategorySection />
      <TitleSection /> */}
      <ProductSection cards={hitSales || []} title="Хиты продаж" bgColor="secondary" />
      {/* <RecommendationSection />
      <div className={styles.deliveryTomorrowSection}>
        <ProductSection cards={deliveryTomorrow || []} title="Доставим завтра" bgColor="main" />
      </div> */}
      {/* TODO: Как доделаю верстку RoomIdeasSection, переключить на серверный запросы с мок даты */}
      {/* {cards && <RoomIdeasSection cards={cards} />} */}
      {/* <RoomIdeasSection />
      <ReviewsSection /> */}
      {/* TODO: переделать условие рендера */}
      {/* {discountData && <DiscountSection discountData={discountData} />}
      {!!settingsData && <AboutSection htmlData={settingsData?.home_description_html} image={settingsData?.home_description_image} />} */}
    </>
  );
};

export default HomePage;
