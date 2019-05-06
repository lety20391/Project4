import { productEntity } from '../productEntity/productEntity';
import {OrderMaster} from './OrderMaster';
export class OrderDetail {
  oDetailID: number;
  qty: number;
  orderDate: string;
  status: boolean;
  productEntity: productEntity;
  orderMaster: OrderMaster;
}
