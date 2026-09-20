import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IState {
  favourites: string[];
  isHydrated: boolean;
}

interface IActions {
  toggleFavourite: (slug: string) => void;
  removeFavourite: (slug: string) => void;
  clearFavourites: () => void;
  setHydrated: () => void;
}

interface IFavouritesStore extends IState, IActions {}

const initialState: IState = {
  favourites: [],
  isHydrated: false,
};

const favouritesStore: StateCreator<IFavouritesStore, [["zustand/persist", unknown]]> = (set) => ({
  ...initialState,
  toggleFavourite: (slug) =>
    set((state) => ({
      favourites: state.favourites.includes(slug)
        ? state.favourites.filter((item) => item !== slug)
        : [...state.favourites, slug],
    })),
  removeFavourite: (slug) => set((state) => ({ favourites: state.favourites.filter((item) => item !== slug) })),
  clearFavourites: () => set({ favourites: [] }),
  setHydrated: () => set({ isHydrated: true }),
});

const useFavouritesStore = create<IFavouritesStore>()(
  persist(favouritesStore, {
    name: "favourites-store",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ favourites: state.favourites }),
    onRehydrateStorage: () => (state) => state?.setHydrated(),
  }),
);

export const useFavourites = () => useFavouritesStore((state) => state.favourites);
export const useIsFavourite = (slug: string) => useFavouritesStore((state) => state.favourites.includes(slug));
export const useToggleFavourite = () => useFavouritesStore((state) => state.toggleFavourite);
export const useRemoveFavourite = () => useFavouritesStore((state) => state.removeFavourite);
export const useClearFavourites = () => useFavouritesStore((state) => state.clearFavourites);
export const useFavouritesIsHydrated = () => useFavouritesStore((state) => state.isHydrated);
export const useSetHydrated = () => useFavouritesStore((state) => state.setHydrated);
