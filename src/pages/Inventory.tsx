import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

const Inventory: React.FC = () => {
  const { equipment } = useAppContext();

  return (
    <>
      <header className="bg-[#131313] text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <h1 className="text-xl tracking-tight">Supervision de l'Inventaire</h1>
          <Icon name="search" className="text-on-surface-variant" />
        </div>
      </header>

      <main className="px-6 mt-4 space-y-6 pb-32">
        <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-2xl mb-4">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest pt-1">Tous les Actifs</span>
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase pt-1.5 inline-block w-max mt-2">{equipment.length} Actifs</span>
          </div>
          {/* Quick action for non-observers */}
          {useAppContext().role !== 'OBSERVER' && (
            <Link to="/inventory/add" className="bg-surface-container-highest p-3 rounded-xl flex items-center gap-2 hover:bg-surface-bright transition-colors text-primary font-headline text-xs font-bold uppercase tracking-widest decoration-transparent cursor-pointer border border-primary/20">
              <Icon name="add" />
              Ajouter Actif
            </Link>
          )}
        </div>

        <section className="space-y-4">
          {equipment.map(eq => (
            <div key={eq.id} className="bg-surface-container-low p-4 rounded-2xl border-l-4 overflow-hidden relative" style={{ borderColor: eq.operationalStatus === 'FUNCTIONAL' ? 'var(--primary)' : eq.operationalStatus === 'MAINTENANCE' ? 'var(--error)' : 'var(--outline)' }}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline font-bold text-lg pt-1">{eq.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-surface-container-highest px-2 py-0.5 rounded-sm uppercase tracking-wider text-on-surface-variant font-bold">{eq.type === 'HEAVY_MACHINERY' ? 'MACHINERIE LOURDE' : 'DIVERS'}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider font-bold ${eq.operationalStatus === 'FUNCTIONAL' ? 'bg-primary/20 text-primary' : 'bg-error/20 text-error'}`}>
                      {eq.operationalStatus === 'FUNCTIONAL' ? 'FONCTIONNEL' : 'MAINTENANCE'}
                    </span>
                  </div>
                </div>
                <Icon name={eq.type === 'HEAVY_MACHINERY' ? 'directions_car' : 'precision_manufacturing'} className="text-on-surface-variant/30 text-4xl pt-1" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Coût Opérationnel</p>
                  <p className="font-headline text-sm font-bold">${eq.operatingCostPerHour}/h</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">État</p>
                  <div className="w-full h-1.5 bg-surface-container-highest rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${eq.condition * 100}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-outline/10 flex justify-end">
                <Link to={`/inventory/${eq.id}`} className="text-xs font-bold text-primary uppercase tracking-wider decoration-transparent hover:text-primary-fixed pt-1">
                  Voir Détails
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default Inventory;
