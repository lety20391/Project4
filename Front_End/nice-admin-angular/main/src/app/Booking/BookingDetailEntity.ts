import {serviceEntity} from '../serviceEntity/serviceEntity';
import {BookingMasterEntity} from './BookingMasterEntity';
import { PetEntity} from '../ecommerce/list-pet/PetEntity';
export class BookingDetailEntity {
  bDetailID: number;
  bookingDate: string;
  bdstatus : boolean;
  message: string;
  petEntity: PetEntity;
  bookingMasterEntity: BookingMasterEntity;
  serviceEntity: serviceEntity;
}
