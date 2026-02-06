import { create } from "zustand";
import { Product } from "../shared/product/entities/Product";

interface ProductState {
  products: Product[];
  loading: boolean;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  setLoading: (v: boolean) => void;
  removeProduct: (id: string) => void;
  updateProduct: (product: Product) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  addProduct: (product) =>
    set((state) => ({ products: [product, ...state.products] })),

  setLoading: (v) => set({ loading: v }),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === product.id ? product : p)),
    })),
}));
