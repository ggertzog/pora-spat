import React from "react";
import styles from "./styles.module.scss";
import NavigationCard from "../../ui/shared/NavigationCard/NavigationCard";
import { components } from "@/core/types/__generated__/api-schema";
import RoomImg from "@p/assets/images/navigation-card.png";

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
  return (
    <section className={styles.roomIdeasSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Идеи для комнат</h2>
        <p className={styles.descriptiom}>Мы собрали нашу похожую по стилю мебель в готовые решения для ваших комнат</p>
        <div className={styles.navigationCardsList}>
          {cards.slice(0, 3).map((item) => (
            <NavigationCard key={item.id} card={item} className={styles.navigationCardItem} />
          ))}
        </div>
      </div>
    </section>
  );
}
