import { create } from "zustand";

interface IActions {
  setCatalogIsOpen: (catalogIsOpen: boolean) => void;
  setCatalogClose: () => void;
  toggleCatalogIsOpen: () => void;
}

interface IState {
  catalogIsOpen: boolean;
}

interface IStore extends IState, IActions {}

const useCatalogStore = create<IStore>()((set) => ({
  catalogIsOpen: false,
  setCatalogIsOpen: (catalogIsOpen) => set({ catalogIsOpen }),
  setCatalogClose: () => set({ catalogIsOpen: false }),
  toggleCatalogIsOpen: () => set((state) => ({ catalogIsOpen: !state.catalogIsOpen })),
}));

export const useCatalogIsOpen = () => useCatalogStore((state) => state.catalogIsOpen);
export const useSetCatalogIsOpen = () => useCatalogStore.getState().setCatalogIsOpen;
export const useSetCatalogClose = () => useCatalogStore.getState().setCatalogClose;
export const useToggleCatalogIsOpen = () => useCatalogStore.getState().toggleCatalogIsOpen;
