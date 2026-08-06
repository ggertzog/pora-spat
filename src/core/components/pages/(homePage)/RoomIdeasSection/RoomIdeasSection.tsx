//libs
import React from "react";

//styles
import styles from "./styles.module.scss";

//components
import NavigationCard from "@/core/components/ui/shared/NavigationCard/NavigationCard";
import Typography from "@/core/components/ui/shared/Typography/Typography";
import RoomIdeasSlider from "./RoomIdeasSlider/RoomIdeasSlider";

//types
import { components } from "@/core/types/__generated__/api-schema";

//images
import RoomImg from "@p/assets/images/navigation-card.png";

//hooks
import { useMediaQuery } from "@/core/utils/hooks/useMediaQuery";

const cards = [
  {
    id: 1,
    title: "Спальня",
    slug: "",
    image: RoomImg,
    category: {
      id: 1,
      title: "Title",
      description: "description",
      items: [],
    },
  },
  {
    id: 2,
    title: "Спальня",
    slug: "",
    image: RoomImg,
    category: {
      id: 2,
      title: "Title",
      description: "description",
      items: [],
    },
  },
  {
    id: 3,
    title: "Спальня",
    slug: "",
    image: RoomImg,
    category: {
      id: 3,
      title: "Title",
      description: "description",
      items: [],
    },
  },
];

// interface RoomIdeasSectionProps {
//   cards: components["schemas"]["PublicationResource"][];
// }

export default function RoomIdeasSection() {
  const isXSLayout = useMediaQuery("(max-width: 767px");
  const slicedCards = cards.slice(0, 3);

  return (
    <section className={styles.roomIdeasSection}>
      <div className={styles.container}>
        <Typography className={styles.title} as="h2" variant="h2">
          Идеи для комнат
        </Typography>
        <Typography className={styles.description} variant="text1" as="p">
          Мы собрали нашу похожую по стилю мебель в готовые решения для ваших комнат
        </Typography>
        {isXSLayout ? (
          <RoomIdeasSlider cards={slicedCards} />
        ) : (
          <div className={styles.navigationCardsList}>
            {slicedCards.map((item) => (
              <NavigationCard key={item.id} card={item} className={styles.navigationCardItem} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
