import { IProductRepository } from "../repositories/IProductRepository";
import { Product } from "../entities/Product";

export class GetProductsUseCase {
  constructor(private repository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.repository.getAll();
  }
}
