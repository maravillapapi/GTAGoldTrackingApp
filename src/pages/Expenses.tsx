import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { Link, useNavigate } from 'react-router-dom';

const Expenses: React.FC = () => {
  const { expenses, role } = useAppContext();
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-surface text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md border-b border-outline/10">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-on-surface-variant hover:text-on-surface transition-colors pb-1">
              <Icon name="arrow_back_ios_new" />
            </button>
            <h1 className="text-xl tracking-tight">Registre des Dépenses</h1>
          </div>
          <Icon name="payments" className="text-error" />
        </div>
      </header>

      <main className="px-6 mt-6 space-y-8 pb-32">
        <section className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant">Historique des Dépenses</h2>
            <Icon name="history" className="text-on-surface-variant" />
          </div>

          <div className="space-y-3 pb-8">
            {[...expenses].reverse().map(exp => (
              <div key={exp.id} className="bg-surface-container-low p-4 rounded-2xl flex flex-col gap-3 border-l-2 border-error/50 hover:bg-surface-container-highest transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="bg-surface-container p-2 rounded-lg">
                      <Icon name={exp.category === 'FUEL' ? 'local_gas_station' : exp.category === 'MAINTENANCE' ? 'build' : 'receipt'} className="text-error text-xl" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold text-sm tracking-widest uppercase">
                        {exp.category === 'FUEL' ? 'CARBURANT' : exp.category === 'MAINTENANCE' ? 'MAINTENANCE' : exp.category === 'LABOR' ? 'MAIN-D\'ŒUVRE' : 'AUTRE'}
                      </h3>
                      <span className="text-[10px] text-on-surface-variant tracking-wider uppercase">{new Date(exp.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <h4 className="font-headline font-bold text-lg text-error">-${exp.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</h4>
                  </div>
                </div>
                {(exp.description || exp.receiptImageUrl) && (
                  <div className="mt-2 pt-3 border-t border-outline/10 text-xs text-on-surface-variant flex justify-between items-start gap-4">
                    <p className="flex-1">{exp.description || 'Aucune description fournie.'}</p>
                    {exp.receiptImageUrl && (
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 border border-outline/20">
                        <img src={exp.receiptImageUrl} alt="Pièce Jointe" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      {role !== 'OBSERVER' && (
        <Link to="/expenses/add" className="fixed bottom-20 md:bottom-10 right-6 w-14 h-14 bg-error text-on-error rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(255,136,136,0.4)] hover:scale-105 transition-transform z-40">
          <Icon name="add" className="text-2xl font-bold" />
        </Link>
      )}
    </>
  );
};

export default Expenses;
