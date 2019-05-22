import {serviceEntity} from '../serviceEntity/serviceEntity';
import {BookingMasterEntity} from './BookingMasterEntity';
import {UserEntity} from '../UserEntity/UserEntity';
import {PetEntity} from '../pet-module/PetEntity';
export class BookingDetailEntity {
  bDetailID: number;
  bookingDate: string;
  bdstatus : boolean;
  message: string;
  petEntity: PetEntity;
  bookingMasterEntity: BookingMasterEntity;
  serviceEntity: serviceEntity;
}
