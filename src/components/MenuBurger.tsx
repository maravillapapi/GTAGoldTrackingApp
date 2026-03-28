import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from './Icon';

const MenuBurger: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen, role } = useAppContext();

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  if (!isMenuOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] opacity-100 transition-opacity"
        onClick={() => setIsMenuOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed top-0 left-0 h-[100dvh] w-4/5 max-w-sm bg-background z-[70] shadow-[4px_0_24px_rgba(0,0,0,0.5)] flex flex-col border-r border-outline-variant/10 animate-[slideIn_0.2s_ease-out]">
        <style>{`
          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest">
          <div className="flex flex-col">
            <span className="font-headline font-black text-xl text-primary tracking-tighter uppercase">Sovereign Vein</span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Menu Principal</span>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="text-on-surface-variant hover:text-error transition-colors p-2 -mr-2 bg-surface-container-low rounded-full">
            <Icon name="close" />
          </button>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-2 px-4 overflow-y-auto">
          <NavLink 
            to="/inventory" 
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => `flex items-center gap-4 p-4 rounded-2xl transition-all ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface decoration-transparent border border-transparent'}`}
          >
            {({ isActive }) => (
              <>
                <Icon name="inventory_2" fill={isActive} />
                <span className="font-headline font-bold uppercase tracking-widest text-sm pt-1">Inventaire</span>
              </>
            )}
          </NavLink>

          <NavLink 
            to="/expenses" 
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => `flex items-center gap-4 p-4 rounded-2xl transition-all ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface decoration-transparent border border-transparent'}`}
          >
            {({ isActive }) => (
              <>
                <Icon name="receipt_long" fill={isActive} />
                <span className="font-headline font-bold uppercase tracking-widest text-sm pt-1">Dépenses</span>
              </>
            )}
          </NavLink>

          <NavLink 
            to="/gold-stock" 
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => `flex items-center gap-4 p-4 rounded-2xl transition-all ${isActive ? 'metallic-gradient text-on-primary shadow-lg' : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface decoration-transparent border border-transparent'}`}
          >
            {({ isActive }) => (
              <>
                <Icon name="account_balance" fill={isActive} />
                <span className={`font-headline font-bold uppercase tracking-widest text-sm pt-1 ${isActive ? 'text-on-primary' : ''}`}>Stock d'Or</span>
              </>
            )}
          </NavLink>

          {role === 'ADMIN' && (
            <div className="mt-8">
              <span className="px-4 text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest mb-2 block">Administration</span>
              <NavLink 
                to="/settings" 
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `flex items-center gap-4 p-4 rounded-2xl transition-all ${isActive ? 'bg-surface-container-lowest text-on-surface border border-outline/20' : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface decoration-transparent border border-transparent'}`}
              >
                {({ isActive }) => (
                  <>
                    <Icon name="settings" fill={isActive} />
                    <span className="font-headline font-bold uppercase tracking-widest text-sm pt-1">Paramètres</span>
                  </>
                )}
              </NavLink>
            </div>
          )}
        </nav>

        <div className="p-6 border-t border-outline-variant/10 bg-surface-container-lowest flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center border border-outline-variant/20">
            <Icon name="person" className="text-on-surface-variant" />
          </div>
          <div className="flex flex-col">
             <span className="font-headline font-bold text-sm tracking-widest uppercase">{role === 'ADMIN' ? 'Administrateur' : role === 'SUPERVISOR' ? 'Superviseur' : 'Observateur'}</span>
             <span className="text-[10px] text-primary uppercase font-bold tracking-tighter">Session Active</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuBurger;
