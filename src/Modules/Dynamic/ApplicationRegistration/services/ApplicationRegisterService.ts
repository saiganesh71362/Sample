import axios from "axios";
import { IApplicationRegister } from "../models/IApplicationRegister";

export class ApplicationRegisterService {
  private static URL = "http://localhost:8085/ApplicationReg";

  //   http://localhost:8085/ApplicationReg/app

  public static applicationRegister(
    application: IApplicationRegister
  ): Promise<{ data: boolean }> {
    return axios.post(`${this.URL}/app`, application);
  }
  //   public static addUser(userObject: IUser): Promise<{ data: boolean }> {
  //     return axios.post(`${this.URL}/addUser`, userObject);
  //   }

  //   http://localhost:8085/ApplicationReg/allApplications

  public static getAllApplicationRegisters(): Promise<{
    data: IApplicationRegister[];
  }> {
    return axios.get(`${this.URL}/allApplications`);
  }
  public static deleteCitizen(appId: number): Promise<{ data: boolean }> {
    return axios.delete(`${this.URL}/delete/${appId}`);
  }

  public static getApplicationRegisterById(
    appId: number
  ): Promise<IApplicationRegister> {
    return axios
      .get(`${this.URL}/citizens/${appId}`)
      .then((response) => response.data);
  }

  public static updateCitizen(
    appId: number,
    application: IApplicationRegister
  ): Promise<{ data: IApplicationRegister }> {
    return axios.put(`${this.URL}/update/${appId}`, application);
  }
}
