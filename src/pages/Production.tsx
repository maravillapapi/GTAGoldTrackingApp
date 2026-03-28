import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { Link } from 'react-router-dom';

const Production: React.FC = () => {
  const { production, role } = useAppContext();

  return (
    <>
      <header className="bg-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md border-b border-outline/10">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <h1 className="text-xl tracking-tight text-on-surface">Registre de Production</h1>
          <Link to="/production/calendar" className="text-primary hover:text-primary-fixed transition-colors">
            <Icon name="calendar_month" className="text-2xl" />
          </Link>
        </div>
      </header>

      <main className="px-6 mt-6 space-y-8 pb-32">
        {/* History */}
        <section className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant">Registre Historique</h2>
            <Icon name="history" className="text-on-surface-variant" />
          </div>

          <div className="space-y-3">
            {[...production].reverse().map(prod => (
              <Link to={`/production/${prod.date.split('T')[0]}`} key={prod.id} className="bg-surface-container-low p-4 rounded-2xl flex justify-between items-center border-l-2 border-primary/50 hover:bg-surface-container-highest transition-colors cursor-pointer decoration-transparent text-on-surface">
                <div className="flex gap-4 items-center">
                  <div className="bg-surface-container p-2 rounded-lg">
                    <Icon name="diamond" className="text-primary text-xl" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-sm">{prod.siteLocation}</h3>
                    <span className="text-[10px] text-on-surface-variant tracking-wider uppercase">{new Date(prod.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <h4 className="font-headline font-bold text-lg">{prod.amountGrams.toLocaleString()} g</h4>
                  {prod.notes && <span className="text-[10px] text-on-surface-variant w-32 truncate text-right">{prod.notes}</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      {role !== 'OBSERVER' && (
        <Link to="/production/add" className="fixed bottom-20 md:bottom-10 right-6 w-14 h-14 metallic-gradient rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(242,202,80,0.4)] hover:scale-105 transition-transform z-40">
          <Icon name="add" className="text-[var(--on-primary)] text-2xl font-bold" />
        </Link>
      )}
    </>
  );
};

export default Production;
