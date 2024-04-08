export interface IPlans {
  planId?: number;
  planName: string;
  planStartDate: string;
  planEndDate: string;
  planCatagiryId: number;
  activeSwitch?: string | null;
  createdBy?: string;
  updatedBy?: string;
  cerateDate?: string;
  updateDate?: string;
}

// interface IPlans {
//   planName: string;
//   planStartDate: string;
//   planEndDate: string;
//   planCategoryId: number;
// }

// planId	[...]
// planName	[...]
// planStartDate	[...]
// planEndDate	[...]
// planCatagiryId	[...]
// activeSwitch	[...]
// createdBy	[...]
// updateBy	[...]
// cerateDate	[...]
// updateDate	[...]
// }
