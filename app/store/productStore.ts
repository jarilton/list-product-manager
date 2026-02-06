import { create } from "zustand";
import { Product } from "../product/entities/Product";

interface ProductState {
  products: Product[];
  loading: boolean;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  setLoading: (v: boolean) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),
  addProduct: (product) =>
    set((state) => ({ products: [product, ...state.products] })),
  setLoading: (v) => set({ loading: v }),
}));
