
import {OrderMaster} from './OrderMaster';
import { ProductEntity } from './ProductEntity';
export class OrderDetail {
  oDetailID: number;
  qty: number;
  orderDate: string;
  status: boolean;
  productEntity: ProductEntity;
  orderMasterEntity: OrderMaster;
}
