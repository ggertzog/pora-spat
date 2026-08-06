//libs
import React from "react";

//styles
import styles from "./styles.module.scss";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";

//types
import { IProductDetailed } from "@/core/types/newapi";

interface ParametersProps {
  productData: IProductDetailed;
}

export const Parameters = ({ productData }: ParametersProps) => {
  return (
    <div className={styles.parameters}>
      <Typography as="h3" variant="h3">
        Характеристики
      </Typography>
      <div className={styles.parametersGrid}>
        {productData?.parameters?.map((item) => (
          <div key={item.property_id} className={styles.parametersGridItem}>
            <Typography as="p" variant="text4" className={styles.parametersItemTitle}>
              {item.title}
            </Typography>
            <div className={styles.parametersItemLine}></div>
            <Typography as="p" variant="text4" className={styles.parametersItemValue}>
              {item.value}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
