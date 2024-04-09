import axios from "axios";
import { IUser } from "../Models/IUsers";
import { IActiveAccounts } from "../Models/IActiveAccount";
// import { IUserMaster } from "../Models/IUserMaster";
import { ILogin } from "../Models/ILogin";
import { IUserMaster } from "../Models/IUserMaster";

export class UserManagementService {
  private static URL = "http://localhost:8084/userManagement";

  //   http://localhost:8084/userManagement/getAllUsers

  public static getAllUsers(): Promise<{ data: IUserMaster[] }> {
    return axios.get(`${this.URL}/getAllUsers`);
  }

  //   http://localhost:8084/userManagement/users/1
  public static getUserById(userId: number): Promise<{ data: IUser }> {
    return axios.get(`${this.URL}/users/${userId}`);
  }
  //   http://localhost:8084/userManagement/users/1
  public static deleteUserById(userId: number): Promise<{ data: boolean }> {
    return axios.delete(`${this.URL}/users/${userId}`);
  }
  //   http://localhost:8084/userManagement/addUser
  public static addUser(userObject: IUser): Promise<{ data: boolean }> {
    return axios.post(`${this.URL}/addUser`, userObject);
  }
  //   http://localhost:8084/userManagement/activatedAccount
  public static activateAccount(
    userAcObj: IActiveAccounts
  ): Promise<{ data: boolean }> {
    return axios.post(`${this.URL}/activatedAccount`, userAcObj);
  }

  public static UserLogin(loginObject: ILogin): Promise<{ data: string }> {
    return axios.post(`${this.URL}/login`, loginObject);
  }

  public static forgotPwd(email: string): Promise<{ data: string }> {
    return axios.post(`${this.URL}/forgotpwd/${email}`);
  }
  public static updateUser(
    userId: number,
    userObject: IUser
  ): Promise<{ data: IUser }> {
    return axios.put(`${this.URL}/userUpdate/${userId}`, userObject);
  }

  public static statusChange(
    userId: number,
    activeStatus: string
  ): Promise<{ data: boolean }> {
    return axios.put(`${this.URL}/users/${userId}/${activeStatus}`);
  }
}
