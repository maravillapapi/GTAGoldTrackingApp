import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from './Icon';

const NavigationTabBar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#0E0E0E] rounded-t-[24px] shadow-[0_-4px_40px_rgba(0,0,0,0.4)] border-t border-outline-variant/10">
      <NavLink 
        to="/" 
        end 
        className={({ isActive }) => `flex flex-col items-center justify-center transition-all ${isActive ? 'text-primary bg-surface-container-low rounded-xl px-4 py-2' : 'text-on-surface-variant opacity-60 hover:text-primary'} `}
      >
        {({ isActive }) => (
          <>
            <Icon name="home" fill={isActive} />
            <span className="font-body text-[10px] font-semibold uppercase tracking-wider mt-1">Accueil</span>
          </>
        )}
      </NavLink>

      <NavLink 
        to="/production" 
        className={({ isActive }) => `flex flex-col items-center justify-center transition-all ${isActive ? 'text-primary bg-surface-container-low rounded-xl px-4 py-2' : 'text-on-surface-variant opacity-60 hover:text-primary'} `}
      >
        {({ isActive }) => (
          <>
            <Icon name="precision_manufacturing" fill={isActive} />
            <span className="font-body text-[10px] font-semibold uppercase tracking-wider mt-1">Production</span>
          </>
        )}
      </NavLink>

      <NavLink 
        to="/sales" 
        className={({ isActive }) => `flex flex-col items-center justify-center transition-all ${isActive ? 'text-primary bg-surface-container-low rounded-xl px-4 py-2' : 'text-on-surface-variant opacity-60 hover:text-primary'} `}
      >
        {({ isActive }) => (
          <>
            <Icon name="sell" fill={isActive} />
            <span className="font-body text-[10px] font-semibold uppercase tracking-wider mt-1">Ventes</span>
          </>
        )}
      </NavLink>

      <NavLink 
        to="/incidents" 
        className={({ isActive }) => `flex flex-col items-center justify-center transition-all ${isActive ? 'text-primary bg-surface-container-low rounded-xl px-4 py-2' : 'text-on-surface-variant opacity-60 hover:text-primary'} `}
      >
        {({ isActive }) => (
          <>
            <Icon name="report_problem" fill={isActive} />
            <span className="font-body text-[10px] font-semibold uppercase tracking-wider mt-1">Incidents</span>
          </>
        )}
      </NavLink>

      <NavLink 
        to="/stats" 
        className={({ isActive }) => `flex flex-col items-center justify-center transition-all ${isActive ? 'text-primary bg-surface-container-low rounded-xl px-4 py-2' : 'text-on-surface-variant opacity-60 hover:text-primary'} `}
      >
        {({ isActive }) => (
          <>
            <Icon name="query_stats" fill={isActive} />
            <span className="font-body text-[10px] font-semibold uppercase tracking-wider mt-1">Statistiques</span>
          </>
        )}
      </NavLink>
    </nav>
  );
};

export default NavigationTabBar;
