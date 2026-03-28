import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';

const ExpenseDetail: React.FC = () => {
  const { id } = useParams();
  const { expenses } = useAppContext();
  const navigate = useNavigate();

  const exp = expenses.find(e => e.id === id) || expenses[0];

  if (!exp) return <div className="p-8 text-center text-error pt-20">Dépense introuvable.</div>;

  return (
    <>
      <header className="bg-surface text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md border-b border-outline/10">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-on-surface-variant hover:text-on-surface transition-colors pb-1">
              <Icon name="arrow_back_ios_new" />
            </button>
            <h1 className="text-xl tracking-tight">Détail Dépense</h1>
          </div>
          <Icon name="receipt_long" className="text-error" />
        </div>
      </header>

      <main className="px-6 mt-6 pb-32 max-w-lg mx-auto md:max-w-3xl">
        <div className="bg-surface-container-low p-6 rounded-[24px] border border-error/20 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-error"></div>
          
          <div className="flex justify-between items-start mb-8 pl-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant block mb-1">{new Date(exp.date).toLocaleDateString()}</span>
              <h2 className="font-headline text-2xl font-bold text-on-surface tracking-tight leading-none mb-2 capitalize">
                {exp.category === 'FUEL' ? 'CARBURANT' : exp.category === 'MAINTENANCE' ? 'MAINTENANCE' : exp.category === 'LABOR' ? 'MAIN-D\'ŒUVRE' : 'AUTRE'}
              </h2>
            </div>
            <div className="bg-surface-container p-3 rounded-xl border border-outline/10">
                <Icon name={exp.category === 'FUEL' ? 'local_gas_station' : exp.category === 'MAINTENANCE' ? 'build' : 'receipt'} className="text-error text-2xl" />
            </div>
          </div>

          <div className="pl-4 mb-8">
            <div className="flex flex-col gap-1 p-4 bg-surface-container border border-outline/10 rounded-xl mb-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">Montant Total Débité</span>
              <div className="flex items-baseline gap-1">
                <span className="font-headline text-4xl font-black text-error tracking-tighter">-${exp.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                <span className="text-[12px] text-on-surface-variant uppercase font-bold tracking-widest ml-2">USD</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">Description / Motif</span>
              <p className="text-sm font-body text-on-surface leading-relaxed w-full">
                  {exp.description || 'Aucune description fournie pour cette transaction.'}
              </p>
            </div>
          </div>

          {exp.receiptImageUrl && (
            <div className="border-t border-outline/10 pt-6 pl-4 flex flex-col gap-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">Pièce Jointe Officielle</span>
              <div className="rounded-xl overflow-hidden border border-outline/20 bg-surface-container-highest max-h-64 flex items-center justify-center">
                 <img src={exp.receiptImageUrl} alt="Reçu de dépense" className="object-cover w-full h-full opacity-90" />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ExpenseDetail;
