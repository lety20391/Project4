import { productEntity } from '../productEntity/productEntity';
export class OrderDetail {
  ODetailID: number;
  Qty: number;
  OrderDate: string;
  Status: boolean;
  OrderID: number;
  productEntity: productEntity;

}
