import { UserEntity } from "./UserEntity";
export class DatingMasterEntity {
  datingMasterID: number;
  userID: number;
  creDate: string;
  locat: string;
  status: boolean;
  userEntity: UserEntity;
}