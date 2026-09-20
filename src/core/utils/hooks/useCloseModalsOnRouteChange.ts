"use client";
//libs
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

//stores
import { useSetCatalogClose } from "@/core/store/useCatalogStore";
import { useCloseMenu } from "@/core/store/useMenuStore";

export const useCloseModalsOnRouteChange = () => {
  const pathname = usePathname();
  const closeMenu = useCloseMenu();
  const closeCatalog = useSetCatalogClose();
  const previousPathName = useRef(pathname);

  useEffect(() => {
    if (previousPathName.current === pathname) return;
    previousPathName.current = pathname;
    closeMenu();
    closeCatalog();
  }, [pathname, closeMenu, closeCatalog]);
};
