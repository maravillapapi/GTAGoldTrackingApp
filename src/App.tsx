import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';

import NavigationTabBar from './components/NavigationTabBar';
import Home from './pages/Home';
import Production from './pages/Production';
import Inventory from './pages/Inventory';
import Stats from './pages/Stats';
import Profile from './pages/Profile';
import EquipmentDetail from './pages/EquipmentDetail';
import Incidents from './pages/Incidents';
import Sales from './pages/Sales';
import Expenses from './pages/Expenses';
import AddEquipment from './pages/AddEquipment';
import Audit from './pages/Audit';
import IncidentDetail from './pages/IncidentDetail';
import ProductionCalendar from './pages/ProductionCalendar';
import ProductionDayDetail from './pages/ProductionDayDetail';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto bg-background min-h-[100dvh] relative pb-32 md:pb-0 md:pl-28 md:pt-4">
      {children}
      <NavigationTabBar />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/production" element={<Production />} />
            <Route path="/production/calendar" element={<ProductionCalendar />} />
            <Route path="/production/:date" element={<ProductionDayDetail />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/add" element={<AddEquipment />} />
            <Route path="/inventory/:id" element={<EquipmentDetail />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/incidents/:id" element={<IncidentDetail />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
