import { IProductRepository } from "../repositories/IProductRepository";
import { Product } from "../entities/Product";
import { CreateProductDTO } from "../dto/CreateProductDTO";

export class CreateProductUseCase {
  constructor(private repository: IProductRepository) {}

  async execute(data: CreateProductDTO): Promise<Product> {
    if (!data.name) {
      throw new Error("Product name is required");
    }

    if (data.price <= 0) {
      throw new Error("Price must be greater than zero");
    }

    return this.repository.create(data);
  }
}
