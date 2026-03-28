import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useAppContext } from '../contexts/AppContext';

type ChartTab = 'day' | 'week' | 'month' | 'global';

const CHART_DATASETS: Record<ChartTab, { day: string; g: number; change: string; isOff: boolean; hasAlert: boolean; isToday: boolean }[]> = {
  day: [
    { day: 'Mar 18', g: 840,  change: '---',  isOff: false, hasAlert: false, isToday: false },
    { day: 'Mer 19', g: 920,  change: '+9%',  isOff: false, hasAlert: false, isToday: false },
    { day: 'Jeu 20', g: 710,  change: '-22%', isOff: false, hasAlert: false, isToday: false },
    { day: 'Ven 21', g: 1150, change: '+62%', isOff: false, hasAlert: false, isToday: false },
    { day: 'Sam 22', g: 0,    change: 'Off',  isOff: true,  hasAlert: false, isToday: false },
    { day: 'Dim 23', g: 1180, change: '+15%', isOff: false, hasAlert: true,  isToday: false },
    { day: 'Lun 24', g: 1248, change: '+6%',  isOff: false, hasAlert: false, isToday: true  },
  ],
  week: [
    { day: 'S.38', g: 1020, change: '---',  isOff: false, hasAlert: false, isToday: false },
    { day: 'S.39', g: 980,  change: '-4%',  isOff: false, hasAlert: false, isToday: false },
    { day: 'S.40', g: 1100, change: '+12%', isOff: false, hasAlert: false, isToday: false },
    { day: 'S.41', g: 870,  change: '-21%', isOff: false, hasAlert: true,  isToday: false },
    { day: 'S.42', g: 1050, change: '+21%', isOff: false, hasAlert: false, isToday: false },
    { day: 'S.43', g: 1180, change: '+12%', isOff: false, hasAlert: false, isToday: false },
    { day: 'S.44', g: 1120, change: '-5%',  isOff: false, hasAlert: false, isToday: true  },
  ],
  month: [
    { day: 'Avr',  g: 890,  change: '---',  isOff: false, hasAlert: false, isToday: false },
    { day: 'Mai',  g: 1020, change: '+15%', isOff: false, hasAlert: false, isToday: false },
    { day: 'Juin', g: 1150, change: '+13%', isOff: false, hasAlert: false, isToday: false },
    { day: 'Juil', g: 980,  change: '-15%', isOff: false, hasAlert: true,  isToday: false },
    { day: 'Aou',  g: 1080, change: '+10%', isOff: false, hasAlert: false, isToday: false },
    { day: 'Sep',  g: 1200, change: '+11%', isOff: false, hasAlert: false, isToday: false },
    { day: 'Oct',  g: 1120, change: '-7%',  isOff: false, hasAlert: false, isToday: true  },
  ],
  global: [
    { day: '2020', g: 720,  change: '---',  isOff: false, hasAlert: false, isToday: false },
    { day: '2021', g: 890,  change: '+24%', isOff: false, hasAlert: false, isToday: false },
    { day: '2022', g: 1050, change: '+18%', isOff: false, hasAlert: false, isToday: false },
    { day: '2023', g: 1120, change: '+7%',  isOff: false, hasAlert: false, isToday: true  },
    { day: 'Obj.',  g: 1300, change: 'Cible', isOff: false, hasAlert: false, isToday: false },
    { day: '',      g: 0,   change: '',     isOff: true,  hasAlert: false, isToday: false },
    { day: '',      g: 0,   change: '',     isOff: true,  hasAlert: false, isToday: false },
  ],
};

const TAB_LABELS: Record<ChartTab, string> = {
  day: 'Jour vs J-1',
  week: 'Moy. Semaine',
  month: 'Moy. Mensuelle',
  global: 'Global',
};

const Home: React.FC = () => {
  const { role, setIsMenuOpen } = useAppContext();
  const [chartTab, setChartTab] = useState<ChartTab>('day');

  return (
    <>
      <header className="bg-background font-headline font-bold docked full-width top-0 sticky z-50 border-b border-outline-variant/10">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMenuOpen(true)} className="text-on-surface-variant hover:text-primary transition-colors">
              <Icon name="menu" />
            </button>
            <div className="flex items-center gap-2">
              <Icon name="location_on" className="text-primary text-xl" />
              <div className="flex flex-col leading-none">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-on-surface-variant font-medium tracking-normal normal-case">Site opérationnel</span>
                  <div className="flex items-center gap-1 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                    <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                    <span className="text-[8px] font-bold text-green-500 uppercase tracking-tighter">Stable</span>
                  </div>
                </div>
                <span className="text-sm tracking-widest text-primary uppercase">Alpha-01 Nord</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-surface-container-highest px-3 py-1 rounded-full border border-outline-variant/20">
               <span className="text-[10px] font-bold tracking-tighter text-primary uppercase">{role === 'ADMIN' ? 'Administrateur' : role === 'SUPERVISOR' ? 'Superviseur' : 'Observateur'}</span>
            </div>
            <Link to="/profile" className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center border border-outline-variant/20 hover:bg-surface-bright transition-colors decoration-transparent">
              <Icon name="person" className="text-sm opacity-70 text-on-surface" />
            </Link>
          </div>
        </div>
      </header>

      <main className="px-6 mt-6 space-y-8 max-w-lg mx-auto pb-32">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-on-surface-variant text-sm font-medium">Lundi 24 octobre 2023</p>
            <h1 className="font-headline text-3xl font-extrabold tracking-tight">Résumé exécutif</h1>
          </div>
        </div>

        <section className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/10">
          <h2 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-3">Aujourd'hui</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-medium text-green-500">
              <Icon name="check_circle" className="text-sm" />
              Production normale
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-primary">
              <Icon name="warning" className="text-sm" />
              1 incident actif
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-error">
              <Icon name="error" className="text-sm" />
              Écart de stock détecté
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-2xl p-6 metallic-gradient text-on-primary shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
          <div className="flex justify-between items-start mb-2">
            <p className="font-label text-xs font-bold uppercase tracking-[0.1em] opacity-80">Production du jour</p>
            <Icon name="trending_up" className="opacity-70" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-5xl font-black tracking-tighter">1 248,50</span>
            <span className="font-headline text-xl font-bold opacity-90">g</span>
          </div>
          <p className="text-sm font-bold opacity-70 mt-1">≈ 1,25 kg</p>

          <div className="mt-6 pt-4 border-t border-on-primary/10 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[9px] font-bold uppercase opacity-60">Valeur estimée</p>
              <p className="font-headline text-lg font-bold">62 400 $</p>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase opacity-60">Stock après production</p>
              <p className="font-headline text-lg font-bold">44 098 g</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end">
            <Link to="/production" className="text-xs font-bold underline underline-offset-4 decoration-2">Voir détails</Link>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <Link to="/inventory" className="bg-surface-container-low p-4 rounded-2xl space-y-1 col-span-2 flex justify-between items-center border border-outline-variant/10 decoration-transparent">
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Stock actuel</p>
              <p className="font-headline text-2xl text-primary font-bold">42 850 g <span className="text-sm font-medium text-on-surface-variant ml-1">(42,85 kg)</span></p>
            </div>
            <Icon name="inventory_2" className="text-on-surface-variant/40 text-4xl" />
          </Link>
          <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/10">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Ventes&nbsp;<div>mensuelles</div></p>
            <p className="font-headline text-xl text-primary font-bold">1,42 M $</p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/10">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Dépenses mensuelles</p>
            <p className="font-headline text-xl text-error font-bold">842 K $</p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl space-y-2 border border-outline-variant/10 col-span-1">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Production semaine</p>
            <p className="font-headline text-xl text-primary font-bold">8 642 g</p>
            <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[72%]"></div>
            </div>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl space-y-2 border border-outline-variant/10 col-span-1">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Production mensuelle</p>
            <p className="font-headline text-xl text-primary font-bold">34 120 g</p>
            <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[85%]"></div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant">Actions rapides</h2>
          <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
            <Link to="/production" className="flex-shrink-0 w-32 bg-primary p-4 rounded-2xl flex flex-col items-center gap-2 shadow-lg shadow-primary/10 decoration-transparent">
              <Icon name="add_circle" className="text-on-primary" />
              <span className="text-[10px] font-bold uppercase text-center leading-tight text-on-primary">Ajouter<br/>production</span>
            </Link>
            <Link to="/sales" className="flex-shrink-0 w-32 bg-surface-container-highest p-4 rounded-2xl flex flex-col items-center gap-2 border border-outline-variant/10 decoration-transparent hover:bg-surface-bright transition-colors">
              <Icon name="sell" className="text-primary" />
              <span className="text-[10px] font-bold uppercase text-center leading-tight text-on-surface">Ajouter<br/>vente</span>
            </Link>
            <Link to="/incidents" className="flex-shrink-0 w-32 bg-surface-container-highest p-4 rounded-2xl flex flex-col items-center gap-2 border border-outline-variant/10 decoration-transparent hover:bg-surface-bright transition-colors">
              <Icon name="report_problem" className="text-error" />
              <span className="text-[10px] font-bold uppercase text-center leading-tight text-on-surface">Signaler<br/>incident</span>
            </Link>
            <Link to="/expenses" className="flex-shrink-0 w-32 bg-surface-container-highest p-4 rounded-2xl flex flex-col items-center gap-2 border border-outline-variant/10 opacity-80 hover:opacity-100 decoration-transparent hover:bg-surface-bright transition-colors">
              <Icon name="payments" className="text-primary" />
              <span className="text-[10px] font-bold uppercase text-center leading-tight text-on-surface">Ajouter<br/>dépense</span>
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant">Alertes critiques</h2>
            <Link to="/incidents" className="text-[10px] font-bold text-primary uppercase cursor-pointer decoration-transparent">Voir tout</Link>
          </div>
          <div className="space-y-3">
            <div className="bg-surface-container-low p-4 rounded-2xl flex gap-4 items-start border-l-4 border-error">
              <Icon name="warning" className="text-error mt-0.5" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-on-surface">Écart de stock</h3>
                  <span className="text-[10px] bg-error/10 text-error px-2 py-0.5 rounded-full font-bold uppercase">Critique</span>
                </div>
                <p className="text-xs text-on-surface-variant">+12,4 g non expliqués</p>
                <p className="text-[10px] font-bold text-error uppercase mt-1 tracking-tighter">Impact : fiabilité des ventes affectée</p>
              </div>
            </div>
            <div className="bg-surface-container-low p-4 rounded-2xl flex gap-4 items-start border-l-4 border-primary">
              <Icon name="build" className="text-primary mt-0.5" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-on-surface">Panne équipement</h3>
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase">Moyen</span>
                </div>
                <p className="text-xs text-on-surface-variant">Excavatrice X74</p>
                <p className="text-[10px] font-bold text-primary uppercase mt-1 tracking-tighter">Impact : -320 g de production estimée</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low p-5 rounded-2xl space-y-5 mb-8 border border-outline-variant/10">
          <div className="flex justify-between items-baseline">
            <h2 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Tendance sur 7 jours</h2>
            <p className="text-[10px] text-on-surface-variant/60 font-medium">18 oct — 24 oct 2023</p>
          </div>

          {/* Tab bar */}
          <div className="bg-surface-container p-1 rounded-xl flex gap-1 overflow-x-auto no-scrollbar border border-outline-variant/10">
            {(['day', 'week', 'month', 'global'] as ChartTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setChartTab(tab)}
                className={`flex-1 whitespace-nowrap px-3 py-2 rounded-lg text-[9px] font-bold uppercase transition-colors ${
                  chartTab === tab ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-bright'
                }`}
              >
                {TAB_LABELS[tab]}
              </button>
            ))}
          </div>

          {/* Chart area */}
          {(() => {
            const data = CHART_DATASETS[chartTab];
            const maxG = Math.max(...data.map(d => d.g), 1500);
            return (
              <div className="w-full">
                {/* Y-axis grid + bars */}
                <div className="relative" style={{ height: '180px' }}>
                  {/* Grid lines */}
                  {[1500, 1000, 500, 0].map((val) => (
                    <div
                      key={val}
                      className="absolute left-0 right-0 flex items-center pointer-events-none"
                      style={{ bottom: `${(val / maxG) * 100}%` }}
                    >
                      <div className="w-full border-t border-outline-variant/15" />
                      <span className="text-[8px] text-on-surface-variant/40 pl-1 whitespace-nowrap">{val === 0 ? '0' : `${val/1000} kg`}</span>
                    </div>
                  ))}

                  {/* Bars */}
                  <div className="absolute inset-0 flex items-end gap-1 pb-0">
                    {data.map((d) => {
                      const pct = (d.g / maxG) * 100;
                      return (
                        <div key={d.day} className="flex-1 flex flex-col items-center justify-end h-full">
                          {/* Alert icon */}
                          {d.hasAlert && (
                            <div className="mb-1 text-error text-[10px]">
                              <span style={{fontFamily:'Material Symbols Outlined', fontSize:'14px', color:'var(--color-error)'}}>report</span>
                            </div>
                          )}
                          {/* Value label */}
                          {!d.isOff && d.g > 0 && (
                            <span className={`text-[8px] font-bold mb-1 ${d.isToday ? 'text-primary' : 'text-on-surface-variant'}`}>{d.g} g</span>
                          )}
                          {d.isOff && <span className="text-[8px] font-bold mb-1 text-on-surface-variant/50">0 g</span>}
                          {/* Bar */}
                          {d.isOff ? (
                            <div className="w-full" style={{ height: '2px', background: 'var(--color-error)', opacity: 0.3 }} />
                          ) : (
                            <div
                              className={`w-full rounded-t-sm transition-all ${d.isToday ? 'bg-primary shadow-[0_0_12px_rgba(242,202,80,0.3)]' : 'bg-primary/30'}`}
                              style={{ height: `${Math.max(pct, 2)}%` }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* X-axis labels */}
                <div className="flex gap-1 mt-3">
                  {data.map((d) => {
                    const changeNeg = d.change.startsWith('-');
                    const changePos = d.change.startsWith('+');
                    return (
                      <div key={`lbl-${d.day}`} className="flex-1 flex flex-col items-center gap-0.5">
                        <span className={`text-[8px] font-bold uppercase whitespace-nowrap ${d.isToday ? 'text-primary' : 'text-on-surface-variant'}`}>{d.day}</span>
                        <span className={`text-[7px] font-bold ${changeNeg ? 'text-error' : changePos ? 'text-primary' : 'text-on-surface-variant/50'}`}>{d.change}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          <div className="flex justify-center pt-2">
            <div className="bg-surface-container px-5 py-2.5 rounded-full border border-outline-variant/10">
              <span className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest mr-2">Production moyenne :</span>
              <span className="text-xs font-bold text-primary">1 120 g</span>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default Home;
