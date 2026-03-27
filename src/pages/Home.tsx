import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';

const Home: React.FC = () => {
  const { currentStockGrams, production, incidents, role, expenses, sales, equipment } = useAppContext();

  const todayProduction = production
    .filter(p => new Date(p.date).toDateString() === new Date().toDateString())
    .reduce((sum, p) => sum + p.amountGrams, 0);

  const activeIncidents = incidents.filter(i => i.status !== 'CLOSED');
  
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalSalesRevenue = sales.reduce((sum, s) => sum + (s.amountGrams * s.pricePerGram), 0);
  
  const nonOpEquip = equipment.filter(e => e.operationalStatus !== 'FUNCTIONAL' && e.operationalStatus !== 'INACTIVE').length;

  return (
    <>
      <header className="bg-[#131313] text-[#D4AF37] font-headline font-bold tracking-tight uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-3">
            <Icon name="location_on" className="text-[#D4AF37]" />
            <div className="flex flex-col leading-none pt-1">
              <span className="text-[10px] text-on-surface-variant font-medium tracking-normal normal-case">Operational Site</span>
              <span className="text-sm tracking-widest text-[#D4AF37]">Alpha-01 North</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-surface-container-highest px-3 py-1 rounded-full border border-outline-variant/20 pt-1.5">
              <span className="text-[10px] font-bold tracking-tighter text-primary uppercase">{role}</span>
            </div>
            <div className="relative">
              <Icon name="notifications" className="text-[#D4AF37]" />
              {activeIncidents.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full ring-2 ring-background"></span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 mt-2 space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-on-surface-variant text-sm font-medium">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</p>
            <h1 className="font-headline text-3xl font-extrabold tracking-tight">Executive Summary</h1>
          </div>
        </div>

        {/* Hero KPI */}
        <section className="relative overflow-hidden rounded-2xl p-6 metallic-gradient text-on-primary shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
          <div className="flex justify-between items-start mb-2 relative z-10">
            <p className="font-label text-xs font-bold uppercase tracking-[0.1em] opacity-80 pt-1">Today's Production</p>
            <Icon name="trending_up" className="opacity-70" />
          </div>
          <div className="flex items-baseline gap-2 relative z-10">
            <span className="font-headline text-5xl font-black tracking-tighter">{todayProduction.toLocaleString()}</span>
            <span className="font-headline text-xl font-bold opacity-90">g</span>
          </div>
          <div className="mt-4 flex items-center justify-between relative z-10">
            <span className="bg-on-primary/10 px-3 py-1.5 rounded-full text-[12px] font-bold">≈ {(todayProduction/1000).toFixed(2)} kg AU</span>
            <Link to="/production" className="text-xs font-bold underline underline-offset-4 decoration-2 pt-1">View Details</Link>
          </div>
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCtkgkflRq7vTB718fKCjxwL2--ml-hLfm0tv1V4PzCSYmlu_re6XthnZNa9Rmd5Cc6_eRZlU05OeDYHfbsNmvnUyVBGQZsFOrGHLtnCkIBZKEhaZfvTSms1jeDvPIllVAI8eKuyjG6vfDSZMkLrN4QP0ZMxETga0aZ3MOMpuZzH3nlpTljZFIppxIlp2tKLdUHePLtqd3cf88ePab68AIgYFFsr9nojKi5V65YmwLRPq5S1BAgSKvpOI92GCCZXEp4hFB7G2XLI4vo')"}}></div>
        </section>

        {/* Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface-container-low p-4 rounded-2xl space-y-1 col-span-2 md:col-span-4 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Gold Stock (Vault)</p>
              <p className="font-headline text-2xl text-primary font-bold">{currentStockGrams.toLocaleString()} g <span className="text-sm font-medium text-on-surface-variant ml-1">({(currentStockGrams/1000).toFixed(2)} kg)</span></p>
            </div>
            <Icon name="inventory_2" className="text-on-surface-variant/40 text-4xl" />
          </div>

          <div className="bg-surface-container-low p-4 rounded-2xl">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">YTD Sales</p>
            <p className="font-headline text-xl text-tertiary font-bold">${totalSalesRevenue > 1000000 ? (totalSalesRevenue/1000000).toFixed(2) + 'M' : (totalSalesRevenue/1000).toFixed(1) + 'K'}</p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Expenses</p>
            <p className="font-headline text-xl text-error font-bold">${totalExpenses > 1000000 ? (totalExpenses/1000000).toFixed(2) + 'M' : (totalExpenses/1000).toFixed(1) + 'K'}</p>
          </div>

          <div className="bg-surface-container-low p-4 rounded-2xl border-l-4 border-error/50">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Open Incidents</p>
            <p className="font-headline text-2xl text-on-surface font-bold">{activeIncidents.length.toString().padStart(2, '0')}</p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl border-l-4 border-outline/30">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Non-Op Equip.</p>
            <p className="font-headline text-2xl text-on-surface font-bold">{nonOpEquip.toString().padStart(2, '0')}</p>
          </div>
        </section>

        {/* Quick Actions */}
        {role !== 'OBSERVER' && (
          <section className="space-y-4">
            <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant">Administrative Controls</h2>
            <div className="grid grid-cols-4 md:flex md:flex-wrap gap-4 pb-2">
              <Link to="/production" className="flex-1 min-w-[80px] bg-surface-container-highest p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-surface-bright transition-colors text-on-surface decoration-transparent">
                <Icon name="add_circle" className="text-primary" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase text-center leading-tight">Add<br/>Yield</span>
              </Link>
              <Link to="/expenses" className="flex-1 min-w-[80px] bg-surface-container-highest p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-surface-bright transition-colors text-on-surface decoration-transparent">
                <Icon name="payments" className="text-primary" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase text-center leading-tight">Add<br/>Expense</span>
              </Link>
              <Link to="/sales" className="flex-1 min-w-[80px] bg-surface-container-highest p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-surface-bright transition-colors text-on-surface decoration-transparent">
                <Icon name="sell" className="text-primary" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase text-center leading-tight">Add<br/>Sale</span>
              </Link>
              <Link to="/incidents" className="flex-1 min-w-[80px] bg-surface-container-highest p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-surface-bright transition-colors text-on-surface decoration-transparent">
                <Icon name="report_problem" className="text-error" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase text-center leading-tight">Report<br/>Issue</span>
              </Link>
              <Link to="/audit" className="flex-1 min-w-[80px] bg-surface-container-highest p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-surface-bright transition-colors text-on-surface decoration-transparent">
                <Icon name="fact_check" className="text-tertiary" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase text-center leading-tight">Stock<br/>Audit</span>
              </Link>
            </div>
          </section>
        )}

        {/* Alerts */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant">Critical Alerts</h2>
            <Link to="/incidents" className="text-[10px] font-bold text-primary uppercase cursor-pointer decoration-transparent">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeIncidents.slice(0, 3).map(inc => (
              <Link to={`/incidents/${inc.id}`} key={inc.id} className={`bg-surface-container-low p-4 rounded-2xl flex gap-4 items-start border-l-4 cursor-pointer hover:bg-surface-container-highest transition-colors decoration-transparent text-on-surface ${inc.severity === 'CRITICAL' || inc.severity === 'HIGH' ? 'border-error' : inc.severity === 'MEDIUM' ? 'border-primary' : 'border-outline/30'}`}>
                <Icon name={inc.severity === 'CRITICAL' || inc.severity === 'HIGH' ? 'warning' : 'build'} className={inc.severity === 'CRITICAL' || inc.severity === 'HIGH' ? 'text-error mt-0.5' : 'text-primary mt-0.5'} />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-bold pt-1">{inc.id.toUpperCase()} Alert</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase mt-0.5 ${inc.severity === 'CRITICAL' || inc.severity === 'HIGH' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
                      {inc.severity}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">{inc.description}</p>
                </div>
              </Link>
            ))}
            {activeIncidents.length === 0 && (
              <div className="bg-surface-container-low p-4 rounded-2xl flex gap-4 items-center">
                <Icon name="check_circle" className="text-primary" />
                <span className="text-sm font-bold pt-1">All systems nominal</span>
              </div>
            )}
          </div>
        </section>

      </main>
    </>
  );
};

export default Home;
