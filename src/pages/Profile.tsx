import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { role, isDark, toggleDark } = useAppContext();
  const navigate = useNavigate();

  const isAdmin = role === 'ADMIN';

  return (
    <div className="bg-background min-h-screen text-on-surface font-body pb-32">

      {/* Header */}
      <header className="bg-surface/90 font-headline font-bold uppercase sticky top-0 z-50 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex justify-between items-center w-full px-5 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-on-surface-variant hover:text-primary transition-colors">
              <Icon name="arrow_back_ios_new" className="text-base" />
            </button>
            <h1 className="text-sm tracking-[0.15em] text-on-surface">Profil Exécutif</h1>
          </div>
          <button onClick={() => navigate('/settings')} className="text-on-surface-variant hover:text-primary transition-colors">
            <Icon name="settings" className="text-xl" />
          </button>
        </div>
      </header>

      <main className="px-5 pt-6 max-w-lg mx-auto md:max-w-3xl">

        {/* Avatar + Identity */}
        <div className="flex flex-col items-center mb-8">
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-surface-container-high border-4 border-primary/60 overflow-hidden flex items-center justify-center">
              <Icon name="person" className="text-on-surface-variant text-5xl" />
            </div>
            {isAdmin && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap">
                ADMIN
              </span>
            )}
          </div>

          <h2 className="font-headline text-2xl font-black text-on-surface tracking-tight">Marcus Thorne</h2>
          <p className="text-[11px] text-on-surface-variant uppercase tracking-widest mt-1">Administrateur</p>

          {/* Tags */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center gap-1.5 bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant/10">
              <Icon name="location_on" className="text-primary text-[11px]" />
              <span className="text-[9px] font-bold text-on-surface uppercase tracking-wider">Aurum-7 Opérations</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant/10">
              <Icon name="badge" className="text-primary text-[11px]" />
              <span className="text-[9px] font-bold text-on-surface uppercase tracking-wider">EMP-9001</span>
            </div>
          </div>

          <button className="mt-5 border border-outline-variant/30 text-on-surface px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-surface-container transition-colors w-full max-w-xs">
            Modifier le Profil
          </button>
        </div>

        {/* Section: Préférences */}
        <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant mb-3">Préférences</p>
        <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10 divide-y divide-outline-variant/10 mb-5">
          {/* Unités */}
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center">
                <Icon name="weight" className="text-primary text-sm" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-on-surface uppercase tracking-wider">Unités</p>
                <p className="text-[9px] text-on-surface-variant mt-0.5">Grammes / Kilogrammes</p>
              </div>
            </div>
            <Icon name="chevron_right" className="text-on-surface-variant" />
          </div>

          {/* Devise */}
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center">
                <Icon name="payments" className="text-primary text-sm" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-on-surface uppercase tracking-wider">Devise</p>
                <p className="text-[9px] text-on-surface-variant mt-0.5">USD ($)</p>
              </div>
            </div>
            <Icon name="chevron_right" className="text-on-surface-variant" />
          </div>

          {/* Thème */}
          <div className="flex items-center justify-between px-4 py-4" onClick={toggleDark}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center">
                <Icon name="dark_mode" className="text-primary text-sm" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-on-surface uppercase tracking-wider">Thème</p>
                <p className="text-[9px] text-on-surface-variant mt-0.5">{isDark ? 'Mode Sombre Actif' : 'Mode Clair Actif'}</p>
              </div>
            </div>
            {/* Toggle */}
            <div className={`w-12 h-6 rounded-full p-1 transition-colors flex cursor-pointer ${isDark ? 'bg-primary justify-end' : 'bg-surface-container-highest justify-start'}`}>
              <div className="bg-white w-4 h-4 rounded-full shadow-md transition-all"></div>
            </div>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center">
                <Icon name="notifications_active" className="text-primary text-sm" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-on-surface uppercase tracking-wider">Notifications</p>
                <p className="text-[9px] text-on-surface-variant mt-0.5">Alertes en temps réel</p>
              </div>
            </div>
            {/* Toggle ON */}
            <div className="w-12 h-6 rounded-full p-1 bg-primary flex justify-end cursor-pointer">
              <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
            </div>
          </div>
        </div>

        {/* Section: Paramètres Opérationnels */}
        <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant mb-3">Paramètres Opérationnels</p>
        <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10 divide-y divide-outline-variant/10 mb-5">
          {[
            { icon: 'account_tree', label: 'Catégories de Dépenses' },
            { icon: 'report_problem', label: "Types d'Incidents" },
            { icon: 'rule', label: 'Règles de Validation' },
            { icon: 'settings_input_component', label: 'Configuration du Site' },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between px-4 py-4 hover:bg-surface-container transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center">
                  <Icon name={item.icon} className="text-on-surface-variant text-sm" />
                </div>
                <p className="text-[11px] font-bold text-on-surface uppercase tracking-wider">{item.label}</p>
              </div>
              <Icon name="chevron_right" className="text-on-surface-variant" />
            </div>
          ))}
        </div>

        {/* Section: Admin Management (admin only) */}
        {isAdmin && (
          <>
            <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-3">Administration</p>
            <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-primary/20 divide-y divide-outline-variant/10 mb-5">
              {[
                { icon: 'group', label: 'Gestion des Utilisateurs' },
                { icon: 'admin_panel_settings', label: 'Permissions & Rôles' },
                { icon: 'hub', label: 'Affectations de Sites' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between px-4 py-4 hover:bg-surface-container transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center">
                      <Icon name={item.icon} className="text-primary text-sm" />
                    </div>
                    <p className="text-[11px] font-bold text-on-surface uppercase tracking-wider">{item.label}</p>
                  </div>
                  <Icon name="chevron_right" className="text-on-surface-variant" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Sign Out */}
        <button className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-error/30 text-error font-headline font-bold uppercase tracking-widest text-sm hover:bg-error/10 transition-colors mt-2 mb-8">
          <Icon name="logout" className="text-lg" />
          Déconnexion
        </button>

      </main>
    </div>
  );
};

export default Profile;
