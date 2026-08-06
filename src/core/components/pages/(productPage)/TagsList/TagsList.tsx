//libs
import React from "react";

//styles
import styles from "./styles.module.scss";

//components
import Tag from "@/core/components/ui/shared/Tag/Tag";

//types
import { ITag } from "@/core/types/newapi";

interface TagsListProps {
  tags: ITag[];
}

export const TagsList = ({ tags }: TagsListProps) => {
  return (
    <ul className={styles.tagsList}>
      {tags.map(({ id, title, slug, background_color }) => (
        <li key={id} className={styles.tagsListItem}>
          <Tag text={title} size="sm" slug={slug} background_color={background_color} />
        </li>
      ))}
    </ul>
  );
};
