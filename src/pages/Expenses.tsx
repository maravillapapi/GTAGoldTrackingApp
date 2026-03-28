import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';

const Expenses: React.FC = () => {
  const { expenses, addExpense, role } = useAppContext();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<'FUEL' | 'MAINTENANCE' | 'LABOR' | 'OTHER'>('FUEL');
  const [description, setDescription] = useState('');
  const [receiptImage, setReceiptImage] = useState<string | undefined>();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setReceiptImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || role === 'OBSERVER') return;
    
    addExpense({
      date: new Date().toISOString(),
      amount: Number(amount),
      category,
      description,
      receiptImageUrl: receiptImage
    });

    setAmount('');
    setDescription('');
    setReceiptImage(undefined);
  };

  return (
    <>
      <header className="bg-[#131313] text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md border-b border-outline/10">
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
        {role !== 'OBSERVER' && (
          <section className="bg-surface-container-low p-6 rounded-2xl shadow-lg border border-outline-variant/20">
            <h2 className="font-headline text-lg font-bold uppercase tracking-widest text-on-surface mb-4">Enregistrer Dépense</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Montant ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-headline font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full transition-colors"
                  placeholder="ex. 1500.00" 
                  value={amount} 
                  onChange={e => setAmount(e.target.value)} 
                  required 
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Catégorie</label>
                <select 
                  className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-headline font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full transition-colors"
                  value={category} 
                  onChange={e => setCategory(e.target.value as any)}
                >
                  <option value="FUEL">Carburant</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="LABOR">Main-d'œuvre</option>
                  <option value="OTHER">Autre</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Description (Optionnel)</label>
                <textarea 
                  className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-body focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full h-20 transition-colors"
                  placeholder="Détails..." 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                ></textarea>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Reçu / Pièce Jointe (Optionnel)</label>
                <div className="flex items-center gap-4">
                  <label className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 flex-1 flex items-center justify-center gap-2 cursor-pointer hover:bg-surface-bright transition-colors text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    <Icon name="upload_file" />
                    {receiptImage ? 'Changer l\'Image' : 'Télécharger Reçu'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                  {receiptImage && (
                    <div className="w-12 h-12 rounded bg-surface-container border border-outline-variant/20 overflow-hidden relative">
                      <img src={receiptImage} alt="Aperçu Reçu" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setReceiptImage(undefined)} className="absolute -top-2 -right-2 bg-error text-on-error rounded-full w-5 h-5 flex items-center justify-center text-xs">
                         <Icon name="close" className="text-[14px]" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={!amount}
                className={`mt-4 p-4 rounded-xl flex items-center justify-center gap-2 font-headline uppercase font-bold text-xs tracking-widest transition-opacity ${amount ? 'bg-error text-on-error shadow-[0_5px_15px_rgba(255,180,171,0.2)]' : 'bg-surface-container-highest opacity-50 text-on-surface-variant cursor-not-allowed'}`}
              >
                <Icon name="add" className={amount ? "" : ""} />
                Enregistrer Dépense
              </button>
            </form>
          </section>
        )}

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
    </>
  );
};

export default Expenses;
