import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

const WEEK_DATA = [
  { short: 'Lun', g: 920, type: 'normal' },
  { short: 'Mar', g: 0,   type: 'non-worked' },
  { short: 'Mer', g: 1100, type: 'normal' },
  { short: 'Jeu', g: 800,  type: 'incident' },
  { short: 'Ven', g: 1050, type: 'normal' },
  { short: 'Sam', g: 1320, type: 'normal' },
  { short: 'Auj', g: 1248, type: 'today' },
];
const maxG = Math.max(...WEEK_DATA.map(d => d.g), 1500);

const Production: React.FC = () => {
  const { production, role } = useAppContext();

  const todayProd = 1248.5;
  const weekProd = production.reduce((s, p) => s + p.amountGrams, 0) || 8642;
  const monthProd = 34120;
  const avgProd = 1120;

  return (
    <>
      <AppHeader title="Production" rightIcon="filter_list" rightIconClass="text-on-surface-variant" />

      {/* Site status bar */}
      <div className="px-5 py-3 border-b border-outline-variant/10 flex items-center gap-3 bg-surface">
        <span className="text-[9px] font-black uppercase tracking-widest text-primary">Alpha-01 Nord</span>
        <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-[8px] font-black uppercase tracking-widest text-green-400">Stable</span>
        </div>
      </div>

      <main className="px-5 pt-4 pb-32 max-w-lg mx-auto md:max-w-3xl">

        {/* État de production */}
        <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/10 mb-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant mb-3">État de production</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon name="check_circle" className="text-green-400 text-sm" />
              <span className="text-[11px] text-on-surface">Stable</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="warning" className="text-primary text-sm" />
              <span className="text-[11px] text-on-surface">2 incidents aujourd'hui</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="warning" className="text-primary text-sm" />
              <span className="text-[11px] text-on-surface">Production -12% vs moyenne</span>
            </div>
          </div>
        </div>

        {/* Production du jour — hero card */}
        <div className="metallic-gradient rounded-2xl p-5 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-8 translate-x-8 pointer-events-none"></div>
          <p className="text-[9px] font-black uppercase tracking-widest text-on-primary/80 mb-3">Production aujourd'hui</p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-headline text-4xl font-black text-on-primary tracking-tight">{todayProd.toLocaleString('fr-FR')}</span>
            <span className="text-xl font-headline font-black text-on-primary/80">g</span>
          </div>
          <p className="text-xs text-on-primary/70 mb-4">≈ {(todayProd / 1000).toFixed(2)} kg</p>
          <div className="h-px bg-on-primary/20 mb-4"></div>
          <div className="flex items-center gap-1.5">
            <Icon name="trending_up" className="text-on-primary/90 text-sm" />
            <span className="text-[9px] font-bold text-on-primary/80">Variation : +6% vs période précédente</span>
          </div>
        </div>

        {/* Semaine / Mois */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/10">
            <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant mb-1.5">Semaine</p>
            <p className="font-headline text-xl font-black text-on-surface">{weekProd.toLocaleString()} g</p>
            <p className="text-[8px] text-on-surface-variant mt-1">Production cumulée</p>
          </div>
          <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/10">
            <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant mb-1.5">Mois</p>
            <p className="font-headline text-xl font-black text-on-surface">{monthProd.toLocaleString()} g</p>
            <p className="text-[8px] text-on-surface-variant mt-1">Volume mensuel</p>
          </div>
        </div>

        {/* Moyenne */}
        <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/10 mb-4 flex items-center justify-between">
          <div>
            <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant mb-1">Production moyenne</p>
            <p className="font-headline text-2xl font-black text-on-surface">{avgProd.toLocaleString()} g</p>
          </div>
          <div className="flex gap-1">
            {[0.4, 0.6, 0.8, 1.0, 0.7].map((h, i) => (
              <div key={i} className="w-1.5 rounded-full bg-primary/40" style={{ height: `${h * 36}px` }}></div>
            ))}
          </div>
        </div>

        {/* Tendance semaine — bar chart */}
        <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10 mb-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">Tendance de production</p>
            <div className="flex items-center gap-3 text-[8px] text-on-surface-variant">
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-error/80 rounded-full"></div> Incident</div>
              <div className="flex items-center gap-1"><span className="text-on-surface-variant/50">✕</span> Non travaillé</div>
            </div>
          </div>
          <div className="flex items-end gap-2 h-24">
            {WEEK_DATA.map((d) => {
              const pct = d.g > 0 ? (d.g / maxG) * 100 : 0;
              return (
                <div key={d.short} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
                  {d.type === 'non-worked' && <span className="text-[9px] text-on-surface-variant/40">✕</span>}
                  {d.type === 'incident' && <div className="w-2 h-2 rounded-full bg-error"></div>}
                  {d.g > 0 ? (
                    <div
                      className={`w-full rounded-t-sm transition-all ${
                        d.type === 'today' ? 'bg-primary shadow-[0_0_10px_rgba(242,202,80,0.3)]' :
                        d.type === 'incident' ? 'bg-error/60' :
                        'bg-surface-container-highest'
                      }`}
                      style={{ height: `${Math.max(pct, 5)}%` }}
                    />
                  ) : (
                    <div className="w-full h-px bg-outline/20" />
                  )}
                  <span className={`text-[8px] font-bold uppercase ${d.type === 'today' ? 'text-primary' : 'text-on-surface-variant'}`}>{d.short}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Répartition par équipe & zone */}
        <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10 mb-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Répartition</p>

          <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant/60 mb-3">Par équipe</p>
          {[
            { label: 'Équipe A', g: 520, pct: 42 },
            { label: 'Équipe B', g: 410, pct: 33 },
            { label: 'Équipe C', g: 318, pct: 25 },
          ].map(team => (
            <div key={team.label} className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-on-surface">{team.label}</span>
                <span className="text-[10px] font-black text-primary">{team.g} g</span>
              </div>
              <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary/60 rounded-full" style={{ width: `${team.pct}%` }}></div>
              </div>
            </div>
          ))}

          <div className="h-px bg-outline-variant/10 my-4"></div>

          <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant/60 mb-3">Par zone</p>
          {[
            { label: 'Zone Nord', g: 600, pct: 48, color: 'bg-blue-400/60' },
            { label: 'Zone Sud',  g: 648, pct: 52, color: 'bg-primary/60' },
          ].map(zone => (
            <div key={zone.label} className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-on-surface">{zone.label}</span>
                <span className="text-[10px] font-black text-primary">{zone.g} g</span>
              </div>
              <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div className={`h-full ${zone.color} rounded-full`} style={{ width: `${zone.pct}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Incidents impactants */}
        <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-4 bg-error rounded-full"></div>
            <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">Incidents impactant la production</p>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Panne excavatrice X74', impact: '-320 g' },
              { label: 'Arrêt zone B',          impact: '-180 g' },
            ].map(inc => (
              <div key={inc.label} className="flex items-center justify-between bg-error/5 border border-error/15 rounded-xl p-3 hover:bg-error/10 transition-colors cursor-pointer">
                <div>
                  <p className="text-[10px] font-bold text-on-surface">{inc.label}</p>
                  <p className="text-[8px] text-error">Impact : {inc.impact}</p>
                </div>
                <Icon name="chevron_right" className="text-on-surface-variant" />
              </div>
            ))}
          </div>
          <Link to="/incidents" className="block text-center text-[9px] font-black uppercase tracking-widest text-primary mt-4 py-2">
            Voir tous les incidents
          </Link>
        </div>

        {/* Journal des saisies */}
        <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10 mb-6">
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Journal des saisies</p>
          <div className="space-y-3">
            {[
              { time: '14:20', team: 'Équipe A', g: 320 },
              { time: '12:10', team: 'Équipe B', g: 280 },
              { time: '10:45', team: 'Équipe C', g: 150 },
            ].map(entry => (
              <div key={entry.time} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-[9px] text-on-surface-variant font-mono w-10">{entry.time}</span>
                  <span className="text-[10px] font-bold text-on-surface">{entry.team}</span>
                </div>
                <span className="font-headline font-black text-primary text-sm">{entry.g} g</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        {role !== 'OBSERVER' && (
          <div className="space-y-3">
            <Link to="/production/add" className="flex items-center justify-center gap-2 w-full metallic-gradient py-4 rounded-2xl font-headline font-bold uppercase tracking-widest text-sm text-on-primary hover:opacity-90 transition-opacity">
              <Icon name="add" className="text-xl" />
              Ajouter Production
            </Link>
            <Link to="/production/calendar" className="flex items-center justify-center gap-2 w-full bg-surface-container-low border border-outline-variant/20 py-4 rounded-2xl font-headline font-bold uppercase tracking-widest text-sm text-on-surface hover:bg-surface-container transition-colors">
              <Icon name="calendar_month" className="text-xl" />
              Voir Calendrier
            </Link>
          </div>
        )}

      </main>
    </>
  );
};

export default Production;
