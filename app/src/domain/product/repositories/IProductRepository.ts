import { CreateProductDTO } from "../dto/CreateProductDTO";
import { Product } from "../entities/Product";

export interface IProductRepository {
  getAll(): Promise<Product[]>;
  create(data: CreateProductDTO): Promise<Product>;
}
