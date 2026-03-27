import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';

const Sales: React.FC = () => {
  const { sales, addSale, role } = useAppContext();
  const navigate = useNavigate();
  const [amountGrams, setAmountGrams] = useState('');
  const [pricePerGram, setPricePerGram] = useState('');
  const [buyer, setBuyer] = useState('');
  const [receiptImage, setReceiptImage] = useState<string | undefined>();

  const isFormValid = amountGrams && pricePerGram && buyer;

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
    if (!isFormValid || role === 'OBSERVER') return;
    
    addSale({
      date: new Date().toISOString(),
      amountGrams: Number(amountGrams),
      pricePerGram: Number(pricePerGram),
      buyer,
      receiptImageUrl: receiptImage
    });

    setAmountGrams('');
    setPricePerGram('');
    setBuyer('');
    setReceiptImage(undefined);
  };

  const totalSalesRevenue = sales.reduce((acc, s) => acc + (s.amountGrams * s.pricePerGram), 0);
  const totalGramsSold = sales.reduce((acc, s) => acc + s.amountGrams, 0);

  return (
    <>
      <header className="bg-[#131313] text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md border-b border-outline/10">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-on-surface-variant hover:text-on-surface transition-colors pb-1">
              <Icon name="arrow_back_ios_new" />
            </button>
            <h1 className="text-xl tracking-tight">Sales Dashboard</h1>
          </div>
          <Icon name="sell" className="text-primary" />
        </div>
      </header>

      <main className="px-6 mt-6 space-y-8">
        
        {/* KPI Section */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col justify-between">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Total Vault Revenue</p>
            <p className="font-headline text-2xl text-tertiary font-bold mt-2">
              ${totalSalesRevenue > 1000000 ? (totalSalesRevenue/1000000).toFixed(2) + 'M' : (totalSalesRevenue/1000).toFixed(1) + 'K'}
            </p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col justify-between">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Total Grams Sold</p>
            <p className="font-headline text-2xl text-primary font-bold mt-2">
              {totalGramsSold.toLocaleString()} g
            </p>
          </div>
          
          <div className="col-span-2 bg-surface-container-low p-4 rounded-2xl flex flex-col justify-between">
             <div className="flex justify-between mb-2">
               <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Volatility Map</p>
               <span className="text-[10px] uppercase font-bold text-primary tracking-widest">30-Day Trend</span>
             </div>
             <div className="h-16 flex items-end justify-between gap-1 overflow-visible relative">
                {[40, 60, 45, 80, 50, 90, 100, 75, 85, 95].map((val, i) => (
                  <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${val}%`, backgroundColor: i === 9 ? 'var(--tertiary)' : 'var(--surface-container-highest)' }}></div>
                ))}
             </div>
          </div>
        </section>

        {role !== 'OBSERVER' && (
          <section className="bg-surface-container-low p-6 rounded-2xl shadow-lg border border-outline-variant/20">
            <h2 className="font-headline text-lg font-bold uppercase tracking-widest text-on-surface mb-4">Record Vault Sale</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Grams</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-headline font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full transition-colors"
                    placeholder="e.g. 50" 
                    value={amountGrams} 
                    onChange={e => setAmountGrams(e.target.value)} 
                    required 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Price/Gram</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-headline font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full transition-colors"
                    placeholder="e.g. 62.50" 
                    value={pricePerGram} 
                    onChange={e => setPricePerGram(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 mt-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Buyer/Entity</label>
                <input 
                  type="text" 
                  className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-headline font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full transition-colors"
                  placeholder="e.g. Aurum Vaults Int." 
                  value={buyer} 
                  onChange={e => setBuyer(e.target.value)} 
                  required 
                />
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Transaction Document (Optional)</label>
                <div className="flex items-center gap-4">
                  <label className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 flex-1 flex items-center justify-center gap-2 cursor-pointer hover:bg-surface-bright transition-colors text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    <Icon name="upload_file" />
                    {receiptImage ? 'Change Image' : 'Attach Document'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                  {receiptImage && (
                    <div className="w-12 h-12 rounded bg-surface-container border border-outline-variant/20 overflow-hidden relative">
                      <img src={receiptImage} alt="Receipt Preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setReceiptImage(undefined)} className="absolute -top-2 -right-2 bg-error text-on-error rounded-full w-5 h-5 flex items-center justify-center text-xs">
                         <Icon name="close" className="text-[14px]" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={!isFormValid as any}
                className={`mt-4 p-4 rounded-xl flex items-center justify-center gap-2 font-headline uppercase font-bold text-xs tracking-widest transition-opacity ${isFormValid ? 'metallic-gradient text-[var(--on-primary)] shadow-[0_5px_15px_rgba(242,202,80,0.2)]' : 'bg-surface-container-highest opacity-50 text-on-surface-variant cursor-not-allowed'}`}
              >
                <Icon name="check_circle" className={isFormValid ? "text-on-primary" : ""} />
                Confirm Sale
              </button>
            </form>
          </section>
        )}

        <section className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant">Transaction Ledger</h2>
            <Icon name="history" className="text-on-surface-variant" />
          </div>

          <div className="space-y-3 pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0">
            {[...sales].reverse().map((sale, i) => (
              <div key={i} className="bg-surface-container-low p-4 rounded-2xl flex flex-col gap-3 border-l-2 border-primary/50 hover:bg-surface-container-highest transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="bg-surface-container p-2 rounded-lg">
                      <Icon name="paid" className="text-primary text-xl" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold text-[11px] tracking-widest uppercase truncate max-w-[120px]">{sale.buyer}</h3>
                      <span className="text-[10px] text-on-surface-variant tracking-wider uppercase mt-1">{new Date(sale.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <h4 className="font-headline font-bold text-lg text-primary">+${(sale.amountGrams * sale.pricePerGram).toLocaleString(undefined, {minimumFractionDigits: 2})}</h4>
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mt-1">{sale.amountGrams}g at ${sale.pricePerGram}/g</span>
                  </div>
                </div>
                {sale.receiptImageUrl && (
                  <div className="mt-2 pt-3 border-t border-outline/10 text-xs text-on-surface-variant flex justify-between items-start gap-4">
                    <p className="flex-1 text-[10px] font-bold uppercase tracking-widest">Document Attached</p>
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 border border-outline/20">
                      <img src={sale.receiptImageUrl} alt="Attachment" className="w-full h-full object-cover" />
                    </div>
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

export default Sales;
