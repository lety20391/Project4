
import { DatingDetailEntity } from "./DatingDetailEntity";
import { UserEntity } from "./UserEntity";

// import {UserEntity} from '../UserEntity/UserEntity';
// import {DatingDetailEntity} from './DatingDetailEntity';
export class PetEntity {
  petID: number;
  petName: string;
  petBreed: string;
  petImage: string;
  petStatus: boolean;
  petPrice: number;
  petDOB: string;
  petDating: boolean;
  petStory: string;
  petGender: string;
  userEntity: UserEntity;
  petListImage: string[] = [];
  listDatingDetail: DatingDetailEntity[] = [];
  totalDatingRequestNeedAccept: number;
  totalNewDatingAnswer: number;
  listAnswerDetail: DatingDetailEntity[] = [];
  status: boolean;
  petSingleImage: string;
}
