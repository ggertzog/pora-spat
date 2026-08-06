"use client";

// import { useEffect, useState } from "react";
// export function useMediaQuery(query: string): boolean {
//   const [matches, setMatches] = useState(false);
//   console.log(matches);

//   useEffect(() => {
//     const mql = window.matchMedia(query);
//     const handler = () => setMatches(mql.matches);
//     handler(); // начальное значение
//     mql.addEventListener("change", handler);

//     return () => mql.removeEventListener("change", handler);
//   }, [query]);
//   return matches;
// }

import { useEffect, useState } from "react";

/**
 * useMediaQuery - хук для определения совпадений с медиазапросами
 *
 * @param {string} query - строка медиа-запроса, например: '(max-width: 768px)'
 * @returns {boolean} - true, если медиазапрос совпадает, иначе false
 * @throws {Error} - если передана некорректная строка медиазапроса
 */
export const useMediaQuery = (query: string): boolean => {
  // Валидация медиазапроса
  if (!query || typeof query !== "string") {
    throw new Error("Invalid media query string");
  }

  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    const handleChange = () => {
      setMatches(matchMedia.matches);
    };

    // Установить начальное значение
    handleChange();

    // Слушать изменения
    matchMedia.addEventListener("change", handleChange);

    // Очистка
    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

