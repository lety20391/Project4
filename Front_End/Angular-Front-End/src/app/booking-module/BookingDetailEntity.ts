import {serviceEntity} from '../serviceEntity/serviceEntity';
import {BookingMasterEntity} from './BookingMasterEntity';
import {UserEntity} from '../UserEntity/UserEntity'
export class BookingDetailEntity {
  bDetailID: number;
  bookingDate: string;
  bdstatus : boolean;
  message: string;
  bookingMasterEntity: BookingMasterEntity;
  serviceEntity: serviceEntity;
}
