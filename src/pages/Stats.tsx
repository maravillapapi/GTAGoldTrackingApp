import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

const Stats: React.FC = () => {
  const { production, expenses, sales, role } = useAppContext();

  const totalProduction = production.reduce((acc, p) => acc + p.amountGrams, 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const totalSalesRevenue = sales.reduce((acc, s) => acc + (s.amountGrams * s.pricePerGram), 0);

  const costPerGram = totalProduction > 0 ? (totalExpenses / totalProduction).toFixed(2) : 0;
  const netMargin = totalSalesRevenue - totalExpenses;
  const marginPercentage = totalSalesRevenue > 0 ? ((netMargin / totalSalesRevenue) * 100).toFixed(1) : 0;

  return (
    <>
      <header className="bg-[#131313] text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <h1 className="text-xl tracking-tight">Aperçu Financier</h1>
          <Icon name="monitoring" className="text-on-surface-variant" />
        </div>
      </header>

      <main className="px-6 mt-4 space-y-6 pb-32">
        <section className="bg-surface-container-low p-6 rounded-2xl relative overflow-hidden shadow-lg border border-outline-variant/20">
          <div className="flex justify-between items-start mb-2 relative z-10">
            <p className="font-label text-xs font-bold uppercase tracking-[0.1em] opacity-80 pt-1 text-on-surface-variant">Marge Nette (YTD)</p>
            <Icon name="account_balance_wallet" className="text-primary" />
          </div>
          <div className="flex items-baseline gap-2 relative z-10 pt-2">
            <span className={`font-headline text-4xl font-black tracking-tighter ${netMargin >= 0 ? 'text-tertiary' : 'text-error'}`}>
              ${Math.abs(netMargin/1000).toFixed(1)}k
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between relative z-10">
            <span className="bg-surface-container-highest px-3 py-1.5 rounded-full text-[12px] font-bold text-on-surface">Marge : {marginPercentage}%</span>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-4 rounded-2xl">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Coût Moyen/Gramme</p>
            <p className="font-headline text-xl text-on-surface font-bold">${costPerGram}</p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Total Extrait</p>
            <p className="font-headline text-xl text-primary font-bold">{totalProduction.toLocaleString()}g</p>
          </div>

          <div className="bg-surface-container-low p-6 rounded-2xl col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant">Opérations sur les Données</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/sales" className="bg-surface-container-highest p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-surface-bright transition-colors decoration-transparent text-primary">
                <Icon name="sell" />
                <span className="font-headline text-[10px] font-bold uppercase tracking-wider text-center">Registre des<br/>Ventes</span>
              </Link>
              <Link to="/expenses" className="bg-surface-container-highest p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-surface-bright transition-colors decoration-transparent text-on-surface">
                <Icon name="payments" />
                <span className="font-headline text-[10px] font-bold uppercase tracking-wider text-center">Registre des<br/>Dépenses</span>
              </Link>
            </div>
          </div>
        </section>

        {role === 'ADMIN' && (
          <section className="pt-4">
            <button className="w-full bg-primary/10 text-primary border border-primary/20 p-4 rounded-xl font-headline font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <Icon name="download" />
              Exporter le Rapport Complet
            </button>
          </section>
        )}
      </main>
    </>
  );
};

export default Stats;
