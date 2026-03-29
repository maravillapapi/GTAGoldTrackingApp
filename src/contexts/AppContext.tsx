import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Role, Equipment, ProductionLog, Incident, Expense, Sale } from '../data/mockData';
import { 
  initialEquipment, initialProduction, initialIncidents, initialExpenses, initialSales
} from '../data/mockData';

const STORAGE_KEYS = {
  THEME:      'sv-theme',
  PRODUCTION: 'sv-production',
  INCIDENTS:  'sv-incidents',
  EXPENSES:   'sv-expenses',
  SALES:      'sv-sales',
  EQUIPMENT:  'sv-equipment',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
}

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
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('sv-theme');
    // If no saved theme, default to Light (false)
    const prefersDark = saved === 'dark';
    // Apply immediate class
    document.documentElement.classList.toggle('dark', prefersDark);
    return prefersDark;
  });

  const toggleDark = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('sv-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // Sync with DOM
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);
  
  const [equipment]               = useState<Equipment[]>(   () => loadFromStorage(STORAGE_KEYS.EQUIPMENT,  initialEquipment));
  const [production, setProduction] = useState<ProductionLog[]>(() => loadFromStorage(STORAGE_KEYS.PRODUCTION, initialProduction));
  const [incidents,  setIncidents]  = useState<Incident[]>(    () => loadFromStorage(STORAGE_KEYS.INCIDENTS,  initialIncidents));
  const [expenses,   setExpenses]   = useState<Expense[]>(     () => loadFromStorage(STORAGE_KEYS.EXPENSES,   initialExpenses));
  const [sales,      setSales]      = useState<Sale[]>(         () => loadFromStorage(STORAGE_KEYS.SALES,      initialSales));

  // Persist to localStorage on every change
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PRODUCTION, JSON.stringify(production)); }, [production]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.INCIDENTS,  JSON.stringify(incidents));  }, [incidents]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.EXPENSES,   JSON.stringify(expenses));   }, [expenses]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SALES,      JSON.stringify(sales));      }, [sales]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.EQUIPMENT,  JSON.stringify(equipment));  }, [equipment]);

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
