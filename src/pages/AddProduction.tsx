import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';

const AddProduction: React.FC = () => {
  const { addProduction, role } = useAppContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({ amountGrams: '', siteLocation: '', notes: '' });

  const isFormValid = form.amountGrams && !isNaN(Number(form.amountGrams)) && form.siteLocation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || role === 'OBSERVER') return;

    addProduction({
      date: new Date().toISOString(),
      amountGrams: Number(form.amountGrams),
      siteLocation: form.siteLocation,
      notes: form.notes
    });

    navigate('/production');
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
            <h1 className="text-xl tracking-tight">Ajout Production</h1>
          </div>
          <Icon name="precision_manufacturing" className="text-primary" />
        </div>
      </header>

      <main className="px-6 mt-6 space-y-8 pb-32 max-w-lg mx-auto md:max-w-3xl">
        <section className="bg-surface-container-low p-6 rounded-2xl relative overflow-hidden shadow-lg border border-outline-variant/20">
          <h2 className="font-headline text-lg font-bold uppercase tracking-widest text-on-surface mb-4">Enregistrer Nouveau Rendement</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Montant (Grammes)</label>
              <input 
                type="number" 
                step="0.01"
                className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-headline font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full transition-colors"
                placeholder="ex. 150.5" 
                value={form.amountGrams} 
                onChange={e => setForm({...form, amountGrams: e.target.value})} 
                required 
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Localisation du Site</label>
              <input 
                type="text" 
                className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-headline font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full transition-colors"
                placeholder="ex. Fosse Nord" 
                value={form.siteLocation} 
                onChange={e => setForm({...form, siteLocation: e.target.value})} 
                required 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Notes de Terrain</label>
              <textarea 
                className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-body focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full h-20 transition-colors"
                placeholder="Détails optionnels..." 
                value={form.notes} 
                onChange={e => setForm({...form, notes: e.target.value})} 
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={!isFormValid}
              className={`mt-2 p-4 rounded-xl flex items-center justify-center gap-2 font-headline uppercase font-bold text-xs tracking-widest transition-opacity ${isFormValid ? 'metallic-gradient text-[var(--on-primary)] shadow-[0_5px_15px_rgba(242,202,80,0.2)] hover:scale-105' : 'bg-surface-container-highest opacity-50 text-on-surface-variant cursor-not-allowed'}`}
            >
              <Icon name="check_circle" className={isFormValid ? "text-on-primary" : ""} />
              Soumettre l'Entrée
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default AddProduction;
