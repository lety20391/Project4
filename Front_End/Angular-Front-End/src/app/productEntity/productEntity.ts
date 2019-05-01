import { CategoryEntity  } from '../shop-module/CategoryEntity';
export class productEntity{
  ProID: number;
  ProName: string;
  ProDes: string;
  ProPrice: number;
  ProColor: string;
  ProImage: string;
  Status: boolean;
  cateEntity: CategoryEntity;
}
