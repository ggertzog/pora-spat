//libs
import React, { RefObject } from "react";
import clsx from "clsx";

//styles
import css from "./styles.module.scss";

interface SectionWrapperProps {
    className?: string;
    children: React.ReactNode;
    ref?: RefObject<HTMLElement | null>
}

const SectionWrapper = ({className, children, ref}: SectionWrapperProps) => {
  return (
    <section className={clsx(css.sectionWrapper, className)} ref={ref}>
      <div className={css.container}>{children}</div>
    </section>
  );
};

export default SectionWrapper;
