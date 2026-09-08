import { create, StateCreator } from "zustand";

interface IState {
  menuIsOpen: boolean;
}

interface IActions {
  toggleMenuState: () => void;
  closeMenu: () => void;
}

interface IMenuStore extends IState, IActions {}

const initialState: IState = {
  menuIsOpen: false,
};

const menuStore: StateCreator<IMenuStore> = (set) => ({
  ...initialState,
  toggleMenuState: () => set((state) => ({ menuIsOpen: !state.menuIsOpen })),
  closeMenu: () => set(() => ({ menuIsOpen: false })),
});

const useMenuStore = create<IMenuStore>()(menuStore);

export const useMenuIsOpen = () => useMenuStore((state) => state.menuIsOpen);
export const useToggleMenuState = () => useMenuStore.getState().toggleMenuState;
export const useCloseMenu = () => useMenuStore.getState().closeMenu;
