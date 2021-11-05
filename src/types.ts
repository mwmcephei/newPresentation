export type Risk = {
  risk: string;
  description: string;
  criticality: string;
  migration: string;
  resolutionDate: string;
}

export type KPI = {
  title: string;
  target: number;
  actuals: number;
  baseline: number;
  plan1: number;
  plan2: number;
  plan3: number;
  plan4: number;
}

export type Measure = {
  _id: string;
  actuals: number;
  approved: number;
  artefact: 0 | 1 | 2;
  artefacts: Artefact[];
  budget: 0 | 1 | 2;
  focusArea: string;
  id: number;
  kpiName: string,
  kpiProgress: number;
  lineOrgSponsor: string;
  measureLead: string;
  measureSponsor: string;
  name: string;
  risk: 0 | 1 | 2;
  solutionManager: string;
  spent: number;
  target: number;
  title: string;
  description: string;
  time: string;
  risks: Risk[];
  kpiData: KPI;
  monthlySpendings: number[];
  lastUpdate: string;
  budgetDetail: {
    totalApprovedBudget: number;
    contractBudget: number;
    spentBudget: number;
    invoicedBudget: number;
    forecastBudget: number;
  }
}

export type Artefact = {
  _id: string;
  id: number;
  description: string;
  progress: number;
  budget: string;
  achievement: string;
  work: string;
}

export type Team = {
  lead: string;
  measureSponsor: string;
  lineOrgSponsor: string;
  solutionManager: string;
  pmo: boolean;
}

export type DividedName = {
  firstName: string;
  lastName: string;
}

export type StatusProps = {
  artefacts: number;
  budget: number;
  risks: number;
}

export type PastBudget = {
  title: string;
  name: string;
  budget: number;
  category: string;
  year: number;
}

export interface DashboardCircleDiagram_PropType {
  title: String;
  green: number;
  yellow: number;
  red: number;
  labels: string[];
  isKPIChart: boolean;
  date: string | '';
};

export interface DashboardCircleDiagram_PropTypeAlternative {
  title: String;
  green: number;
  yellow: number;
  labels: string[];
};

export interface OldMeasuresCategoryAmountAndBudget {
  categoryName: string;
  amount: number;
  budget: number;
}