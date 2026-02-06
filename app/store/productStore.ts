import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../shared/product/entities/Product";

interface State {
  products: Product[];
  loading: boolean;

  setProducts: (p: Product[]) => void;
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  setLoading: (v: boolean) => void;
}

export const useProductStore = create<State>()(
  persist(
    (set) => ({
      products: [],
      loading: false,

      setProducts: (products) => set({ products }),

      addProduct: (product) =>
        set((state) => ({ products: [product, ...state.products] })),

      updateProduct: (product) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === product.id ? product : p,
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      setLoading: (v) => set({ loading: v }),
    }),
    {
      name: "products-storage",
    },
  ),
);
