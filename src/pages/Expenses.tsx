import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

type Category = 'ALL' | 'FUEL' | 'MAINTENANCE' | 'LABOR' | 'PARTS';

const CATEGORY_LABELS: Record<string, string> = {
  FUEL: 'Carburant',
  MAINTENANCE: 'Maintenance',
  LABOR: "Main d'œuvre",
  PARTS: 'Pièces',
  OTHER: 'Autre'
};

const CATEGORY_ICONS: Record<string, string> = {
  FUEL: 'local_gas_station',
  MAINTENANCE: 'build',
  LABOR: 'engineering',
  PARTS: 'settings_slow_motion',
  OTHER: 'receipt'
};

const Expenses: React.FC = () => {
  const { expenses, role } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');

  const filtered = activeCategory === 'ALL'
    ? expenses
    : expenses.filter(e => e.category === activeCategory);

  const monthlyTotal = expenses.reduce((s, e) => s + e.amount, 0);
  const weeklyTotal = expenses.filter(e => {
    const d = new Date(e.date);
    const now = new Date();
    return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000;
  }).reduce((s, e) => s + e.amount, 0);

  const fixedTotal = expenses.filter(e => ['MAINTENANCE', 'LABOR'].includes(e.category)).reduce((s, e) => s + e.amount, 0);
  const variableTotal = expenses.filter(e => ['FUEL', 'PARTS'].includes(e.category)).reduce((s, e) => s + e.amount, 0);

  // Group by date
  const byDate = filtered.reduce<Record<string, typeof filtered>>((acc, exp) => {
    const dateKey = new Date(exp.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(exp);
    return acc;
  }, {});

  const categories: Category[] = ['ALL', 'FUEL', 'MAINTENANCE', 'LABOR', 'PARTS'];
  const catLabels: Record<Category, string> = {
    ALL: 'Tout',
    FUEL: 'Carburant',
    MAINTENANCE: 'Maintenance',
    LABOR: "Main d'œuvre",
    PARTS: 'Pièces'
  };

  return (
    <>
      <AppHeader title="Financial Oversight" rightIcon="account_balance_wallet" rightIconClass="text-primary" />

      <main className="px-5 pt-4 pb-32 max-w-lg mx-auto md:max-w-3xl">

        {/* Subtitle */}
        <div className="mb-6">
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-0.5">Capital opérationnel</p>
          <h1 className="font-headline text-2xl font-black text-on-surface tracking-tight leading-none">Suivi des<br/>Dépenses</h1>
        </div>

        {/* Add Expense CTA */}
        {role !== 'OBSERVER' && (
          <Link to="/expenses/add" className="flex items-center justify-center gap-2 w-full metallic-gradient py-4 rounded-2xl font-headline font-bold uppercase tracking-widest text-sm text-on-primary mb-6 hover:opacity-90 transition-opacity">
            <Icon name="add" className="text-xl" />
            <span>Ajouter une Dépense</span>
          </Link>
        )}

        {/* KPIs */}
        <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10 mb-4">
          <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Dépenses Mensuelles</p>
          <p className="font-headline text-3xl font-black text-on-surface tracking-tight">${monthlyTotal.toLocaleString()}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <Icon name="trending_up" className="text-error text-[12px]" />
            <span className="text-[9px] text-error font-bold">+4,2% vs mois précédent</span>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10 mb-4">
          <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Dépenses Hebdomadaires</p>
          <p className="font-headline text-3xl font-black text-on-surface tracking-tight">${weeklyTotal > 0 ? weeklyTotal.toLocaleString() : '98,200'}</p>
          <div className="h-1.5 bg-error/20 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-error rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/10">
            <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Fixes</p>
            <p className="font-headline text-xl font-black text-on-surface">${(fixedTotal / 1000).toFixed(0)}K</p>
          </div>
          <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/10">
            <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Variables</p>
            <p className="font-headline text-xl font-black text-on-surface">${(variableTotal / 1000).toFixed(0)}K</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-5">
          <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">Filtre par Catégorie</p>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                  activeCategory === cat
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-surface-container border-outline-variant/20 text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {catLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Filters row */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-surface-container-low rounded-xl px-3 py-2.5 border border-outline-variant/10">
            <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">Période</span>
            <Icon name="expand_more" className="text-on-surface-variant text-sm ml-auto" />
          </div>
          <div className="flex-1 flex items-center gap-2 bg-surface-container-low rounded-xl px-3 py-2.5 border border-outline-variant/10">
            <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">Site minier</span>
            <Icon name="expand_more" className="text-on-surface-variant text-sm ml-auto" />
          </div>
        </div>

        {/* Transactions */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">Transactions récentes</p>
            <p className="text-[9px] text-on-surface-variant/60 uppercase tracking-widest">Triées par date</p>
          </div>

          <div className="space-y-6">
            {Object.entries(byDate).map(([dateLabel, exps]) => (
              <div key={dateLabel}>
                {exps.map(exp => (
                  <div key={exp.id} className="bg-surface-container-low rounded-2xl border border-outline-variant/10 overflow-hidden mb-3">
                    {/* Date + Amount header */}
                    <div className="flex justify-between items-start px-4 pt-4 pb-3 border-b border-outline-variant/10">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">
                        {new Date(exp.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
                      </span>
                      <span className="font-headline text-lg font-black text-on-surface">${exp.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>

                    {/* Vendor + details */}
                    <div className="px-4 pb-4 pt-3">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center border border-outline-variant/10 shrink-0">
                          <Icon name={CATEGORY_ICONS[exp.category] || 'receipt'} className="text-primary text-base" />
                        </div>
                        <div>
                          <p className="font-headline font-bold text-sm text-on-surface leading-tight">{exp.vendor || 'Fournisseur inconnu'}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[8px] font-black uppercase tracking-widest bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full border border-outline-variant/10">
                              {CATEGORY_LABELS[exp.category] || exp.category}
                            </span>
                            <span className="text-[8px] text-on-surface-variant">{exp.txnNumber}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          {exp.equipmentLabel ? (
                            <>
                              <Icon name="precision_manufacturing" className="text-on-surface-variant text-[12px]" />
                              <span className="text-[9px] text-on-surface-variant">{exp.equipmentLabel}</span>
                            </>
                          ) : (
                            <span className="text-[9px] text-on-surface-variant/50 italic">Aucun équipement lié</span>
                          )}
                        </div>
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                          exp.status === 'VERIFIED'
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : 'bg-primary/10 text-primary border-primary/20'
                        }`}>
                          <Icon name={exp.status === 'VERIFIED' ? 'check_circle' : 'warning'} className="text-[10px]" />
                          {exp.status === 'VERIFIED' ? 'Vérifié' : 'En attente'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Expenses;
