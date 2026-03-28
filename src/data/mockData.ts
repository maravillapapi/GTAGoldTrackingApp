export type Role = 'ADMIN' | 'SUPERVISOR' | 'OBSERVER';

export type EquipmentStatusPhysical = 'NEW' | 'GOOD' | 'FAIR' | 'BAD';
export type EquipmentStatusOperational = 'FUNCTIONAL' | 'BREAKDOWN' | 'MAINTENANCE' | 'INACTIVE';

export interface Equipment {
  id: string;
  name: string;
  type: string;
  physicalStatus: EquipmentStatusPhysical;
  operationalStatus: EquipmentStatusOperational;
  totalExpenses: number;
  condition: number;
  operatingCostPerHour: number;
}

export type ProductionStatus = 'SUBMITTED' | 'VALIDATED' | 'REJECTED';

export interface ProductionLog {
  id: string;
  date: string;
  amountGrams: number;
  status: ProductionStatus;
  notes?: string;
  siteLocation: string;
}

export type IncidentStatus = 'OPEN' | 'UNDER_REVIEW' | 'REVIEWED' | 'CLOSED';
export type IncidentSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Incident {
  id: string;
  date: string;
  equipmentId?: string;
  description: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  impactGrams?: number;
}

export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: string;
  description?: string;
  receiptImageUrl?: string;
  equipmentId?: string;
}

export type SaleStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export interface Sale {
  id: string;
  date: string;
  amountGrams: number;
  unitPrice: number;
  companyName: string;
  status: SaleStatus;
  notes?: string;
  receiptImageUrl?: string;
}

export const initialEquipment: Equipment[] = [
  {
    id: 'eq-1',
    name: 'Excavator Alpha-1',
    type: 'Heavy Machinery',
    physicalStatus: 'GOOD',
    operationalStatus: 'FUNCTIONAL',
    totalExpenses: 12500,
    condition: 0.85,
    operatingCostPerHour: 45,
  },
  {
    id: 'eq-2',
    name: 'Crusher Unit Beta',
    type: 'Processing',
    physicalStatus: 'FAIR',
    operationalStatus: 'MAINTENANCE',
    totalExpenses: 8400,
    condition: 0.40,
    operatingCostPerHour: 62.5,
  },
  {
    id: 'eq-3',
    name: 'Haul Truck 04',
    type: 'Transport',
    physicalStatus: 'BAD',
    operationalStatus: 'BREAKDOWN',
    totalExpenses: 15600,
    condition: 0.15,
    operatingCostPerHour: 35,
  }
];

export const initialProduction: ProductionLog[] = [
  { id: 'p-1', date: '2026-03-27', amountGrams: 8420, status: 'SUBMITTED', siteLocation: 'Alpha-1' },
  { id: 'p-2', date: '2026-03-26', amountGrams: 9150, status: 'VALIDATED', siteLocation: 'Alpha-2' },
  { id: 'p-3', date: '2026-03-25', amountGrams: 7800, status: 'VALIDATED', siteLocation: 'Beta-1' },
];

export const initialIncidents: Incident[] = [
  {
    id: 'inc-1',
    date: '2026-03-27',
    equipmentId: 'eq-3',
    description: 'Engine failure on incline',
    status: 'OPEN',
    severity: 'HIGH',
    impactGrams: 150,
  },
];

export const initialSales: Sale[] = [
  {
    id: 'sale-1',
    date: '2026-10-28',
    amountGrams: 850,
    unitPrice: 65.00,
    companyName: 'Aurum Métaux Précieux',
    status: 'COMPLETED',
  },
  {
    id: 'sale-2',
    date: '2026-10-26',
    amountGrams: 1200,
    unitPrice: 65.00,
    companyName: 'Corp. Raffineurs Mondiaux',
    status: 'PENDING',
  },
  {
    id: 'sale-3',
    date: '2026-10-22',
    amountGrams: 500,
    unitPrice: 64.60,
    companyName: 'Swiss Heritage Mint',
    status: 'COMPLETED',
  },
];

export const initialExpenses: Expense[] = [
  {
    id: 'exp-1',
    date: '2026-03-25',
    amount: 3200,
    category: 'Fuel',
  },
  {
    id: 'exp-2',
    date: '2026-03-26',
    amount: 1500,
    category: 'Parts',
    equipmentId: 'eq-2',
  }
];
