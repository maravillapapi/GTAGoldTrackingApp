import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { Link } from 'react-router-dom';

const Sales: React.FC = () => {
  const { sales, role, setIsMenuOpen } = useAppContext();

  const totalVolume = sales.reduce((acc, s) => acc + s.amountGrams, 0);
  const totalRevenue = sales.reduce((acc, s) => acc + s.amountGrams * s.unitPrice, 0);

  return (
    <div className="bg-background min-h-screen text-on-surface font-body selection:bg-primary/30 pb-32">
      
      {/* Top Header */}
      <header className="flex justify-between items-center px-6 pt-6 pb-4 sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(true)} className="text-primary hover:text-on-surface transition-colors">
            <Icon name="menu" className="text-2xl" />
          </button>
          <h1 className="font-headline font-bold text-base tracking-[0.2em] text-on-surface uppercase mt-0.5">Ventes</h1>
        </div>
        <Link to="/profile" className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/20">
          <div className="w-full h-full bg-gradient-to-tr from-surface-container to-surface-container-high flex items-center justify-center">
            <Icon name="person" className="text-on-surface-variant text-sm" />
          </div>
        </Link>
      </header>

      <main className="px-6 mt-4 max-w-lg mx-auto md:max-w-3xl">

        {/* Top Scroll Cards */}
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          <div className="bg-surface-container-low rounded-[24px] p-5 min-w-[200px] border border-outline-variant/10 shrink-0 flex flex-col justify-between">
            <h3 className="text-[8px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-3">Volume Mensuel</h3>
            <div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-headline text-3xl font-bold text-primary tracking-tight">{totalVolume.toLocaleString()}</span>
                <span className="font-headline text-sm font-bold text-primary">g</span>
              </div>
              <div className="h-[3px] bg-outline-variant/20 rounded-full w-full overflow-hidden flex">
                <div className="h-full bg-primary w-[60%]"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-surface-container-low rounded-[24px] p-5 min-w-[240px] border border-outline-variant/10 shrink-0 flex flex-col justify-between">
            <h3 className="text-[8px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-3">Revenus Mensuels</h3>
            <div>
              <p className="font-headline text-3xl font-bold text-primary mb-2 tracking-tight">${totalRevenue.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
              <div className="flex items-center gap-1.5 text-blue-400">
                <Icon name="trending_up" className="text-[12px]" />
                <span className="text-[9px] font-bold tracking-wide">+12.4% vs N-1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mt-4 mb-10">
          <button className="flex items-center gap-2 bg-surface-container border border-outline-variant/20 px-4 py-2.5 rounded-full hover:bg-surface-container-high transition-colors">
            <Icon name="calendar_month" className="text-on-surface-variant text-[14px]" />
            <span className="text-[10px] font-bold text-on-surface">Ce Mois</span>
          </button>
          <button className="flex items-center gap-2 bg-surface-container border border-outline-variant/20 px-4 py-2.5 rounded-full hover:bg-surface-container-high transition-colors">
            <Icon name="location_on" className="text-on-surface-variant text-[14px]" />
            <span className="text-[10px] font-bold text-on-surface">Site Aurum-7</span>
          </button>
          <button className="flex items-center gap-2 bg-surface-container border border-outline-variant/20 px-4 py-2.5 rounded-full hover:bg-surface-container-high transition-colors">
            <Icon name="group" className="text-on-surface-variant text-[14px]" />
            <span className="text-[10px] font-bold text-on-surface">Raffineurs Mond.</span>
          </button>
        </div>

        {/* Active Ledger Section */}
        <section className="mb-8">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Registre Actif</h2>
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-primary">{sales.length} Transactions</span>
          </div>

          <div className="space-y-4">
            {[...sales].reverse().map(sale => {
              const totalValue = sale.amountGrams * sale.unitPrice;
              const isPending = sale.status === 'PENDING';
              const accentColor = isPending ? 'bg-error' : 'bg-primary-container';

              return (
                <Link
                  key={sale.id}
                  to={`/sales/${sale.id}`}
                  className="bg-surface-container-low rounded-[24px] p-5 border border-outline-variant/10 relative overflow-hidden flex flex-col group hover:bg-surface-container transition-colors decoration-transparent text-on-surface"
                >
                  <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${accentColor}`}></div>
                  
                  <div className="flex justify-between items-start mb-6 pl-2">
                    <div>
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-on-surface-variant block mb-1">
                        {new Date(sale.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                      <h3 className="font-headline text-lg font-bold text-on-surface mb-1 tracking-tight">{sale.companyName}</h3>
                      {isPending ? (
                        <div className="inline-flex items-center gap-1.5 bg-error/10 border border-error/20 px-2.5 py-1 rounded-[6px]">
                          <Icon name="warning" className="text-error text-[9px]" />
                          <span className="text-[8px] font-black uppercase tracking-widest text-error">Incohérence des Stocks</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 opacity-70">
                          <Icon name="factory" className="text-on-surface-variant text-[10px]" />
                          <span className="text-[10px] text-on-surface-variant">Site Aurum-7</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-headline text-[22px] font-bold text-primary leading-none mb-1 tracking-tight">${totalValue.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                      <span className="text-[8px] text-on-surface-variant">Valeur Totale</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end pl-2">
                    <div className="flex gap-8">
                      <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-extrabold uppercase tracking-widest text-on-surface-variant">Masse Nette</span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-headline text-sm font-bold text-on-surface">{sale.amountGrams.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                          <span className="text-[9px] text-on-surface-variant">g</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-extrabold uppercase tracking-widest text-on-surface-variant">Prix Unitaire</span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-headline text-sm font-bold text-on-surface">${sale.unitPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                          <span className="text-[9px] text-on-surface-variant">/g</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-10 h-10 rounded-[12px] bg-surface-container flex items-center justify-center group-hover:bg-surface-container-highest transition-colors border border-outline-variant/20">
                      <Icon name="chevron_right" className="text-primary text-xl" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

      </main>

      {/* Floating Action Button */}
      {role !== 'OBSERVER' && (
        <Link to="/sales/add" className="fixed bottom-20 md:bottom-10 right-6 w-14 h-14 metallic-gradient rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(242,202,80,0.4)] hover:scale-105 transition-transform z-40">
          <Icon name="add" className="text-[var(--on-primary)] text-2xl font-bold" />
        </Link>
      )}

    </div>
  );
};

export default Sales;
