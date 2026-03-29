import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from './Icon';

const TABS = [
  { to: '/',           end: true,  icon: 'home',                  label: 'Accueil'      },
  { to: '/production', end: false, icon: 'precision_manufacturing',label: 'Production'   },
  { to: '/sales',      end: false, icon: 'sell',                   label: 'Ventes'       },
  { to: '/incidents',  end: false, icon: 'report_problem',         label: 'Incidents'    },
  { to: '/stats',      end: false, icon: 'query_stats',            label: 'Statistiques' },
] as const;

const NavigationTabBar: React.FC = () => {
  const [lastTouched, setLastTouched] = useState<string | null>(null);

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-end px-2 pb-5 pt-2 bg-surface/80 backdrop-blur-2xl rounded-t-[28px] shadow-[0_-1px_0_rgba(255,255,255,0.05)] dark:shadow-[0_-1px_0_rgba(255,255,255,0.04)] border-t border-outline-variant/10">
      {TABS.map(({ to, end, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={() => setLastTouched(to)}
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-end gap-1 min-w-[52px] px-3 py-1.5 rounded-2xl
             transition-all duration-200 ease-out select-none
             ${isActive
               ? 'text-primary'
               : 'text-on-surface-variant/50 hover:text-on-surface-variant'
             }`
          }
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {({ isActive }) => (
            <>
              {/* Pill background for active tab */}
              {isActive && (
                <span className="absolute inset-0 bg-primary/10 rounded-2xl fade-in pointer-events-none" />
              )}

              {/* Icon with bounce on activate */}
              <span
                className={`relative z-10 transition-transform duration-200 ${
                  isActive && lastTouched === to ? 'tab-active-bounce' : ''
                }`}
              >
                <Icon
                  name={icon}
                  fill={isActive}
                  className={`text-[22px] transition-all duration-200 ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`}
                />
              </span>

              {/* Label */}
              <span
                className={`relative z-10 font-body text-[9px] font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
                }`}
              >
                {label}
              </span>

              {/* Active dot indicator */}
              {!isActive && (
                <span className="w-1 h-1 rounded-full bg-on-surface-variant/20 mt-0.5" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavigationTabBar;
