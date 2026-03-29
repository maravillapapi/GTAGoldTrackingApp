import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useAppContext } from '../contexts/AppContext';

type ChartTab = 'day' | 'week' | 'month';

// 7-day bars NEVER change — only the % comparison mode changes per tab
const DAY_DATA = [
  { day: 'Tue 18', g: 840,  isToday: false, isOff: false },
  { day: 'Wed 19', g: 920,  isToday: false, isOff: false },
  { day: 'Thu 20', g: 710,  isToday: false, isOff: false },
  { day: 'Fri 21', g: 1150, isToday: false, isOff: false },
  { day: 'Sat 22', g: 1020, isToday: false, isOff: false },
  { day: 'Sun 23', g: 1180, isToday: false, isOff: false },
  { day: 'Mon 24', g: 1248, isToday: true,  isOff: false },
];

// Reference values for comparisons
const AVG_7_DAYS   = Math.round(DAY_DATA.reduce((s, d) => s + d.g, 0) / DAY_DATA.length); // 1010
const PREV_DAY_REF = 1180; // Sun 23 — used as J-1 reference for today
const AVG_PREV_WEEK  = 1000;
const AVG_PREV_MONTH = 1080;

const CHART_H = 160;
const MAX_G   = 1500;

function getChange(tab: ChartTab, idx: number): string {
  const d = DAY_DATA[idx];
  if (d.isOff) return 'Off';

  if (tab === 'day') {
    // VS J-1: compare to previous day in the array
    if (idx === 0) return '---';
    const ref = DAY_DATA[idx - 1].g;
    const pct = ((d.g - ref) / ref) * 100;
    return (pct >= 0 ? '+' : '') + pct.toFixed(0) + '%';
  }

  const ref = tab === 'week' ? AVG_PREV_WEEK : AVG_PREV_MONTH;
  const pct = ((d.g - ref) / ref) * 100;
  return (pct >= 0 ? '+' : '') + pct.toFixed(0) + '%';
}

const TAB_LABELS: Record<ChartTab, string> = {
  day:   'VS J-1',
  week:  'VS Moy. Semaine préc.',
  month: 'VS Moy. Mois préc.',
};

const TAB_SUBTITLES: Record<ChartTab, string> = {
  day:   'Variation de chaque jour par rapport au jour précédent',
  week:  'Variation de chaque jour par rapport à la production moyenne de la semaine précédente',
  month: 'Variation de chaque jour par rapport à la production moyenne du mois précédent',
};

const REF_LABEL: Record<ChartTab, string> = {
  day:   'PRODUCTION J-1',
  week:  'MOY. SEMAINE PRÉCÉDENTE',
  month: 'MOY. MOIS PRÉCÉDENT',
};

const REF_VALUE: Record<ChartTab, number> = {
  day:   PREV_DAY_REF,
  week:  AVG_PREV_WEEK,
  month: AVG_PREV_MONTH,
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

      <main className="px-6 mt-6 space-y-8 max-w-lg mx-auto pb-32 page-enter">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-on-surface-variant text-sm font-medium capitalize">
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <h1 className="font-headline text-3xl font-extrabold tracking-tight">Résumé exécutif</h1>
          </div>
        </div>

        <section className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/10 card-lift">
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

        <section className="relative overflow-hidden rounded-2xl p-6 metallic-gradient text-on-primary shadow-[0_20px_40px_rgba(0,0,0,0.3)] card-lift">
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
          <div className="flex justify-between items-baseline mb-2">
            <h2 className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.1em]">Résumé de Tendance (7 Jours)</h2>
            <p className="text-[10px] text-on-surface-variant/60 font-medium whitespace-nowrap ml-4">18 Oct — 24 Oct, 2023</p>
          </div>

          {/* Tab selector — 3 tabs */}
          <div className="bg-surface-container/50 p-1 rounded-xl flex gap-1 border border-outline-variant/10">
            {(['day', 'week', 'month'] as ChartTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setChartTab(tab)}
                className={`flex-1 whitespace-nowrap px-2 py-2 rounded-lg text-[8px] font-black tracking-tight uppercase transition-all ${
                  chartTab === tab ? 'bg-[#F2CA50] text-[#1A1200] shadow-md scale-[1.02]' : 'text-on-surface-variant/60 hover:text-on-surface hover:bg-surface-bright/50'
                }`}
              >
                {TAB_LABELS[tab]}
              </button>
            ))}
          </div>

          {/* Contextual subtitle */}
          <p className="text-[9px] text-on-surface-variant/50 font-medium italic text-center -mt-2">
            {TAB_SUBTITLES[chartTab]}
          </p>

          {/* Chart area — bars use pixel heights for reliable rendering */}
          <div className="w-full">
            <div className="relative" style={{ height: `${CHART_H}px` }}>
              {/* Axe Y grid lines */}
              {[1500, 1000, 500, 0].map((val) => (
                <div
                  key={val}
                  className="absolute left-0 right-0 flex items-center pointer-events-none"
                  style={{ bottom: `${(val / MAX_G) * CHART_H}px` }}
                >
                  <div className="flex-1 border-t border-outline-variant/5" />
                  <span className="text-[8px] font-bold text-on-surface-variant/20 pl-2 w-12 text-right bg-surface-container-low/80 backdrop-blur-sm z-10 relative left-1">
                    {val === 0 ? '0' : val >= 1000 ? `${(val/1000).toFixed(1)}kg` : val}
                  </span>
                </div>
              ))}

              {/* Bars */}
              <div className="absolute inset-0 flex items-end gap-1">
                {DAY_DATA.map((d) => {
                  const barH = d.isOff ? 0 : Math.max((d.g / MAX_G) * CHART_H, 3);
                  return (
                    <div key={d.day} className="flex-1 flex flex-col items-center" style={{ height: `${CHART_H}px` }}>
                      <div className="flex-1" />
                      {!d.isToday && !d.isOff && (
                        <span className="text-[10px] font-bold text-on-surface-variant/70 mb-1 leading-none">
                          {d.g}g
                        </span>
                      )}
                      {d.isOff ? (
                        <div className="w-full bg-error/10 rounded-t-sm" style={{ height: '4px' }} />
                      ) : (
                        <div
                          className={`w-full max-w-[28px] min-w-[12px] rounded-t-md transition-all duration-500 ${
                            d.isToday 
                              ? 'bg-[#F2CA50] shadow-[0_0_20px_rgba(242,202,80,0.4)]' 
                              : d.g > 1100 ? 'bg-[#9A8135]' : d.g > 900 ? 'bg-[#84733F]' : 'bg-[#6B5E38]'
                          }`}
                          style={{ height: `${barH}px` }}
                        >
                          {d.isToday && (
                            <div className="flex flex-col items-center -mt-6">
                              <span className="text-[11px] font-bold text-[#F2CA50] mb-0.5">{d.g}g</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* X-axis: day labels + % */}
            <div className="flex gap-1 mt-4">
              {DAY_DATA.map((d, idx) => {
                const change = getChange(chartTab, idx);
                const isNeg = change.startsWith('-');
                const dayLabel = d.isToday ? 'LUN 24'
                  : d.day === 'Tue 18' ? 'MAR 18'
                  : d.day === 'Wed 19' ? 'MER 19'
                  : d.day === 'Thu 20' ? 'JEU 20'
                  : d.day === 'Fri 21' ? 'VEN 21'
                  : d.day === 'Sat 22' ? 'SAM 22' : 'DIM 23';
                return (
                  <div key={`x-${d.day}`} className="flex-1 flex flex-col items-center gap-1">
                    <span className={`text-[9px] font-black tracking-tighter whitespace-nowrap ${d.isToday ? 'text-[#F2CA50] scale-105' : 'text-on-surface-variant/70'}`}>
                      {dayLabel}
                    </span>
                    <span className={`text-[9px] font-bold ${
                      change === '---' ? 'text-on-surface-variant/30'
                      : d.isOff ? 'text-on-surface-variant/30'
                      : isNeg ? 'text-[#F6495D]' : 'text-[#F2CA50]'
                    }`}>
                      {change}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom block — 2 rows */}
          <div className="flex flex-col items-center pt-2 gap-2">
            <div className="bg-surface-container px-5 py-3 rounded-2xl border border-outline-variant/10 w-full max-w-sm">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[9px] text-on-surface-variant font-bold uppercase tracking-widest">
                  Prod. moy. sur les 7 derniers jours :
                </span>
                <span className="text-xs font-bold text-on-surface ml-2 whitespace-nowrap">
                  {AVG_7_DAYS.toLocaleString('fr-FR')} g
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-outline-variant/10 pt-1.5">
                <span className="text-[9px] text-on-surface-variant font-bold uppercase tracking-widest">
                  {REF_LABEL[chartTab]} :
                </span>
                <span className="text-xs font-bold text-primary ml-2 whitespace-nowrap">
                  {REF_VALUE[chartTab].toLocaleString('fr-FR')} g
                </span>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default Home;
