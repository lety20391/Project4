import {serviceEntity} from '../serviceEntity/serviceEntity';
import {BookingMasterEntity} from './BookingMasterEntity';
export class BookingDetailEntity {
  bDetailID: number;
  bookingDate: string;
  bdstatus : boolean;
  service_bookingID: BookingMasterEntity;
  service_serID: serviceEntity;
}
