import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Role, Equipment, ProductionLog, Incident, Expense, Sale } from '../data/mockData';
import { 
  initialEquipment, initialProduction, initialIncidents, initialExpenses, initialSales
} from '../data/mockData';

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isDark: boolean;
  toggleDark: () => void;
  
  equipment: Equipment[];
  production: ProductionLog[];
  incidents: Incident[];
  expenses: Expense[];
  sales: Sale[];
  
  // Actions
  addProduction: (log: Omit<ProductionLog, 'id' | 'status'>) => void;
  addIncident: (incident: Omit<Incident, 'id' | 'status'>) => void;
  addSale: (sale: Omit<Sale, 'id'>) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  
  // Computations
  currentStockGrams: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('ADMIN'); // Default to Admin for testing
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleDark = () => {
    setIsDark(prev => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };
  
  const [equipment] = useState<Equipment[]>(initialEquipment);
  const [production, setProduction] = useState<ProductionLog[]>(initialProduction);
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [sales, setSales] = useState<Sale[]>(initialSales);

  const currentStockGrams = 
    production.filter(p => p.status !== 'REJECTED').reduce((sum, p) => sum + p.amountGrams, 0) - 
    sales.reduce((sum, s) => sum + s.amountGrams, 0);

  const addProduction = (log: Omit<ProductionLog, 'id' | 'status'>) => {
    if (role === 'OBSERVER') return;
    const newLog: ProductionLog = { ...log, id: `p-${Date.now()}`, status: 'SUBMITTED' };
    setProduction([newLog, ...production]);
  };

  const addIncident = (inc: Omit<Incident, 'id' | 'status'>) => {
    if (role === 'OBSERVER') return;
    const newInc: Incident = { ...inc, id: `inc-${Date.now()}`, status: 'OPEN' };
    setIncidents([newInc, ...incidents]);
  };

  const addSale = (sale: Omit<Sale, 'id'>) => {
    if (role === 'OBSERVER') return;
    const newSale: Sale = { ...sale, id: `sale-${Date.now()}` };
    setSales([newSale, ...sales]);
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    if (role === 'OBSERVER') return;
    const newExpense: Expense = { ...expense, id: `exp-${Date.now()}` };
    setExpenses([newExpense, ...expenses]);
  };

  return (
    <AppContext.Provider value={{
      role, setRole,
      isMenuOpen, setIsMenuOpen,
      isDark, toggleDark,
      equipment, production, incidents, expenses, sales,
      addProduction, addIncident, addSale, addExpense,
      currentStockGrams
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
