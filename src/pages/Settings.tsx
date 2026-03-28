import React, { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { role } = useAppContext();
  const navigate = useNavigate();

  // Local state for theme toggle. 
  // In a real app, this affects context and persists to localStorage.
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  // Toggle dark class on HTML element immediately when changed
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (role !== 'ADMIN') {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center px-8">
            <Icon name="admin_panel_settings" className="text-error text-6xl mb-4 opacity-50" />
             <h2 className="font-headline text-2xl font-black text-error uppercase tracking-widest mb-2">Accès Restreint</h2>
             <p className="text-sm text-on-surface-variant uppercase tracking-widest">Cette section est réservée aux Administrateurs du domaine.</p>
             <button onClick={() => navigate('/')} className="mt-8 border border-outline/20 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-on-surface hover:bg-surface-container transition-colors">
                 Retour Accueil
             </button>
        </div>
    );
  }

  return (
    <>
      <header className="bg-surface text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md border-b border-outline/10">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-on-surface-variant hover:text-on-surface transition-colors pb-1">
              <Icon name="arrow_back_ios_new" />
            </button>
            <h1 className="text-xl tracking-tight">Paramètres Système</h1>
          </div>
          <Icon name="settings" className="text-on-surface-variant" />
        </div>
      </header>

      <main className="px-6 mt-6 pb-32 space-y-6 max-w-lg mx-auto md:max-w-3xl">
        
        {/* Apparence */}
        <section className="bg-surface-container-low border border-outline-variant/20 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-outline-variant/20 bg-surface-container-highest flex items-center gap-3">
                <Icon name="palette" className="text-primary text-sm" />
                <h2 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Apparence</h2>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-surface transition-colors cursor-pointer" onClick={() => setIsDarkMode(!isDarkMode)}>
                <div className="flex flex-col">
                    <span className="font-headline font-bold text-sm text-on-surface">Thème Sombre Principal</span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">"Gilded Oversight" Dark Mode</span>
                </div>
                {/* Custom Toggle Switch */}
                <div className={`w-12 h-6 rounded-full p-1 transition-colors flex ${isDarkMode ? 'bg-primary justify-end' : 'bg-surface-container-highest justify-start'}`}>
                    <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
                </div>
            </div>
        </section>

        {/* Gestion des Accès (Mock) */}
        <section className="bg-surface-container-low border border-outline-variant/20 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-outline-variant/20 bg-surface-container-highest flex items-center gap-3">
                <Icon name="security" className="text-error text-sm" />
                <h2 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Contrôle des Accès</h2>
            </div>
            <div className="p-4 flex items-center justify-between border-b border-outline-variant/20 hover:bg-surface transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                    <Icon name="group" className="text-on-surface-variant" />
                    <span className="font-headline font-bold text-sm text-on-surface uppercase tracking-widest">Gestion des Équipes</span>
                </div>
                <Icon name="chevron_right" className="text-on-surface-variant" />
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-surface transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                    <Icon name="shield" className="text-on-surface-variant" />
                    <span className="font-headline font-bold text-sm text-on-surface uppercase tracking-widest">Logs de Sécurité Audit</span>
                </div>
                <Icon name="chevron_right" className="text-on-surface-variant" />
            </div>
        </section>

        {/* Base de données (Mock) */}
        <section className="bg-surface-container-low border border-outline-variant/20 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-outline-variant/20 bg-surface-container-highest flex items-center gap-3">
                <Icon name="database" className="text-blue-400 text-sm" />
                <h2 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Infrastructure</h2>
            </div>
            <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center bg-surface-container p-3 rounded-lg border border-outline-variant/20">
                     <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Statut Serveur</span>
                     <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-[#5CB85C] animate-pulse"></div>
                         <span className="text-[10px] font-bold text-[#5CB85C] uppercase tracking-widest">En Ligne</span>
                     </div>
                </div>
                <div className="flex justify-between items-center bg-surface-container p-3 rounded-lg border border-outline-variant/20">
                     <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Dernier Backup</span>
                     <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Il y a 2 heures</span>
                </div>
            </div>
        </section>

      </main>
    </>
  );
};

export default Settings;
