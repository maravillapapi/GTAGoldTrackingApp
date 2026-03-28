import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';

const Profile: React.FC = () => {
  const { role, setRole } = useAppContext();

  return (
    <>
      <header className="bg-[#131313] text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <h1 className="text-xl tracking-tight">Contrôle d'Accès</h1>
          <Icon name="person" className="text-on-surface-variant" />
        </div>
      </header>

      <main className="px-6 mt-4 space-y-6 pb-32">
        <section className="bg-surface-container-low p-6 rounded-2xl border border-outline/10 text-center">
          <div className="w-20 h-20 rounded-full bg-surface-container-highest mx-auto mb-4 flex items-center justify-center border-4 border-primary">
            <Icon name="account_circle" className="text-4xl text-primary" />
          </div>
          <h2 className="font-headline text-lg font-bold">Architecte XAU</h2>
          <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-1">Système Authentifié</p>
        </section>

        <section className="space-y-4">
          <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant">Simulateur de Rôle</h3>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Sélectionnez un rôle actif pour tester les contraintes du système.</p>
          
          <div className="flex flex-col gap-3">
            {(['ADMIN', 'SUPERVISOR', 'OBSERVER'] as const).map(r => (
              <button 
                key={r}
                onClick={() => setRole(r)}
                className={`p-4 rounded-xl flex items-center justify-between border-2 transition-colors ${role === r ? 'border-primary bg-primary/10 text-primary' : 'border-outline/10 bg-surface-container-highest text-on-surface hover:border-outline/30'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon name={r === 'ADMIN' ? 'shield' : r === 'SUPERVISOR' ? 'engineering' : 'visibility'} className={role === r ? 'text-primary' : 'text-on-surface-variant'} />
                  <span className="font-headline font-bold uppercase tracking-widest text-sm pt-1">
                    {r === 'ADMIN' ? 'ADMIN' : r === 'SUPERVISOR' ? 'SUPERVISEUR' : 'OBSERVATEUR'}
                  </span>
                </div>
                {role === r && <Icon name="check_circle" className="text-primary" />}
              </button>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
