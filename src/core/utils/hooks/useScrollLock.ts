"use client";

import { useLayoutEffect } from "react";

// Счётчик активных блокировок, чтобы несколько одновременно открытых модалок
// не разблокировали скролл раньше времени
let locksCount = 0;
let savedOverflow = "";
let savedPaddingRight = "";

const lockBody = () => {
  if (locksCount === 0) {
    const { body } = document;
    // Ширина скроллбара, чтобы контент не «прыгал» при блокировке
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    savedOverflow = body.style.overflow;
    savedPaddingRight = body.style.paddingRight;

    body.style.overflow = "hidden";

    if (scrollBarWidth > 0) {
      const currentPaddingRight = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${currentPaddingRight + scrollBarWidth}px`;
    }
  }

  locksCount += 1;
};

const unlockBody = () => {
  locksCount = Math.max(0, locksCount - 1);

  if (locksCount === 0) {
    const { body } = document;

    body.style.overflow = savedOverflow;
    body.style.paddingRight = savedPaddingRight;
  }
};

/**
 * useScrollLock - хук для блокировки скролла body (например, при открытии модалки)
 *
 * @param {boolean} isLocked - true блокирует скролл, false — разблокирует
 *
 * @example
 * useScrollLock(isOpen);
 */
export const useScrollLock = (isLocked: boolean): void => {
  useLayoutEffect(() => {
    if (!isLocked) return;

    lockBody();

    return () => {
      unlockBody();
    };
  }, [isLocked]);
};
