import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';
import { useNavigate, Link } from 'react-router-dom';

const Incidents: React.FC = () => {
  const { incidents, addIncident, role } = useAppContext();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'>('MEDIUM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || role === 'OBSERVER') return;
    
    addIncident({
      date: new Date().toISOString(),
      description,
      severity,
      equipmentId: undefined
    });

    setDescription('');
    setSeverity('MEDIUM');
  };

  return (
    <>
      <header className="bg-background text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-on-surface-variant hover:text-on-surface transition-colors pb-1">
              <Icon name="arrow_back_ios_new" />
            </button>
            <h1 className="text-xl tracking-tight">Audit / Incidents</h1>
          </div>
          <Icon name="report_problem" className="text-error" />
        </div>
      </header>

      <main className="px-6 mt-4 space-y-8 pb-32">
        {role !== 'OBSERVER' && (
          <section className="bg-surface-container-low p-6 rounded-2xl shadow-lg border-l-4 border-error">
            <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface mb-4">Signaler Nouvel Incident</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Sévérité</label>
                <select 
                  className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-headline font-bold focus:border-error focus:outline-none focus:ring-1 focus:ring-error w-full transition-colors"
                  value={severity} 
                  onChange={e => setSeverity(e.target.value as any)}
                >
                  <option value="CRITICAL">Critique</option>
                  <option value="HIGH">Haute</option>
                  <option value="MEDIUM">Moyenne</option>
                  <option value="LOW">Basse</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pt-1">Description</label>
                <textarea 
                  className="bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm font-body focus:border-error focus:outline-none focus:ring-1 focus:ring-error w-full h-24 transition-colors"
                  placeholder="Décrivez le problème..." 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  required 
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={!description}
                className={`mt-2 p-4 rounded-xl flex items-center justify-center gap-2 font-headline uppercase font-bold text-xs tracking-widest transition-opacity ${description ? 'bg-error text-on-error shadow-[0_5px_15px_rgba(255,180,171,0.2)]' : 'bg-surface-container-highest opacity-50 text-on-surface-variant cursor-not-allowed'}`}
              >
                <Icon name="add_circle" className={description ? "" : ""} />
                Signaler Incident
              </button>
            </form>
          </section>
        )}

        <section className="space-y-4">
          <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant border-b border-outline/10 pb-2">Registre Actif</h2>
          <div className="space-y-3">
            {[...incidents].reverse().map(inc => (
              <Link to={`/incidents/${inc.id}`} key={inc.id} className={`bg-surface-container-low p-4 rounded-2xl flex flex-col gap-2 border-l-4 decoration-transparent hover:bg-surface-container-highest transition-colors cursor-pointer ${inc.severity === 'CRITICAL' || inc.severity === 'HIGH' ? 'border-error' : inc.severity === 'MEDIUM' ? 'border-primary' : 'border-outline/30'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Icon name="warning" className={inc.severity === 'CRITICAL' || inc.severity === 'HIGH' ? 'text-error' : 'text-primary'} />
                    <span className="font-headline font-bold pt-1 text-on-surface">{inc.id}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase pt-1 ${inc.status === 'OPEN' ? 'bg-error/10 text-error' : 'bg-surface-container-highest text-on-surface-variant'}`}>{inc.status === 'OPEN' ? 'OUVERT' : 'RÉSOLU'}</span>
                </div>
                <p className="text-sm text-on-surface-variant mt-1">{inc.description}</p>
                <div className="flex justify-between items-center mt-2 border-t border-outline/10 pt-3">
                  <span className="text-[10px] text-on-surface-variant tracking-widest uppercase font-bold">{new Date(inc.date).toLocaleDateString()}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${inc.severity === 'CRITICAL' ? 'text-error' : 'text-primary'}`}>Priorité {inc.severity === 'CRITICAL' ? 'Critique' : inc.severity === 'HIGH' ? 'Haute' : inc.severity === 'MEDIUM' ? 'Moyenne' : 'Basse'}</span>
                </div>
              </Link>
            ))}
            {incidents.length === 0 && (
              <p className="text-sm font-body text-on-surface-variant text-center my-8">Aucun incident dans le système.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Incidents;
