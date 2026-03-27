import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { useNavigate, Link } from 'react-router-dom';

const ProductionCalendar: React.FC = () => {
  const navigate = useNavigate();
  const { production, incidents } = useAppContext();

  // Calendar logic with navigation state
  const [activeDate, setActiveDate] = useState(new Date());
  
  const year = activeDate.getFullYear();
  const month = activeDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => setActiveDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setActiveDate(new Date(year, month + 1, 1));

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    // Force double digits for month and day to ensure correct string matching
    const mStr = String(month + 1).padStart(2, '0');
    const dStr = String(i + 1).padStart(2, '0');
    const dateStr = `${year}-${mStr}-${dStr}`;
    
    // Check data
    const dayProds = production.filter(p => p.date.startsWith(dateStr));
    const dayIncs = incidents.filter(i => i.date.startsWith(dateStr));
    
    const yieldTotal = dayProds.reduce((acc, curr) => acc + curr.amountGrams, 0);

    return {
      date: i + 1,
      dateString: dateStr,
      hasProduction: dayProds.length > 0,
      hasIncident: dayIncs.length > 0,
      yieldTotal
    };
  });

  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <>
      <header className="bg-[#131313] text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md border-b border-outline/10">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/production')} className="text-on-surface-variant hover:text-on-surface transition-colors pb-1">
              <Icon name="arrow_back_ios_new" />
            </button>
            <h1 className="text-xl tracking-tight">Production Calendar</h1>
          </div>
          <Icon name="calendar_month" className="text-primary" />
        </div>
      </header>

      <main className="px-6 mt-6 space-y-8 max-w-lg mx-auto md:max-w-2xl pb-10">
        
        {/* Visual Legend */}
        <section className="bg-surface-container-highest p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between border border-outline/10 gap-4 sm:gap-2">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 rounded bg-primary/20 border border-primary/30 flex items-center justify-center relative">
               <span className="w-1.5 h-1.5 rounded-full bg-primary absolute top-1 right-1"></span>
             </div>
             <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant leading-tight">Gold Yield<br/><span className="text-[8px] opacity-70">Production Logged</span></span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 rounded bg-error/20 border border-error/30 flex items-center justify-center relative">
               <span className="w-1.5 h-1.5 rounded-full bg-error absolute top-1 right-1"></span>
             </div>
             <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant leading-tight">Incident<br/><span className="text-[8px] opacity-70">Fault Reported</span></span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 rounded bg-surface-container-low border border-outline/10 flex items-center justify-center"></div>
             <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant leading-tight">Empty<br/><span className="text-[8px] opacity-70">No Data</span></span>
          </div>
        </section>

        {/* Monthly Aggregate */}
        <section className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-lg">
          <div className="flex justify-between items-center mb-6 border-b border-outline/10 pb-4">
            <h2 className="font-headline text-lg font-bold uppercase tracking-widest">{monthNames[month]} {year}</h2>
            <div className="flex gap-2">
              <button onClick={handlePrevMonth} className="p-2 bg-surface-container-highest hover:bg-outline/10 transition-colors rounded-lg"><Icon name="chevron_left" /></button>
              <button onClick={handleNextMonth} className="p-2 bg-surface-container-highest hover:bg-outline/10 transition-colors rounded-lg"><Icon name="chevron_right" /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-on-surface-variant uppercase tracking-widest">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {blanks.map(b => <div key={`blank-${b}`} className="aspect-square rounded-xl bg-transparent"></div>)}
            {days.map(d => (
              <Link 
                to={`/production/${d.dateString}`} 
                key={d.date} 
                className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all decoration-transparent group
                  ${d.hasProduction ? 'bg-primary/10 border border-primary/30 hover:bg-primary/20 text-on-surface' : d.hasIncident ? 'bg-error/10 border border-error/30 hover:bg-error/20 text-on-surface' : 'bg-surface-container-highest border border-outline/5 hover:border-outline/30 text-on-surface-variant'}
                `}
              >
                <span className="font-headline font-bold text-sm z-10">{d.date}</span>
                
                <div className="absolute top-1 right-1 flex gap-0.5">
                  {d.hasProduction && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                  {d.hasIncident && <span className="w-1.5 h-1.5 rounded-full bg-error"></span>}
                </div>

                {d.hasProduction && (
                  <span className="text-[7px] font-bold uppercase tracking-widest text-primary mt-1 opacity-80 scale-90 group-hover:scale-100 transition-transform">{d.yieldTotal >= 1000 ? (d.yieldTotal/1000).toFixed(1)+'kg' : Math.floor(d.yieldTotal)+'g'}</span>
                )}
              </Link>
            ))}
          </div>
        </section>

      </main>
    </>
  );
};

export default ProductionCalendar;
