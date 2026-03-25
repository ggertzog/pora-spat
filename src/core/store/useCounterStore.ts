import { create, StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IActions {
  increment: () => void;
  decrement: () => void;
}

interface IInitialState {
  count: number;
  bear: number;
}

interface IStoreState extends IInitialState, IActions {}

const initialState: IInitialState = {
  count: 0,
  bear: 21,
};

const counterStore: StateCreator<IStoreState, [["zustand/devtools", never], ["zustand/persist", unknown]]> = (set) => ({
  ...initialState,
  increment: () => set((state) => ({ count: state.count + 1 }), false, "increment") as void,
  decrement: () => set((state) => ({ count: state.count - 1 }), false, "decrement") as void,
});

const useCounterStore = create<IStoreState>()(
  devtools(
    persist(counterStore, {
      name: "counter-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ count: state.count }),
    }),
  ),
);

export const useCount = () => useCounterStore((state) => state.count);
export const useIncrement = () => useCounterStore.getState().increment;
export const useDecrement = () => useCounterStore.getState().decrement;
