import {UserEntity} from '../UserEntity/UserEntity';
export class OrderMaster{
  orderID: number;
  creDate: string;
  shipDate: string;
  status: boolean;
  userEntity: UserEntity;
}
