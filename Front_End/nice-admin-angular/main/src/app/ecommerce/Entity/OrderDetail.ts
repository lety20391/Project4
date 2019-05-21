
import {OrderMaster} from './OrderMaster';
import { ProductEntity } from './ProductEntity';
export class OrderDetail {
  ODetailID: number;
  qty: number;
  orderDate: string;
  status: boolean;
  productEntity: ProductEntity;
  orderMasterEntity: OrderMaster;
  productImg: string;
  productInfo: string;
  productPrice: number;
  totalPrice: number;
}
