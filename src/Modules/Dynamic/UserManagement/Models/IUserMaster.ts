export interface IUserMaster {
  userId: number;

  fullName: string;

  email: string;

  mobileNumber: number;

  gender: string;

  dateOfBirth?: string;

  ssn: number;

  password?: string;

  accountStatus: string;

  createdDate?: string;

  updatedDate?: string;

  createdBy?: string;

  updatedBy?: string;
}
