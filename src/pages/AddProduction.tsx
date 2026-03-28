import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';

const SITES = ['North Ridge Vein 04', 'Alpha-01 Nord', 'Beta-02 Sud'];
const ZONES = ['Level 400 - Sector G', 'Level 300 - Sector A', 'Surface - Zone B'];
const TEAMS = ['Vanguard Unit 12', 'Équipe Alpha', 'Équipe Bravo'];
const SHIFTS = ['Alpha (Jour)', 'Beta (Après-midi)', 'Gamma (Nuit)'];

const REFERENCE_EQUIP = [
  { id: 'eq-drill', icon: 'precision_manufacturing', label: 'Drill #42A' },
  { id: 'eq-belt', icon: 'conveyor_belt', label: 'Belt C-9' },
];

const AddProduction: React.FC = () => {
  const { addProduction, role } = useAppContext();
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [shift, setShift] = useState(SHIFTS[0]);
  const [site] = useState(SITES[0]);
  const [zone] = useState(ZONES[0]);
  const [team] = useState(TEAMS[0]);
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSave = (andAnother = false) => {
    if (role === 'OBSERVER') return;
    const grams = parseFloat(amount);
    if (!grams || grams <= 0) {
      setError('La quantité produite doit être une valeur positive.');
      return;
    }
    setError('');
    addProduction({ date, amountGrams: grams, siteLocation: site, notes });
    if (andAnother) {
      setAmount('');
      setNotes('');
    } else {
      navigate('/production');
    }
  };

  return (
    <div className="bg-background min-h-screen text-on-surface font-body pb-32">

      {/* Header */}
      <header className="bg-surface/90 font-headline font-bold uppercase sticky top-0 z-50 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex justify-between items-center w-full px-5 py-4">
          <button onClick={() => navigate(-1)} className="text-on-surface-variant hover:text-primary transition-colors">
            <Icon name="close" className="text-xl" />
          </button>
          <h1 className="text-sm tracking-[0.15em] text-on-surface">Ajout Production</h1>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <Icon name="help_outline" className="text-xl" />
          </button>
        </div>
      </header>

      <main className="px-5 pt-6 max-w-lg mx-auto md:max-w-3xl">

        {/* Operational Context */}
        <div className="mb-6">
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Contexte Opérationnel</p>

          {/* Date + Shift */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-3">
              <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant mb-2">Date</p>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="bg-transparent text-primary font-headline font-black text-sm w-full focus:outline-none cursor-pointer"
              />
            </div>
            <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-3">
              <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant mb-2">Poste</p>
              <select
                value={shift}
                onChange={e => setShift(e.target.value)}
                className="bg-transparent text-on-surface font-bold text-[11px] w-full focus:outline-none"
              >
                {SHIFTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Site */}
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-4 mb-2 flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
            <div>
              <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant mb-1">Site d'extraction</p>
              <p className="font-bold text-sm text-on-surface">{site}</p>
            </div>
            <Icon name="chevron_right" className="text-on-surface-variant" />
          </div>

          {/* Zone */}
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-4 mb-2 flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
            <div>
              <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant mb-1">Zone / Niveau</p>
              <p className="font-bold text-sm text-on-surface">{zone}</p>
            </div>
            <Icon name="chevron_right" className="text-on-surface-variant" />
          </div>

          {/* Team */}
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-4 flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
            <div>
              <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant mb-1">Équipe assignée</p>
              <p className="font-bold text-sm text-on-surface">{team}</p>
            </div>
            <Icon name="chevron_right" className="text-on-surface-variant" />
          </div>
        </div>

        {/* Yield Input */}
        <div className="mb-6">
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Saisie du rendement</p>
          <div className="bg-surface-container-low rounded-2xl border border-outline-variant/10 p-5">
            <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Quantité totale produite</p>
            <div className="flex items-baseline gap-3 mb-2">
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={e => { setAmount(e.target.value); setError(''); }}
                className={`flex-1 bg-transparent font-headline text-4xl font-black focus:outline-none placeholder-on-surface-variant/30 ${amount ? 'text-primary' : 'text-on-surface-variant/40'}`}
                min="0"
                step="0.01"
              />
              <span className="font-headline text-xl font-black text-on-surface-variant">g</span>
            </div>
            {error && (
              <p className="text-[9px] text-error mt-1">{error}</p>
            )}
          </div>
        </div>

        {/* Report Status + Incident Link */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-4">
            <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant mb-2">Statut du rapport</p>
            <div className="flex items-center gap-1.5">
              <Icon name="check_circle" className="text-green-400 text-sm" />
              <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Soumis</span>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-4">
            <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant mb-2">Lien Incident</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-on-surface-variant/60">Aucun lié</span>
              <div className="w-10 h-5 rounded-full bg-surface-container border border-outline-variant/20 flex items-center p-0.5">
                <div className="w-4 h-4 rounded-full bg-on-surface-variant/30"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Referenced Equipment */}
        <div className="mb-6">
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Équipements référencés</p>
          <div className="flex flex-wrap gap-3">
            {REFERENCE_EQUIP.map(eq => (
              <div key={eq.id} className="flex items-center gap-2 bg-surface-container-low rounded-xl border border-primary/20 px-3 py-2.5">
                <Icon name={eq.icon} className="text-primary text-sm" />
                <span className="text-[10px] font-bold text-on-surface">{eq.label}</span>
              </div>
            ))}
            <button className="flex items-center gap-1.5 bg-surface-container-low rounded-xl border border-outline-variant/10 px-3 py-2.5 border-dashed hover:bg-surface-container transition-colors">
              <Icon name="add" className="text-on-surface-variant text-sm" />
              <span className="text-[10px] font-bold text-on-surface-variant">Ajouter</span>
            </button>
          </div>
        </div>

        {/* Supervisor Notes */}
        <div className="mb-8">
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Notes superviseur</p>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Détails d'observation, facteurs environnementaux, performance de l'équipe..."
            rows={4}
            className="w-full bg-surface-container-low rounded-2xl border border-outline-variant/10 p-4 text-sm text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary/40 resize-none transition-colors"
          />
        </div>

        {/* Actions */}
        {role !== 'OBSERVER' ? (
          <div className="space-y-3">
            <button
              onClick={() => handleSave(false)}
              className="w-full metallic-gradient py-4 rounded-2xl font-headline font-bold uppercase tracking-widest text-sm text-on-primary hover:opacity-90 transition-opacity"
            >
              Enregistrer Production
            </button>
            <button
              onClick={() => handleSave(true)}
              className="w-full bg-surface-container-low border border-outline-variant/20 py-4 rounded-2xl font-headline font-bold uppercase tracking-widest text-sm text-on-surface hover:bg-surface-container transition-colors"
            >
              Enregistrer et en Ajouter une Autre
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full py-3 text-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-error transition-colors"
            >
              Annuler et Rejeter le Brouillon
            </button>
          </div>
        ) : (
          <div className="bg-error/5 border border-error/20 rounded-2xl p-4 text-center">
            <p className="text-[10px] font-bold text-error uppercase tracking-widest">Accès Lecture Seule</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default AddProduction;
