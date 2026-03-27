import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { Link } from 'react-router-dom';

const Production: React.FC = () => {
  const { production, addProduction, role } = useAppContext();
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

    setForm({ amountGrams: '', siteLocation: '', notes: '' });
  };

  return (
    <>
      <header className="bg-[#131313] text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md border-b border-outline/10">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <h1 className="text-xl tracking-tight">Production Log</h1>
          <Link to="/production/calendar" className="text-primary hover:text-primary-fixed transition-colors">
            <Icon name="calendar_month" className="text-2xl" />
          </Link>
        </div>
      </header>

      <main className="px-6 mt-6 space-y-8">
        {/* Form */}
        {role !== 'OBSERVER' ? (
          <section className="bg-surface-container-low p-6 rounded-2xl relative overflow-hidden shadow-lg border border-outline-variant/20">
            <h2 className="font-headline text-lg font-bold uppercase tracking-widest text-on-surface mb-4">Record New Yield</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Amount (Grams)</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-headline font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full transition-colors"
                  placeholder="e.g. 150.5" 
                  value={form.amountGrams} 
                  onChange={e => setForm({...form, amountGrams: e.target.value})} 
                  required 
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Site Location</label>
                <input 
                  type="text" 
                  className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-headline font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full transition-colors"
                  placeholder="e.g. Zone Alpha-2" 
                  value={form.siteLocation} 
                  onChange={e => setForm({...form, siteLocation: e.target.value})} 
                  required 
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Field Notes</label>
                <textarea 
                  className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-body focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full h-20 transition-colors"
                  placeholder="Optional details..." 
                  value={form.notes} 
                  onChange={e => setForm({...form, notes: e.target.value})} 
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={!isFormValid}
                className={`mt-2 p-4 rounded-xl flex items-center justify-center gap-2 font-headline uppercase font-bold text-xs tracking-widest transition-opacity ${isFormValid ? 'metallic-gradient text-[var(--on-primary)] shadow-[0_5px_15px_rgba(242,202,80,0.2)]' : 'bg-surface-container-highest opacity-50 text-on-surface-variant cursor-not-allowed'}`}
              >
                <Icon name="check_circle" className={isFormValid ? "text-on-primary" : ""} />
                Submit Entry
              </button>
            </form>
          </section>
        ) : (
          <div className="bg-surface-container-highest p-4 rounded-2xl flex items-center gap-3 border border-outline/10 text-on-surface-variant">
            <Icon name="visibility" className="text-xl" />
            <p className="text-xs font-bold leading-tight">Observer Mode. Production logging disabled.</p>
          </div>
        )}

        {/* History */}
        <section className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant">Historical Log</h2>
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
    </>
  );
};

export default Production;
