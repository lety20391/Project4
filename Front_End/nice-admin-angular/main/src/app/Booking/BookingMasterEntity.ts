import {UserEntity} from '../component/user/UserEntity';
import {BookingDetailEntity} from './BookingDetailEntity';
export class BookingMasterEntity {
  bookingID: number;
  creDate: string;
  bmStatus: boolean;
  userEntity: UserEntity;
}
