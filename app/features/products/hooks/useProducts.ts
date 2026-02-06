"use client";

import { Product } from "@/app/shared/product/entities/Product";
import { ProductRepository } from "@/app/shared/product/repositories/ProductRepository";
import { CreateProductUseCase } from "@/app/shared/product/usecases/CreateProductUseCase";
import { GetProductsUseCase } from "@/app/shared/product/usecases/GetProductsUseCase";
import { useProductStore } from "@/app/store/productStore";
import { useEffect, useMemo, useState } from "react";

const repo = new ProductRepository();
const getProductsUseCase = new GetProductsUseCase(repo);
const createProductUseCase = new CreateProductUseCase(repo);

export function useProducts(mswReady?: boolean) {
  const {
    products,
    setProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    loading,
    setLoading,
  } = useProductStore();

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");

  async function loadProducts() {
    if (products.length > 0) return;

    setLoading(true);

    try {
      const data = await getProductsUseCase.execute();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  }

  async function createProduct(data: {
    name: string;
    category: string;
    price: number;
    description: string;
    imageUrl: string;
  }) {
    const newProduct = await createProductUseCase.execute(data);
    addProduct(newProduct);
  }

  function RemoveProduct(id: string) {
    deleteProduct(id);
  }

  function editProduct(product: Product) {
    updateProduct(product);
  }

  useEffect(() => {
    if (!mswReady) return;
    loadProducts();
  }, [mswReady]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim() !== "") {
      const term = search.toLowerCase().trim();

      result = result.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(term);

        const priceMatch = p.price.toString().toLowerCase().includes(term);

        return nameMatch || priceMatch;
      });
    }

    if (sort === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, sort]);

  return {
    products: filtered,
    loading,
    createProduct,
    RemoveProduct,
    editProduct,
    search,
    setSearch,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sort,
    setSort,
  };
}
