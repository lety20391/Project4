import {UserEntity} from '../UserEntity/UserEntity';
import {BookingDetailEntity} from './BookingDetailEntity';
export class BookingMasterEntity {
  bookingID: number;
  creDate: string;
  bmStatus: boolean;
  bm_serID: UserEntity;
}
