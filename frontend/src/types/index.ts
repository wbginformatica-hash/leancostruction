export interface Enterprise {
  id: number;
  name: string;
}

export interface Activity {
  id: number;
  code: string;
  name: string;
  description: string;
  unit: string;
  productivity: number;
  duration: number;
  cost: number;
}

export interface Site {
  id: number;
  code: string;
  name: string;
  description: string;
  area: number;
  type: string;
}

export interface Package {
  id: number;
  code: string;
  name: string;
  description: string;
  activityIds: number[];
  siteIds: number[];
  startDate: string;
  endDate: string;
  status: string;
}

export interface ConsolidationPackage {
  id: number;
  packageName: string;
  workforce: string;
  status: 'pending' | 'approved' | 'rejected';
  progress: number;
  value: number;
  startDate: string;
  endDate: string;
  activities: {
    name: string;
    progress: number;
    value: number;
  }[];
}