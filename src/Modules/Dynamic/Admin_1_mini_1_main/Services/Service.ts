import axios from "axios";
import { IPlans } from "../Models/IPlans";
import { IPlanCategory } from "../Models/IPlanCategory";
export class PlasnServices {
  private static URL = "http://localhost:8082/PlansMaster";
  // http://localhost:8082/PlansMaster/allMasterPlans

  public static getAllPlans(): Promise<{ data: IPlans[] }> {
    return axios.get(`${this.URL}/allMasterPlans`);
  }

  public static getPlanById(planId: number): Promise<{ data: IPlans }> {
    return axios.get(`${this.URL}/MasterPlans/${planId}`);
  }

  public static createNewPlan(newPlan: IPlans): Promise<{ data: boolean }> {
    return axios.post(`${this.URL}/addMasterPlan`, newPlan);
  }

  public static updatePlan(
    planId: number,
    planUpdate: IPlans
  ): Promise<{ data: boolean }> {
    return axios.put(`${this.URL}/updateMasterPlan/${planId}`, planUpdate);
  }

  public static deletePlan(planId: number): Promise<{ data: boolean }> {
    return axios.delete(`${this.URL}/MasterPlans/${planId}`);
  }

  public static getAllCategories(): Promise<{ data: IPlanCategory[] }> {
    return axios.get(`${this.URL}/allCategories`);
  }

  public static addCategory(
    newcategory: IPlanCategory
  ): Promise<{ data: boolean }> {
    return axios.post(`${this.URL}/addCategory`, newcategory);
  }

  // pending backend
  public static getCategoryByID(
    catId: number
  ): Promise<{ data: IPlanCategory }> {
    return axios.get(`${this.URL}/catageroybyid/${catId}`);
  }

  public static updateStatus(
    planId: number,
    status: string
  ): Promise<{ data: boolean }> {
    return axios.put(`${this.URL}/statusChange/${planId}/${status}`);
  }
}
