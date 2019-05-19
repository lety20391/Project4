
import {BookingDetailEntity} from './BookingDetailEntity';
import { UserEntity } from '../ecommerce/Entity/UserEntity';
export class BookingMasterEntity {
  bookingID: number;
  creDate: string;
  bmStatus: boolean;
  userEntity: UserEntity;
}
