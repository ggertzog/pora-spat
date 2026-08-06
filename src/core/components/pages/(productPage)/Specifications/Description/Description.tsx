//libs
import React from "react";
import Image from "next/image";

//styles
import styles from "./styles.module.scss";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";

//types
import { IProductDetailed } from "@/core/types/newapi";

interface DescriptionProps {
  productData: IProductDetailed;
}

export const Description = ({ productData }: DescriptionProps) => {
  return (
    <div className={styles.description}>
      <Typography as="h3" variant="h3">
        Описание
      </Typography>
      <div className={styles.descriptionContent}>
        {productData?.description?.map((item) => (
          <div key={item.title} className={styles.descriptionContentItem}>
            {item.image && (
              <div className={styles.descriptionImageWrap}>
                <Image src={item.image} alt="Описание" fill />
              </div>
            )}
            <div className={styles.descriptionTextContent}>
              {item.title && (
                <Typography as="h4" variant="h4" className={styles.descriptionItemTitle}>
                  {item.title}
                </Typography>
              )}
              <Typography as="p" variant="text3" className={styles.descriptionItemText}>
                {item.text}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
