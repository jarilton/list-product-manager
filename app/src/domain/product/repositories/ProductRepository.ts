import axios from "axios";
import { IProductRepository } from "./IProductRepository";
import { Product } from "../entities/Product";
import { CreateProductDTO } from "../dto/CreateProductDTO";

export class ProductRepository implements IProductRepository {
  async getAll(): Promise<Product[]> {
    const response = await axios.get("/products");
    console.log("Fetched products:", response.data);
    return response.data;
  }

  async create(data: CreateProductDTO): Promise<Product> {
    const response = await axios.post("/products", data);
    console.log("Created product:", response.data);
    return response.data;
  }
}
