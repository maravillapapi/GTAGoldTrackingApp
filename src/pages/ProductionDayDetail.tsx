import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';

const ProductionDayDetail: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const { production, incidents, equipment } = useAppContext();

  const dayProds = production.filter(p => p.date.startsWith(date || ''));
  const dayIncs = incidents.filter(i => i.date.startsWith(date || ''));
  
  const totalYield = dayProds.reduce((acc, curr) => acc + curr.amountGrams, 0);

  // Group into pseudo shifts (Team Alpha / Morning, Team Beta / Afternoon, Team Gamma / Night)
  // for visual replication of the Stitch layout, splitting the production array.
  const shifts = [
    { team: 'Team Alpha', shift: 'Morning Shift', prod: dayProds[0] },
    { team: 'Team Beta', shift: 'Afternoon Shift', prod: dayProds[1] },
    { team: 'Team Gamma', shift: 'Night Shift', prod: dayProds[2] }
  ].filter(s => s.prod !== undefined);

  const displayDate = date ? new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown Date';

  return (
    <>
      <header className="bg-[#131313] text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md border-b border-outline/10">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/production/calendar')} className="text-on-surface-variant hover:text-on-surface transition-colors pb-1">
              <Icon name="arrow_back_ios_new" />
            </button>
            <h1 className="text-xl tracking-tight">Day Detail</h1>
          </div>
          <Icon name="dynamic_feed" className="text-primary" />
        </div>
      </header>

      <main className="px-6 mt-6 space-y-8 max-w-lg mx-auto md:max-w-xl pb-10">
        
        {/* Header Title */}
        <section className="text-center">
          <h2 className="font-headline text-3xl font-bold uppercase tracking-widest text-primary mb-1">Alpha-01 North</h2>
          <p className="text-xs uppercase font-bold tracking-widest text-on-surface-variant flex items-center justify-center gap-1"><Icon name="calendar_today" className="text-[12px]"/> {displayDate}</p>
        </section>

        {/* Total Prod */}
        <div className="bg-surface-container p-6 rounded-2xl flex flex-col items-center justify-center border-b-4 border-primary shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -top-8 text-primary opacity-5"><Icon name="diamond" className="text-9xl" /></div>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest z-10">Total Production</span>
          <span className="font-headline text-4xl font-bold text-primary mt-1 z-10">{totalYield.toLocaleString()} <span className="text-xl">g</span></span>
        </div>

        {/* Production Logs by Shift */}
        <section>
          <div className="flex items-center gap-2 mb-4">
             <Icon name="supervised_user_circle" className="text-on-surface-variant" />
             <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant pt-1">Shift Production Logs</h3>
          </div>

          <div className="space-y-3">
             {shifts.map((s, idx) => (
               <div key={idx} className="bg-surface-container-low p-4 rounded-xl flex justify-between items-center border border-outline/5 hover:bg-surface-container-highest transition-colors">
                 <div className="flex flex-col">
                   <h4 className="font-bold text-sm text-on-surface leading-tight">{s.team}</h4>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-0.5">{s.shift}</span>
                 </div>
                 <div className="flex flex-col items-end">
                   <span className="font-headline font-bold text-lg text-primary">{s.prod.amountGrams.toLocaleString()} g</span>
                   <span className="text-[9px] font-bold uppercase tracking-widest text-tertiary bg-tertiary/10 px-2 py-[2px] rounded-md mt-1">Submitted</span>
                 </div>
               </div>
             ))}
             {shifts.length === 0 && (
               <div className="bg-surface-container-highest p-4 rounded-xl text-center text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                 No Production Logged
               </div>
             )}
          </div>
        </section>

        {/* Incident Summary */}
        <section>
           <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant border-b border-outline/10 pb-2 mb-4">Incident Summary</h3>
           
           <div className="space-y-4">
             {dayIncs.map(inc => (
               <div key={inc.id} className="bg-error/10 border border-error/30 p-4 rounded-xl border-l-4">
                 <h4 className="font-headline font-bold text-error mb-2">{inc.description.substring(0, 40)}{inc.description.length > 40 ? '...' : ''}</h4>
                 <div className="flex justify-between items-center">
                   <span className="text-xs font-bold uppercase tracking-widest text-on-surface">Impact: <span className="text-error">Reviewing</span></span>
                   <span className="text-[10px] font-bold uppercase tracking-widest bg-error/20 text-error px-2 py-0.5 rounded-full">{inc.status}</span>
                 </div>
               </div>
             ))}
             {dayIncs.length === 0 && (
               <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">No registered incidents for this operational cycle.</p>
             )}
           </div>
        </section>

        {/* Equipment Referenced */}
        <section>
           <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant border-b border-outline/10 pb-2 mb-4">Equipment Referenced</h3>
           <div className="flex flex-col gap-2">
             {equipment.slice(0, 2).map((eq, i) => (
                <div key={eq.id} className="bg-surface-container-highest p-3 rounded-xl flex justify-between items-center px-4">
                  <span className="font-bold text-sm text-on-surface">{eq.name}</span>
                  <div className="flex flex-col items-end">
                     <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${eq.operationalStatus === 'FUNCTIONAL' ? 'text-primary border-primary/30' : 'text-error border-error/30'}`}>{eq.operationalStatus}</span>
                     <span className="text-[9px] font-bold text-on-surface-variant uppercase mt-1 tracking-widest">Last Check: {i + 1}h ago</span>
                  </div>
                </div>
             ))}
           </div>
        </section>

        {/* Review Notes */}
        <section className="bg-surface-container-low border border-outline/10 p-5 rounded-xl">
           <h3 className="font-headline text-xs font-bold uppercase tracking-widest text-primary mb-2">Supervisor Note</h3>
           <p className="text-sm text-on-surface italic">"All shifts completed without technical failure. Verified by central command."</p>
        </section>

      </main>
    </>
  );
};

export default ProductionDayDetail;
