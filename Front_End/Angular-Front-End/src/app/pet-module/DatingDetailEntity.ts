import {PetEntity} from './PetEntity';
import {DatingMasterEntity} from './DatingMasterEntity';
export class DatingDetailEntity {
  datingDetailID: number;
  datingDate: string;
  datingLocation: string;
  isAccepted: boolean;
  specialStatus: number;
  isNewNotification: boolean;
  petRequestEntity: PetEntity;
  petRecieveEntity: PetEntity;
  datingMasterEntity: DatingMasterEntity;
}
