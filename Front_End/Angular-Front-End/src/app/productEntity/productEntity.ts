import { CategoryEntity  } from '../shop-module/CategoryEntity';
export class productEntity{
  proID: number;
  proName: string;
  proDes: string;
  proPrice: number;
  proColor: string;
  proImage: string;
  status: boolean;
  cateEntity: CategoryEntity;
}
