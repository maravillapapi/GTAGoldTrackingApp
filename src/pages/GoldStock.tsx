import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';

const GoldStock: React.FC = () => {
  const { currentStockGrams, production, sales } = useAppContext();
  const navigate = useNavigate();

  // Combine production and sales into a single ledger array
  const ledger = [
    ...production.filter(p => p.status !== 'REJECTED').map(p => ({
      ...p,
      type: 'IN',
      displayTitle: `Production - ${p.siteLocation}`,
      value: p.amountGrams,
      date: new Date(p.date)
    })),
    ...sales.map(s => ({
      ...s,
      type: 'OUT',
      displayTitle: `Vente - ${s.companyName}`,
      value: s.amountGrams,
      date: new Date(s.date)
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort descending

  return (
    <>
      <header className="bg-surface text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md border-b border-outline/10">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-on-surface-variant hover:text-on-surface transition-colors pb-1">
              <Icon name="arrow_back_ios_new" />
            </button>
            <h1 className="text-xl tracking-tight">Stock Réel Total</h1>
          </div>
          <Icon name="account_balance" className="text-primary" />
        </div>
      </header>

      <main className="px-6 mt-6 pb-32 max-w-lg mx-auto md:max-w-3xl">
        <div className="bg-surface-container-low rounded-3xl p-8 flex flex-col items-center justify-center border border-primary/20 shadow-2xl relative overflow-hidden mb-10">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] opacity-10 blur-2xl pointer-events-none"></div>

            <Icon name="inventory_2" className="text-primary text-5xl mb-4 opacity-80" />
            <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">LCS - Masse Totale en Voûte</h2>
            <div className="flex items-baseline gap-2 mb-2">
                <span className="font-headline text-5xl font-black text-primary tracking-tighter shrink-0">{currentStockGrams.toLocaleString()}</span>
                <span className="text-lg font-headline font-bold text-primary opacity-80">g</span>
            </div>
            <div className="bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mt-2 backdrop-blur-sm">
                ≈ {(currentStockGrams / 1000).toLocaleString(undefined, {minimumFractionDigits: 2})} kg
            </div>
        </div>

        <section className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant">Mouvements Récents</h2>
            <Icon name="swap_vert" className="text-on-surface-variant" />
          </div>

          <div className="space-y-3 relative">
            {/* Timeline line */}
            <div className="absolute top-4 bottom-4 left-[20px] w-[2px] bg-surface-container-high z-0"></div>

            {ledger.map((entry, index) => (
               <div key={`ledger-${index}`} className="flex gap-4 relative z-10 w-full mb-6">
                 {/* Icon Node */}
                 <div className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center border-4 border-background ${entry.type === 'IN' ? 'bg-[#5CB85C]/20 border-[#5CB85C]/10 text-[#5CB85C]' : 'bg-[#D9534F]/20 border-[#D9534F]/10 text-[#D9534F]'}`}>
                    <Icon name={entry.type === 'IN' ? 'add' : 'remove'} className="text-sm font-bold" />
                 </div>
                 
                 {/* Content Bubble */}
                 <div className="bg-surface-container-low flex-1 p-4 rounded-2xl border border-outline-variant/20 hover:bg-surface-container transition-colors items-center flex justify-between">
                   <div className="flex flex-col">
                       <span className="font-headline font-bold text-sm tracking-widest uppercase text-on-surface truncate pr-2 max-w-[150px]">{entry.displayTitle}</span>
                       <span className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">{entry.date.toLocaleDateString()}</span>
                   </div>
                   <div className="flex items-baseline gap-1">
                       <span className={`font-headline font-bold text-lg ${entry.type === 'IN' ? 'text-[#5CB85C]' : 'text-[#D9534F]'}`}>
                           {entry.type === 'IN' ? '+' : '-'}{entry.value.toLocaleString()}
                       </span>
                       <span className="text-[10px] text-on-surface-variant uppercase font-bold">g</span>
                   </div>
                 </div>
               </div>
            ))}
          </div>
        </section>

      </main>
    </>
  );
};

export default GoldStock;
