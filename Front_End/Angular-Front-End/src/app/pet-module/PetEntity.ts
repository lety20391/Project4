import {UserEntity} from '../UserEntity/UserEntity';
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
  petListImage: string[];
}
