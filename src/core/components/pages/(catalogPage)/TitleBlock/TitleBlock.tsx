//libs
import React, { Dispatch, SetStateAction, useState } from "react";

//styles
import css from "./styles.module.scss";

//components
import SectionWrapper from "@/core/components/common/SectionWrapper/SectionWrapper";
import Typography from "@/core/components/ui/shared/Typography/Typography";
import CategoryLink from "@/core/components/ui/shared/CategoryLink/CategoryLink";

//assets
import FatrowsIcon from "@p/assets/icons/fatrows-20.svg";

//types
import ButtonRounded from "@/core/components/ui/shared/ButtonRounded/ButtonRounded";
import { SortForm } from "@/core/components/pages/(catalogPage)/TitleBlock/SortForm/SortForm";
import { getPluralForm } from "@/core/utils/helpers/getPluralForm";
import { ICategory } from "@/core/types/newapi";

interface TitleBlockProps {
  title: string;
  count: number;
  categoryData?: ICategory;
  activeSort?: string;
  setActiveSort: Dispatch<SetStateAction<string>>;
}

const TitleBlock = ({ title, count, categoryData, activeSort, setActiveSort }: TitleBlockProps) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const handleToggleFilterDisplay = () => {
    setIsOpenFilter((prev) => !prev);
  };

  return (
    <SectionWrapper>
      <div className={css.titleWrap}>
        <Typography as="h1" variant="h3" className={css.title}>
          {title}
        </Typography>
        <Typography as="p" variant="h6" className={css.count}>
          {`(${count} ${getPluralForm(count, ["товар", "товара", "товаров"])})`}
        </Typography>
      </div>
      <div className={css.wrapper}>
        <ul className={css.linksList}>
          {categoryData?.children?.map((item) => {
            return (
              <li key={item.id} className={css.linksListItem}>
                <CategoryLink
                  text={item.menu_title || item.name || ""}
                  href={`/catalog/${categoryData.slug}/${item.slug || ""}`}
                />
              </li>
            );
          })}
        </ul>
        <div className={css.devider}></div>
        <div className={css.filters}>
          <ButtonRounded
            size="h48"
            leftIcon={<FatrowsIcon />}
            className={css.filterButton}
            onClick={handleToggleFilterDisplay}
          />
          <SortForm
            activeSort={activeSort}
            setActiveSort={setActiveSort}
            isOpen={isOpenFilter}
            setIsOpen={setIsOpenFilter}
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default TitleBlock;
