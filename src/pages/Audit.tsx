import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';

const Audit: React.FC = () => {
  const { currentStockGrams, role } = useAppContext();
  const navigate = useNavigate();
  const [actualStock, setActualStock] = useState(currentStockGrams.toString());

  const discrepancy = Number(actualStock) - currentStockGrams;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'OBSERVER') return;
    
    // Simulate submission
    navigate('/');
  };

  return (
    <>
      <header className="bg-background text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md border-b border-outline/10">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-on-surface-variant hover:text-on-surface transition-colors pb-1">
              <Icon name="arrow_back_ios_new" />
            </button>
            <h1 className="text-xl tracking-tight">Stock Audit</h1>
          </div>
          <Icon name="fact_check" className="text-tertiary" />
        </div>
      </header>

      <main className="px-6 mt-6 space-y-8 max-w-lg mx-auto md:max-w-xl">
        <section className="bg-surface-container-low p-6 rounded-2xl text-center shadow-lg border-l-4 border-tertiary/50">
          <Icon name="inventory_2" className="text-5xl text-on-surface-variant mx-auto mb-4" />
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">System Expected Stock</p>
          <p className="font-headline text-4xl text-tertiary font-bold mt-2 tracking-tighter">{currentStockGrams.toLocaleString()} <span className="text-xl">g</span></p>
        </section>

        {role !== 'OBSERVER' && (
          <section className="bg-surface-container-low p-6 rounded-2xl shadow-lg border border-outline-variant/20">
            <h2 className="font-headline text-lg font-bold uppercase tracking-widest text-on-surface mb-6">Physical Reconciliation</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Vault Scale Reading (Grams)</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-5 text-2xl font-headline font-black focus:border-tertiary focus:outline-none focus:ring-1 focus:ring-tertiary w-full transition-colors text-center"
                  placeholder="e.g. 1500.00" 
                  value={actualStock} 
                  onChange={e => setActualStock(e.target.value)} 
                  required 
                />
              </div>

              {Number(actualStock) > 0 && (
                <div className={`p-4 rounded-xl flex items-center justify-between border ${discrepancy === 0 ? 'bg-primary/10 border-primary/30 text-primary' : Math.abs(discrepancy) > 50 ? 'bg-error/10 border-error/30 text-error' : 'bg-surface-container border-outline/30 text-on-surface'}`}>
                   <div>
                     <p className="text-[10px] font-bold uppercase tracking-widest">Discrepancy</p>
                     <p className="font-headline font-bold text-lg">{discrepancy > 0 ? '+' : ''}{discrepancy.toFixed(2)} g</p>
                   </div>
                   <Icon name={discrepancy === 0 ? 'check_circle' : 'warning'} className="text-2xl" />
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Auditor Signature / Notes</label>
                <textarea 
                  className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-body focus:border-tertiary focus:outline-none focus:ring-1 focus:ring-tertiary w-full h-20 transition-colors"
                  placeholder="Verify security tags..." 
                  required 
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="mt-4 p-4 rounded-xl flex items-center justify-center gap-2 font-headline uppercase font-bold text-xs tracking-widest transition-opacity bg-tertiary text-[#000] shadow-[0_5px_15px_rgba(var(--tertiary),0.2)]"
              >
                <Icon name="verified" />
                Commit Audit Log
              </button>
            </form>
          </section>
        )}
      </main>
    </>
  );
};

export default Audit;
