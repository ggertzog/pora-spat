"use client";
//libs
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

//styles
import css from "./styles.module.scss";

//types
import { IRunningLine } from "@/core/api/queryFetchers/getRunningLineQuery";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";

interface RunningLineProps {
  className?: string;
  data: IRunningLine[];
  speed?: number;
}

export const RunningLine = ({ className, data, speed = 1 }: RunningLineProps) => {
  const duplicatedData = Array.from({ length: 8 }, () => data).flat();
  const carouselRef = useRef<HTMLUListElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // длина цикла в элементах: обязательно чётная, иначе на стыке ломается
  // чередование nth-child(even/odd) и картинки прыгают по вертикали
  const loopLength = data.length % 2 === 0 ? data.length : data.length * 2;

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const first = carousel.children[0] as HTMLElement | undefined;
    const loopEnd = carousel.children[loopLength] as HTMLElement | undefined;
    if (!first || !loopEnd) return;

    // точная ширина цикла — расстояние до элемента, который его повторяет
    const loopWidth = loopEnd.offsetLeft - first.offsetLeft;

    let position = 0;

    const animate = () => {
      position -= speed;

      if (position <= -loopWidth) {
        position += loopWidth;
      }

      carousel.style.transform = `translateX(${position}px)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    };
  }, [speed, loopLength]);

  return (
    <div className={clsx(css.runningLineWrap, className)}>
      <ul className={css.runningLineList} ref={carouselRef}>
        {duplicatedData.map((item, index) => (
          <li key={index} className={css.runningLineItem}>
            <Link href={item.link || ""} className={css.runningLineLink}></Link>
            <Typography as="span" variant="custom" className={css.runningLineText}>
              {item.text}
            </Typography>
            {item.image && (
              <div className={css.runningLineImageWrap}>
                <Image src={item.image} alt={item.name || ""} fill className={css.runningLineImage} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
