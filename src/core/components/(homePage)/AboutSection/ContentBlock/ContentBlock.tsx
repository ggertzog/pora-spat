import React from "react";
import styles from "./styles.module.scss";

interface ContentBlockProps {
  htmlData?: string | null;
}

const ContentBlock = ({ htmlData }: ContentBlockProps) => {
  return (
    <div className={styles.contentBlock}>
      {htmlData && <div className={styles.container} dangerouslySetInnerHTML={{ __html: htmlData }} />}
    </div>
  );
};

export default ContentBlock;
