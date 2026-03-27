import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from './Icon';

const NavigationTabBar: React.FC<{ hidden?: boolean }> = ({ hidden = false }) => {
  if (hidden) return null;
  
  const tabs = [
    { name: 'Home', path: '/', icon: 'home_storage' },
    { name: 'Production', path: '/production', icon: 'precision_manufacturing' },
    { name: 'Sales Dashboard', path: '/sales', icon: 'sell' },
    { name: 'Stats', path: '/stats', icon: 'query_stats' },
    { name: 'Profile', path: '/profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full md:w-28 md:h-screen md:top-0 md:rounded-none z-50 flex md:flex-col justify-around md:justify-start md:gap-8 items-center px-4 pb-6 pt-3 md:pt-8 md:border-r bg-[#0E0E0E] rounded-t-[24px] shadow-[0_-4px_40px_rgba(0,0,0,0.4)] md:shadow-[4px_0_40px_rgba(0,0,0,0.4)] border-t md:border-t-0 border-[#353534]/15">
      {/* Decorative logo area for desktop side-nav */}
      <div className="hidden md:flex mb-12 flex-col items-center">
        <Icon name="diamond" className="text-primary text-3xl mb-1" />
      </div>
      
      {tabs.map((tab) => (
        <NavLink
          key={tab.name}
          to={tab.path}
          className={({ isActive }) => 
            `flex flex-col items-center justify-center rounded-xl px-4 py-2 md:py-4 md:w-full transition-all ${
              isActive 
                ? 'text-[#F2CA50] bg-[#1C1B1B] scale-110 md:scale-100 md:border-r-4 border-[#F2CA50]' 
                : 'text-[#D0C5AF] opacity-60 hover:text-[#F2CA50]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon name={tab.icon} fill={isActive} />
              <span className="font-body text-[10px] md:text-xs font-semibold uppercase tracking-wider mt-1 text-center leading-tight">
                {tab.name.includes(' ') ? <>{tab.name.split(' ')[0]}<br className="hidden md:block"/>{tab.name.split(' ')[1]}</> : tab.name}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavigationTabBar;
