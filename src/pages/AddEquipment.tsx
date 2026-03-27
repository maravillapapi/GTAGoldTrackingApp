import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';

const AddEquipment: React.FC = () => {
  const { role } = useAppContext();
  // We simulate the context action for adding equipment if it's not wired up yet
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [type, setType] = useState('Heavy Machinery');
  const [costPerHour, setCostPerHour] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || role === 'OBSERVER') return;
    
    // Simulate add functionality
    navigate('/inventory');
  };

  return (
    <>
      <header className="bg-[#131313] text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md border-b border-outline/10">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-on-surface-variant hover:text-on-surface transition-colors pb-1">
              <Icon name="arrow_back_ios_new" />
            </button>
            <h1 className="text-xl tracking-tight">Register Asset</h1>
          </div>
          <Icon name="precision_manufacturing" className="text-primary" />
        </div>
      </header>

      <main className="px-6 mt-6 space-y-8 max-w-lg mx-auto md:max-w-xl">
        {role !== 'OBSERVER' ? (
          <section className="bg-surface-container-low p-6 rounded-2xl shadow-lg border border-outline-variant/20">
            <h2 className="font-headline text-lg font-bold uppercase tracking-widest text-on-surface mb-6">Asset Specification</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Equipment / Model Name</label>
                <input 
                  type="text" 
                  className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-headline font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full transition-colors"
                  placeholder="e.g. Excavator Alpha-1" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required 
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Classification Type</label>
                <select 
                  className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-headline font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full transition-colors"
                  value={type} 
                  onChange={e => setType(e.target.value)}
                >
                  <option value="Heavy Machinery">Heavy Machinery</option>
                  <option value="Processing">Processing</option>
                  <option value="Transport">Transport</option>
                  <option value="Auxiliary">Auxiliary / Power</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">OpEx Rate ($/h)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-headline font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full transition-colors"
                    placeholder="e.g. 50" 
                    value={costPerHour} 
                    onChange={e => setCostPerHour(e.target.value)} 
                    required 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Condition</label>
                  <select 
                    className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-headline font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary w-full transition-colors"
                    disabled
                  >
                    <option>100% (NEW)</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={!name}
                className={`mt-4 p-4 rounded-xl flex items-center justify-center gap-2 font-headline uppercase font-bold text-xs tracking-widest transition-opacity ${name ? 'bg-primary text-on-primary shadow-[0_5px_15px_rgba(242,202,80,0.2)]' : 'bg-surface-container-highest opacity-50 text-on-surface-variant cursor-not-allowed'}`}
              >
                <Icon name="add" className={name ? "" : ""} />
                Initialize Asset
              </button>
            </form>
          </section>
        ) : (
           <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col items-center justify-center gap-3 text-on-surface-variant">
              <Icon name="visibility" className="text-3xl text-primary opacity-50" />
              <span className="text-xs font-bold uppercase tracking-widest text-center">Observer Cannot Add Equipment</span>
           </div>
        )}
      </main>
    </>
  );
};

export default AddEquipment;
