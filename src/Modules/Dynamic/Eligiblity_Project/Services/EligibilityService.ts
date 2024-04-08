import axios from "axios";
import { ISearchResponse } from "../Models/SearchResponse";
import { ISearchRequest } from "../Models/SearchRequest";

export class EligibilityService {
  private static URL = "http://localhost:8083/eligibility";
  public static getAllUniquePlans(): Promise<{ data: string[] }> {
    return axios.get(`${this.URL}/allPlans`);
  }

  public static getAllUniqueStatus(): Promise<{ data: string[] }> {
    return axios.get(`${this.URL}/allStatus`);
  }

  public static searchRecord(
    planOject: ISearchRequest
  ): Promise<{ data: ISearchResponse[] }> {
    return axios.post(`${this.URL}/search`, planOject);
  }
}
