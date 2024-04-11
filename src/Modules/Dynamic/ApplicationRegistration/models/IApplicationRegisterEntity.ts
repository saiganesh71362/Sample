export interface IApplicationRegisterEntity {
  fullName: string;
  email: string;
  phNo: number; // Consider using string if non-numeric values are possible
  gender: string; // Use TypeScript enum or specific string literals for gender
  ssn: number; // Consider using string if non-numeric values are possible
  stateName: string; // Consider using TypeScript enum if the states have a finite set of values
  dob: string; // Consider using Date type if date-related operations are needed
  createdDate: string; // Consider using Date type if date-related operations are needed
  updatedDate: string; // Consider using Date type if date-related operations are needed
  createdBy: string;
  updatedBy: string;
  appId: number; // Consider using string if non-numeric values are possible
}
