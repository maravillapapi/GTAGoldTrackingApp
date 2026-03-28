import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';

const AddSale: React.FC = () => {
  const { addSale, role } = useAppContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({ amountGrams: '', unitPrice: '', companyName: '', notes: '' });

  const isFormValid = form.amountGrams && form.unitPrice && form.companyName;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || role === 'OBSERVER') return;

    addSale({
      date: new Date().toISOString(),
      amountGrams: Number(form.amountGrams),
      unitPrice: Number(form.unitPrice),
      companyName: form.companyName,
      status: 'PENDING'
    });

    navigate('/sales');
  };

  if (role === 'OBSERVER') return <div className="p-8 text-center text-error pt-20 font-bold uppercase tracking-widest">Accès Refusé. Lecture seule.</div>;

  return (
    <>
      <header className="bg-background text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md border-b border-outline/10">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-on-surface-variant hover:text-on-surface transition-colors pb-1">
              <Icon name="arrow_back_ios_new" />
            </button>
            <h1 className="text-xl tracking-tight">Nouvelle Vente</h1>
          </div>
          <Icon name="sell" className="text-primary" />
        </div>
      </header>

      <main className="px-6 mt-6 space-y-8 pb-32 max-w-lg mx-auto md:max-w-3xl">
        <section className="bg-surface-container-low p-6 rounded-2xl relative overflow-hidden shadow-lg border border-[#F2CA50]/10">
          <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#F2CA50]"></div>
          <h2 className="font-headline text-lg font-bold uppercase tracking-widest text-primary mb-4 pl-2">Enregistrer Facture</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 pl-2">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Acheteur (Entité)</label>
              <input 
                type="text" 
                className="bg-surface-container-low border border-outline/10 rounded-lg p-3 text-sm font-headline font-bold text-on-surface focus:border-[#F2CA50] focus:outline-none focus:ring-1 focus:ring-[#F2CA50] w-full transition-colors"
                placeholder="ex. Corp. Raffineurs Mondiaux" 
                value={form.companyName} 
                onChange={e => setForm({...form, companyName: e.target.value})} 
                required 
              />
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Masse Nette (g)</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="bg-surface-container-low border border-outline/10 rounded-lg p-3 text-sm font-headline font-bold text-on-surface focus:border-[#F2CA50] focus:outline-none focus:ring-1 focus:ring-[#F2CA50] w-full transition-colors"
                  placeholder="ex. 1200.00" 
                  value={form.amountGrams} 
                  onChange={e => setForm({...form, amountGrams: e.target.value})} 
                  required 
                />
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Prix Unitaire ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="bg-surface-container-low border border-outline/10 rounded-lg p-3 text-sm font-headline font-bold text-on-surface focus:border-[#F2CA50] focus:outline-none focus:ring-1 focus:ring-[#F2CA50] w-full transition-colors"
                  placeholder="ex. 65.00" 
                  value={form.unitPrice} 
                  onChange={e => setForm({...form, unitPrice: e.target.value})} 
                  required 
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Notes Additionnelles</label>
              <textarea 
                className="bg-surface-container-low border border-outline/10 rounded-lg p-3 text-sm font-body text-on-surface focus:border-[#F2CA50] focus:outline-none focus:ring-1 focus:ring-[#F2CA50] w-full h-20 transition-colors"
                placeholder="Conditions, retards, détails..." 
                value={form.notes} 
                onChange={e => setForm({...form, notes: e.target.value})} 
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={!isFormValid}
              className={`mt-4 p-4 rounded-xl flex items-center justify-center gap-2 font-headline uppercase font-bold text-xs tracking-widest transition-all ${isFormValid ? 'metallic-gradient text-[var(--on-primary)] shadow-[0_5px_15px_rgba(242,202,80,0.2)] hover:scale-[1.02]' : 'bg-surface-container-low border border-outline/10 opacity-50 text-on-surface-variant cursor-not-allowed'}`}
            >
              <Icon name="check_circle" className={isFormValid ? "text-on-primary" : ""} />
              Validation Vente
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default AddSale;
