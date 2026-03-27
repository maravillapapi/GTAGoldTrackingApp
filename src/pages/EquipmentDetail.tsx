import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';

const EquipmentDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { equipment, incidents } = useAppContext();

  const item = equipment.find(e => e.id === id);
  if (!item) return <div className="p-6 text-on-surface-variant">Equipment not found.</div>;

  const itemIncidents = incidents.filter(i => i.equipmentId === item.id);

  return (
    <>
      <header className="bg-[#131313] text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md border-b border-outline/10">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-on-surface-variant hover:text-on-surface transition-colors pb-1">
              <Icon name="arrow_back_ios_new" />
            </button>
            <h1 className="text-xl tracking-tight">Equipment Profile</h1>
          </div>
          <Icon name="directions_car" className="text-primary" />
        </div>
      </header>

      <main className="px-6 mt-6 space-y-8 pb-32">
        <section className="bg-surface-container-low p-6 rounded-2xl relative overflow-hidden text-center border border-outline/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <Icon name={item.type === 'HEAVY_MACHINERY' ? 'precision_manufacturing' : 'build'} className={`text-6xl ${item.operationalStatus === 'FUNCTIONAL' ? 'text-primary' : 'text-error'} mb-4`} />
          <h2 className="font-headline text-3xl font-black">{item.name}</h2>
          <div className="flex justify-center mt-3 mb-2 gap-2">
            <span className={`text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold ${item.operationalStatus === 'FUNCTIONAL' ? 'bg-primary/20 text-primary' : item.operationalStatus === 'MAINTENANCE' ? 'bg-error/20 text-error' : 'bg-outline/20 text-on-surface-variant'}`}>{item.operationalStatus}</span>
          </div>
        </section>

        <section className="bg-surface-container-low p-6 rounded-2xl space-y-6">
          <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant border-b border-outline/10 pb-2">Technical Specs</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Model / Type</p>
              <p className="font-headline font-bold text-sm mt-1">{item.type.replace('_', ' ')}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Service Hours</p>
              <p className="font-headline font-bold text-sm mt-1">1,245 hrs <span className="text-[10px] text-on-surface-variant">(est.)</span></p>
            </div>
            
            <div className="col-span-2">
              <div className="flex justify-between">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Condition Rating</p>
                <span className="font-headline font-bold text-sm mb-1">{Math.round(item.condition * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden mt-1">
                <div className="h-full bg-primary" style={{ width: `${item.condition * 100}%` }}></div>
              </div>
            </div>
            
            <div className="bg-surface-container-highest p-4 rounded-xl">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Opex Rate</p>
              <p className="font-headline font-bold text-lg text-error mt-1">${item.operatingCostPerHour}<span className="text-sm">/hr</span></p>
            </div>
            <div className="bg-surface-container-highest p-4 rounded-xl flex items-center justify-center">
              <button className="font-headline text-xs font-bold uppercase tracking-widest text-primary flex flex-col items-center gap-1 hover:text-primary-fixed transition-colors">
                <Icon name="build_circle" />
                Req. Service
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant border-b border-outline/10 pb-2">Maintenance & Incidents</h3>
          
          <div className="space-y-3">
            {itemIncidents.length > 0 ? (
              itemIncidents.map(inc => (
                <div key={inc.id} className={`bg-surface-container-low p-4 rounded-2xl flex flex-col gap-2 border-l-4 ${inc.severity === 'CRITICAL' || inc.severity === 'HIGH' ? 'border-error' : inc.severity === 'MEDIUM' ? 'border-primary' : 'border-outline/30'}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-headline font-bold text-sm">{inc.id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${inc.status === 'OPEN' ? 'bg-error/10 text-error' : 'bg-surface-container-highest text-on-surface-variant'}`}>{inc.status}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-tight">{inc.description}</p>
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest border-t border-outline/10 pt-2">{new Date(inc.date).toLocaleDateString()}</span>
                </div>
              ))
            ) : (
              <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col items-center justify-center gap-3 text-on-surface-variant">
                <Icon name="check_circle" className="text-3xl text-primary opacity-50" />
                <span className="text-xs font-bold uppercase tracking-widest">No Incident History</span>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default EquipmentDetail;
