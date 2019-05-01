import { CategoryEntity  } from '../category/CategoryEntity';
export class ProductEntity{
  ProID: number;
  ProName: string;
  ProDes: string;
  ProPrice: number;
  ProColor: string;
  ProImage: string;
  Status: boolean;
  cateEntity: CategoryEntity;
}
