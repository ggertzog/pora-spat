import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IBasketItem {
  slug: string;
  quantity: number;
}

interface IState {
  basket: IBasketItem[];
  selectedCards: string[];
  isHydrated: boolean;
}

interface IActions {
  // добавление карточки в корзину
  addToBasket: (slug: string, quantity?: number) => void;
  // удаление карточки из корзины
  deleteFromBasket: (slug: string) => void;
  // декрементирование счетчика на карточке
  decrementQuantity: (slug: string, quantity: number) => void;
  // инкрементирование счетчика на карточке
  incrementQuantity: (slug: string, quantity: number) => void;
  // переключение выделения карточки
  toggleSelected: (slug: string) => void;
  // выделение всех карточек
  selectAll: () => void;
  // очистка выделенния карточек
  clearSelectred: () => void;
  // удаление выделенных карточек
  deleteSelected: () => void;
  // гидрация компонента
  setHydrated: () => void;
}

interface IBasketStore extends IState, IActions {}

const initialState: IState = {
  basket: [],
  selectedCards: [],
  isHydrated: false,
};

const basketStore: StateCreator<IBasketStore> = (set) => ({
  ...initialState,
  // добавление карточки в корзину
  addToBasket: (slug, quantity = 1) =>
    set((state) => {
      const existing = state.basket.find((item) => item.slug === slug);
      return existing ? state : { basket: [...state.basket, { slug, quantity }] };
    }),
  // удаление карточки из корзины
  deleteFromBasket: (slug) => set((state) => ({ basket: state.basket.filter((item) => item.slug !== slug) })),
  // декрементирование счетчика на карточке
  decrementQuantity: (slug, step = 1) =>
    set((state) => {
      const existing = state.basket.find((item) => item.slug === slug);
      if (!existing) return state;

      const next = existing.quantity - step;
      return next <= 0
        ? { basket: state.basket.filter((item) => item.slug !== slug) }
        : { basket: state.basket.map((item) => (item.slug === slug ? { ...item, quantity: next } : item)) };
    }),
  // инкрементирование счетчика на карточке
  incrementQuantity: (slug, step = 1) =>
    set((state) => ({
      basket: state.basket.map((item) => (item.slug === slug ? { ...item, quantity: item.quantity + step } : item)),
    })),
  // переключение выделения карточки
  toggleSelected: (slug) =>
    set((state) => ({
      selectedCards: state.selectedCards.includes(slug)
        ? state.selectedCards.filter((item) => item !== slug)
        : [...state.selectedCards, slug],
    })),
  // выделение всех карточек
  selectAll: () =>
    set((state) => ({
      selectedCards: state.selectedCards.length === state.basket.length ? [] : state.basket.map((item) => item.slug),
    })),
  // очистка выделенния карточек
  clearSelectred: () => set({ selectedCards: [] }),
  // удаление выделенных карточек
  deleteSelected: () =>
    set((state) => ({
      basket: state.basket.filter((item) => !state.selectedCards.includes(item.slug)),
      selectedCards: [],
    })),
  // гидрация компонента
  setHydrated: () => set({ isHydrated: true }),
});

const useBasketStore = create<IBasketStore>()(
  persist(basketStore, {
    name: "basket-store",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ basket: state.basket }),
    onRehydrateStorage: () => (state) => state?.setHydrated(),
  }),
);

export const useBasket = () => useBasketStore((state) => state.basket);
export const useBasketItemQuantity = (slug: string) =>
  useBasketStore((state) => state.basket.find((item) => item.slug === slug)?.quantity ?? 0);
export const useAddToBasket = () => useBasketStore((state) => state.addToBasket);
export const useDeleteFromBasket = () => useBasketStore((state) => state.deleteFromBasket);
export const useBasketIsHydrated = () => useBasketStore((state) => state.isHydrated);
export const useBasketSetHydrated = () => useBasketStore((state) => state.setHydrated);
export const useDecrementBasketCardQuantity = () => useBasketStore((state) => state.decrementQuantity);
export const useIncrementBasketCardQuantity = () => useBasketStore((state) => state.incrementQuantity);
export const useIsBasketCardSelected = (slug: string) => useBasketStore((state) => state.selectedCards.includes(slug));
export const useSelectedCount = () => useBasketStore((state) => state.selectedCards.length);
export const useIsAllSelected = () =>
  useBasketStore((state) => state.basket.length > 0 && state.selectedCards.length === state.basket.length);
export const useToggleSelected = () => useBasketStore((state) => state.toggleSelected);
export const useSelectAll = () => useBasketStore((state) => state.selectAll);
export const useDeleteSelected = () => useBasketStore((state) => state.deleteSelected)