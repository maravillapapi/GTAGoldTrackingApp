import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';

const AddExpense: React.FC = () => {
  const { addExpense, role } = useAppContext();
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

    navigate('/expenses');
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
            <h1 className="text-xl tracking-tight">Nouvelle Dépense</h1>
          </div>
          <Icon name="payments" className="text-error" />
        </div>
      </header>

      <main className="px-6 mt-6 space-y-8 pb-32 max-w-lg mx-auto md:max-w-3xl">
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
              className={`mt-4 p-4 rounded-xl flex items-center justify-center gap-2 font-headline uppercase font-bold text-xs tracking-widest transition-all ${amount ? 'bg-error text-on-error shadow-[0_5px_15px_rgba(255,180,171,0.2)] hover:scale-[1.02]' : 'bg-surface-container-highest opacity-50 text-on-surface-variant cursor-not-allowed'}`}
            >
              <Icon name="add" className={amount ? "" : ""} />
              Enregistrer Dépense
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default AddExpense;
