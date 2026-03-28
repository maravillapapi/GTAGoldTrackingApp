import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useAppContext } from '../contexts/AppContext';

type ChartTab = 'day' | 'week' | 'month' | 'global';

// 7-day bars NEVER change — only the % comparison mode changes per tab
const DAY_DATA = [
  { day: 'Mar 18', g: 840,  hasAlert: false, isToday: false, isOff: false },
  { day: 'Mer 19', g: 920,  hasAlert: false, isToday: false, isOff: false },
  { day: 'Jeu 20', g: 710,  hasAlert: false, isToday: false, isOff: false },
  { day: 'Ven 21', g: 1150, hasAlert: false, isToday: false, isOff: false },
  { day: 'Sam 22', g: 0,    hasAlert: false, isToday: false, isOff: true  },
  { day: 'Dim 23', g: 1180, hasAlert: true,  isToday: false, isOff: false },
  { day: 'Lun 24', g: 1248, hasAlert: false, isToday: true,  isOff: false },
];
const WEEKLY_AVG  = 1000;
const MONTHLY_AVG = 1080;
const GLOBAL_REF  = 920;
const CHART_H = 160;
const MAX_G   = 1500;

function getChange(tab: ChartTab, idx: number): string {
  const d = DAY_DATA[idx];
  if (d.isOff) return 'Off';
  let ref: number;
  if (tab === 'day') {
    let prev = idx - 1;
    while (prev >= 0 && (DAY_DATA[prev].isOff || DAY_DATA[prev].g === 0)) prev--;
    if (prev < 0) return '—';
    ref = DAY_DATA[prev].g;
  } else if (tab === 'week')  { ref = WEEKLY_AVG; }
    else if (tab === 'month') { ref = MONTHLY_AVG; }
    else                      { ref = GLOBAL_REF; }
  const pct = ((d.g - ref) / ref) * 100;
  return (pct >= 0 ? '+' : '') + pct.toFixed(0) + '%';
}

const TAB_LABELS: Record<ChartTab, string> = {
  day:   'Jour vs J-1',
  week:  'Moy. Semaine',
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

          {/* Chart area — bars use pixel heights for reliable rendering */}
          <div className="w-full">
            {/* Chart: grid lines + bars together */}
            <div className="relative" style={{ height: `${CHART_H}px` }}>
              {/* Horizontal grid lines */}
              {[MAX_G, MAX_G * 0.67, MAX_G * 0.33, 0].map((val) => (
                <div
                  key={val}
                  className="absolute left-0 right-0 flex items-center pointer-events-none"
                  style={{ bottom: `${(val / MAX_G) * CHART_H}px` }}
                >
                  <div className="flex-1 border-t border-outline-variant/20" />
                  <span className="text-[7px] text-on-surface-variant/40 pl-1 whitespace-nowrap">
                    {val === 0 ? '0' : `${(val / 1000).toFixed(1)} kg`}
                  </span>
                </div>
              ))}

              {/* Bars row — each column is a portion of the chart width */}
              <div className="absolute inset-0 flex items-end gap-1">
                {DAY_DATA.map((d) => {
                  const barH = d.isOff ? 0 : Math.max((d.g / MAX_G) * CHART_H, 3);
                  return (
                    <div key={d.day} className="flex-1 flex flex-col items-center" style={{ height: `${CHART_H}px` }}>
                      {/* spacer pushes bar to bottom */}
                      <div className="flex-1" />
                      {/* Alert */}
                      {d.hasAlert && (
                        <span style={{ fontFamily: 'Material Symbols Outlined', fontSize: '13px', color: 'var(--color-error)', lineHeight: 1 }}>report</span>
                      )}
                      {/* Value */}
                      {!d.isOff && d.g > 0 && (
                        <span className={`text-[8px] font-bold leading-tight mb-0.5 ${d.isToday ? 'text-primary' : 'text-on-surface-variant'}`}>
                          {d.g}g
                        </span>
                      )}
                      {d.isOff && <span className="text-[7px] text-on-surface-variant/40 mb-0.5">0g</span>}
                      {/* Bar */}
                      {d.isOff ? (
                        <div className="w-full" style={{ height: '2px', background: 'var(--color-error)', opacity: 0.25 }} />
                      ) : (
                        <div
                          className={`w-full max-w-[18px] min-w-[10px] rounded-t-[3px] transition-all duration-300 ${d.isToday ? 'bg-primary' : 'bg-on-surface-variant/20 border border-on-surface-variant/10'}`}
                          style={{
                            height: `${barH}px`,
                            boxShadow: d.isToday ? '0 0 14px rgba(242,202,80,0.35)' : 'none',
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* X-axis labels */}
            <div className="flex gap-1 mt-2">
              {DAY_DATA.map((d, idx) => {
                const change = getChange(chartTab, idx);
                const isNeg = change.startsWith('-');
                const isPos = change.startsWith('+');
                return (
                  <div key={`x-${d.day}`} className="flex-1 flex flex-col items-center gap-0.5">
                    <span className={`text-[7px] font-bold uppercase whitespace-nowrap ${d.isToday ? 'text-primary' : 'text-on-surface-variant'}`}>
                      {d.day}
                    </span>
                    <span className={`text-[7px] font-semibold ${
                      d.isOff ? 'text-on-surface-variant/40' : isNeg ? 'text-error' : isPos ? 'text-primary' : 'text-on-surface-variant/50'
                    }`}>
                      {change}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

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
