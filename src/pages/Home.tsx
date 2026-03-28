import React from 'react';
import { Icon } from '../components/Icon';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="bg-[#131313] min-h-screen text-[#E5E2E1] font-body selection:bg-primary/30">
      
      {/* Top Header */}
      <header className="flex justify-between items-center px-6 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <Icon name="location_on" className="text-[#F2CA50] text-xl" />
          <div className="flex flex-col">
            <span className="text-[9px] text-[#D0C5AF]">Site Opérationnel</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#F2CA50]">ALPHA-01 NORD</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#242323] border border-outline/10 rounded-full px-4 py-1.5 flex items-center">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#D0C5AF]">ADMIN</span>
          </div>
          <div className="relative">
            <Icon name="notifications" className="text-[#F2CA50] text-xl" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#F2CA50] rounded-full border-2 border-[#131313]"></span>
          </div>
        </div>
      </header>

      <main className="px-6 mt-6 max-w-lg mx-auto md:max-w-2xl pb-32">
        
        {/* Page Header */}
        <div className="flex flex-col mb-8">
          <span className="text-xs font-bold text-[#b4a996] mb-1">Lundi 24 Oct 2023</span>
          <h1 className="font-headline text-[32px] font-extrabold tracking-tight leading-none text-white">Synthèse Exécutive</h1>
        </div>

        {/* Primary KPI Card */}
        <div className="bg-[#F2CA50] rounded-[24px] p-6 text-[#131313] shadow-[0_10px_40px_rgba(242,202,80,0.15)] mb-4 relative overflow-hidden group">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
          
          <div className="flex justify-between items-start mb-2 relative z-10">
            <h2 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#131313]/70">Production du Jour</h2>
            <Icon name="trending_up" className="text-[#131313] opacity-80" />
          </div>
          
          <div className="flex items-baseline gap-2 mb-6 relative z-10">
            <span className="font-headline text-[44px] font-black tracking-tighter leading-none">1,248.50</span>
            <span className="font-headline text-2xl font-bold">g</span>
          </div>
          
          <div className="flex justify-between items-end relative z-10">
            <div className="bg-[#131313]/10 px-3 py-1.5 rounded-[8px]">
              <span className="text-[10px] font-bold text-[#131313]">≈ 1.25 kg AU</span>
            </div>
            <Link to="/production/2023-10-24" className="text-[11px] font-extrabold text-[#131313] border-b-2 border-[#131313] pb-0.5 hover:opacity-70 transition-opacity">
              Voir Détails
            </Link>
          </div>
        </div>

        {/* Secondary KPIs */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-[#1C1B1B] rounded-[24px] p-5 border border-outline/5 relative overflow-hidden">
            <h3 className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] mb-3">Prod. Hebdo</h3>
            <p className="font-headline text-[22px] font-bold text-[#F2CA50] mb-3 tracking-tight">8,642.10 g</p>
            <div className="h-1 bg-outline/10 rounded-full w-full overflow-hidden flex">
              <div className="h-full bg-[#F2CA50] w-[65%]"></div>
            </div>
          </div>
          <div className="bg-[#1C1B1B] rounded-[24px] p-5 border border-outline/5 relative overflow-hidden">
            <h3 className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] mb-3">Prod. Mensuelle</h3>
            <p className="font-headline text-[22px] font-bold text-[#F2CA50] mb-3 tracking-tight">34,120.00 g</p>
            <div className="h-1 bg-outline/10 rounded-full w-full overflow-hidden flex">
              <div className="h-full bg-[#F2CA50] w-[80%]"></div>
            </div>
          </div>
        </div>

        {/* Third Row KPI */}
        <div className="bg-[#1C1B1B] rounded-[24px] p-5 border border-outline/5 mb-4 flex justify-between items-center">
          <div>
            <h3 className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] mb-2">Réserve d'Or (Chambre Forte)</h3>
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-[22px] font-bold text-[#F2CA50] tracking-tight">42,850 g</span>
              <span className="text-[11px] font-bold text-[#D0C5AF]/60">(42.85 kg)</span>
            </div>
          </div>
          <div className="bg-[#242323] p-3 rounded-2xl border border-outline/5">
            <Icon name="inventory_2" className="text-[#59481A] text-xl" />
          </div>
        </div>

        {/* Financial KPIs */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-[#1C1B1B] rounded-[24px] p-5">
            <h3 className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] mb-1">Ventes Mensuelles</h3>
            <p className="font-headline text-[28px] font-bold text-[#BFCDFF] tracking-tight">$1.42M</p>
          </div>
          <div className="bg-[#1C1B1B] rounded-[24px] p-5">
            <h3 className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] mb-1">Dépenses</h3>
            <p className="font-headline text-[28px] font-bold text-[#FF8888] tracking-tight">$842K</p>
          </div>
        </div>

        {/* Administrative Controls */}
        <section className="mb-10">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D0C5AF] mb-4">Contrôles Administratifs</h3>
          <div className="grid grid-cols-3 gap-3">
            <button className="bg-[#1C1B1B] hover:bg-[#2A2929] transition-colors rounded-[24px] p-5 flex flex-col items-center justify-center border border-outline/5 group">
              <div className="bg-[#F2CA50]/10 p-2.5 rounded-full mb-3 group-hover:scale-110 transition-transform">
                <Icon name="add_circle" className="text-[#F2CA50] text-lg" />
              </div>
              <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] text-center leading-relaxed">Ajouter<br/>Production</span>
            </button>
            <button className="bg-[#1C1B1B] hover:bg-[#2A2929] transition-colors rounded-[24px] p-5 flex flex-col items-center justify-center border border-outline/5 group">
              <div className="bg-[#F2CA50]/10 p-2.5 rounded-full mb-3 group-hover:scale-110 transition-transform">
                <Icon name="payments" className="text-[#F2CA50] text-lg" />
              </div>
              <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] text-center leading-relaxed">Ajouter<br/>Dépense</span>
            </button>
            <button className="bg-[#1C1B1B] hover:bg-[#2A2929] transition-colors rounded-[24px] p-5 flex flex-col items-center justify-center border border-outline/5 group">
              <div className="bg-[#F2CA50]/10 p-2.5 rounded-full mb-3 group-hover:scale-110 transition-transform">
                <Icon name="sell" className="text-[#F2CA50] text-lg" />
              </div>
              <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] text-center leading-relaxed">Ajouter<br/>Vente</span>
            </button>
          </div>
        </section>

        {/* Critical Alerts */}
        <section className="mb-10">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D0C5AF]">Alertes Critiques</h3>
            <Link to="/incidents" className="text-[9px] font-black uppercase tracking-widest text-[#F2CA50] hover:opacity-70 transition-opacity">
              Voir Tout
            </Link>
          </div>
          <div className="space-y-3">
            <Link to="/incidents/INC-84" className="bg-[#1C1B1B] p-5 rounded-[24px] flex items-center justify-between group border-l-[3px] border-[#FF8888] hover:bg-[#2A2929] transition-all overflow-hidden relative">
              <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#FF8888]/10 to-transparent pointer-events-none"></div>
              <div className="flex items-start gap-4 z-10">
                <Icon name="warning" className="text-[#FF8888] mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-white mb-0.5">Incohérence des Stocks</span>
                  <span className="text-[11px] text-[#D0C5AF]">Site Beta-02 : Écart de 12.4g.</span>
                </div>
              </div>
              <div className="bg-[#FF8888]/10 px-2 py-1 rounded-[6px] border border-[#FF8888]/20 z-10">
                <span className="text-[8px] font-black uppercase tracking-widest text-[#FF8888]">Haute</span>
              </div>
            </Link>
            
            <Link to="/incidents/INC-85" className="bg-[#1C1B1B] p-5 rounded-[24px] flex items-center justify-between group border-l-[3px] border-[#F2CA50] hover:bg-[#2A2929] transition-all overflow-hidden relative">
              <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#F2CA50]/10 to-transparent pointer-events-none"></div>
              <div className="flex items-start gap-4 z-10">
                <Icon name="build" className="text-[#F2CA50] mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-white mb-0.5">Panne Machine</span>
                  <span className="text-[11px] text-[#D0C5AF]">Excavateur X74 : Panne hydraulique.</span>
                </div>
              </div>
              <div className="bg-[#F2CA50]/10 px-2 py-1 rounded-[6px] border border-[#F2CA50]/20 z-10">
                <span className="text-[8px] font-black uppercase tracking-widest text-[#F2CA50]">Moy.</span>
              </div>
            </Link>
          </div>
        </section>

        {/* 7-Day Trend Chart */}
        <section className="bg-[#1C1B1B] p-6 rounded-[32px] mb-8 border border-outline/5 relative overflow-hidden">
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D0C5AF]">Tendance sur 7 Jours</h3>
            <span className="text-[9px] text-[#D0C5AF] tracking-wider">18 Oct — 24 Oct 2023</span>
          </div>
          
          <div className="flex border border-outline/10 rounded-[10px] bg-[#131313] p-1 mb-10">
            <button className="flex-1 bg-[#F2CA50] text-[#131313] rounded-[6px] py-2 text-[8px] font-extrabold uppercase tracking-widest shadow-sm">Jour/Jour</button>
            <button className="flex-1 text-[#D0C5AF] rounded-[6px] py-2 text-[8px] font-bold uppercase tracking-widest hover:text-white transition-colors">Moy. Semaine</button>
            <button className="flex-1 text-[#D0C5AF] rounded-[6px] py-2 text-[8px] font-bold uppercase tracking-widest hover:text-white transition-colors">Moy. Mois</button>
            <button className="flex-1 text-[#D0C5AF] rounded-[6px] py-2 text-[8px] font-bold uppercase tracking-widest hover:text-white transition-colors">Historique</button>
          </div>

          <div className="relative h-64 w-full flex items-end justify-between pt-8 pb-10">
            {/* Chart Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pt-8 pb-10 pointer-events-none">
              <div className="w-full border-b border-outline/10 flex justify-end">
                <span className="text-[7px] text-[#D0C5AF]/50 -mt-2 bg-[#1C1B1B] pl-2 -mr-1 rounded-bl">1.5kg</span>
              </div>
              <div className="w-full border-b border-dashed border-outline/10 flex justify-end"></div>
              <div className="w-full border-b border-dashed border-outline/10 flex justify-end"></div>
              <div className="w-full border-b border-outline/20"></div>
            </div>

            {/* Chart Bars */}
            {[
              { day: 'Mar 18', stat: '...', value: '840g', h: '56%', trend: 'none' },
              { day: 'Mer 19', stat: '+9%', value: '920g', h: '61.3%', trend: 'up' },
              { day: 'Jeu 20', stat: '-22%', value: '710g', h: '47.3%', trend: 'down' },
              { day: 'Ven 21', stat: '+62%', value: '1150g', h: '76.6%', trend: 'up' },
              { day: 'Sam 22', stat: '-11%', value: '1020g', h: '68%', trend: 'down' },
              { day: 'Dim 23', stat: '+15%', value: '1180g', h: '78.6%', trend: 'up' },
              { day: 'Lun 24', stat: '+6%', value: '1248g', h: '83.2%', active: true, trend: 'up' }
            ].map((col, idx) => (
              <div key={idx} className="relative flex flex-col items-center justify-end h-full w-[11%] group">
                <span className={`absolute -top-5 text-[9px] font-bold transition-opacity ${col.active ? 'text-[#F2CA50]' : 'text-white/80 group-hover:opacity-100 opacity-60'}`}>
                  {col.value}
                </span>
                
                <div 
                  className={`w-full rounded-sm transition-all duration-500 ease-out origin-bottom ${col.active ? 'bg-[#F2CA50] shadow-[0_0_15px_rgba(242,202,80,0.2)]' : 'bg-[#5B502C] hover:bg-[#685D36]'}`}
                  style={{ height: col.h }}
                ></div>

                <div className="absolute -bottom-9 flex flex-col items-center whitespace-nowrap">
                  <span className={`text-[8px] font-bold leading-tight ${col.active ? 'text-[#F2CA50]' : 'text-[#D0C5AF]'}`}>
                    {col.day}
                  </span>
                  <span className={`text-[8px] font-bold mt-0.5 ${col.trend === 'up' ? 'text-white' : col.trend === 'down' ? 'text-[#FF8888]' : 'text-[#D0C5AF]'}`}>
                    {col.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;
