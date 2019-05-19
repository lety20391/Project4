import { CategoryEntity } from "./CategoryEntity";

export class ProductEntity{
  proID: number;
  proName: string;
  proDes: string;
  proPrice: number;
  proColor: string;
  proImage: string;
  status: boolean;
  cateEntity: CategoryEntity;
  proListImage: string[];
}
