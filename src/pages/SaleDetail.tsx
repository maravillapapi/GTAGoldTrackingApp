import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';

const SaleDetail: React.FC = () => {
  const { id } = useParams();
  const { sales } = useAppContext();
  const navigate = useNavigate();

  const sale = sales.find(s => s.id === id) || sales[0]; // fallback for demo

  if (!sale) return <div className="p-8 text-center text-error pt-20">Transaction introuvable.</div>;

  const totalValue = sale.amountGrams * sale.unitPrice;

  return (
    <>
      <header className="bg-surface text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md border-b border-outline/10">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-on-surface-variant hover:text-on-surface transition-colors pb-1">
              <Icon name="arrow_back_ios_new" />
            </button>
            <h1 className="text-xl tracking-tight">Détail Opération</h1>
          </div>
          <Icon name="verified" className="text-primary" />
        </div>
      </header>

      <main className="px-6 mt-6 pb-32 max-w-lg mx-auto md:max-w-3xl">
        <div className="bg-surface-container-low p-6 rounded-[24px] border border-primary/20 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-primary"></div>
          
          <div className="flex justify-between items-start mb-8 pl-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant block mb-1">Date: {new Date(sale.date).toLocaleDateString()}</span>
              <h2 className="font-headline text-2xl font-bold text-on-surface tracking-tight leading-none mb-2">{sale.companyName}</h2>
              <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-[8px]">
                <Icon name="check_circle" className="text-primary text-[12px]" />
                <span className="text-[9px] font-black uppercase tracking-widest text-primary">{sale.status === 'COMPLETED' ? 'Terminée' : 'En Attente'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pl-4 mb-8">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">Masse Nette</span>
              <div className="flex items-baseline gap-1">
                <span className="font-headline text-2xl font-bold text-on-surface">{sale.amountGrams.toLocaleString()}</span>
                <span className="text-[12px] text-on-surface-variant">g</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">Prix Unitaire</span>
              <div className="flex items-baseline gap-1">
                <span className="font-headline text-2xl font-bold text-on-surface">${sale.unitPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                <span className="text-[12px] text-on-surface-variant">/g</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-1 col-span-2 p-4 bg-surface-container border border-outline/10 rounded-xl mt-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">Valeur Totale (Estimation)</span>
              <div className="flex items-baseline gap-1">
                <span className="font-headline text-4xl font-black text-primary tracking-tighter">${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                <span className="text-[12px] text-on-surface-variant uppercase font-bold tracking-widest ml-2">USD</span>
              </div>
            </div>
          </div>

          <div className="border-t border-outline/10 pt-6 pl-4 flex gap-4">
            <button className="flex-1 metallic-gradient text-[var(--on-primary)] py-3 rounded-xl font-headline font-bold uppercase tracking-widest text-xs opacity-50 cursor-not-allowed">
              Générer Reçu
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default SaleDetail;
