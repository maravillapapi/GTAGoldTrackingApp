import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Icon } from '../components/Icon';

const IncidentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { incidents, equipment } = useAppContext();

  const incident = incidents.find(inc => inc.id === id);

  if (!incident) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-on-surface-variant gap-4">
        <Icon name="error" className="text-4xl" />
        <h2 className="font-headline font-bold">Incident Introuvable</h2>
        <button onClick={() => navigate('/incidents')} className="text-primary font-bold uppercase tracking-widest text-xs border border-primary/30 px-4 py-2 rounded-xl">Retour aux Registres</button>
      </div>
    );
  }

  const relatedEquipment = incident.equipmentId ? equipment.find(e => e.id === incident.equipmentId) : null;
  const isCritical = incident.severity === 'CRITICAL' || incident.severity === 'HIGH';

  return (
    <>
      <header className="bg-[#131313] text-on-surface font-headline font-bold uppercase sticky top-0 z-40 bg-opacity-90 backdrop-blur-md border-b border-outline/10">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/incidents')} className="text-on-surface-variant hover:text-on-surface transition-colors pb-1">
              <Icon name="arrow_back_ios_new" />
            </button>
            <h1 className="text-xl tracking-tight">Incident {incident.id}</h1>
          </div>
          <Icon name="report_problem" className={isCritical ? "text-error" : "text-primary"} />
        </div>
      </header>

      <main className="px-6 mt-6 space-y-8 max-w-lg mx-auto md:max-w-xl pb-32">
        
        {/* Header Block */}
        <section className="bg-surface-container-low p-6 rounded-2xl relative overflow-hidden shadow-lg border-l-4" style={{ borderColor: isCritical ? 'var(--error)' : 'var(--primary)' }}>
          <h2 className="font-headline text-2xl font-bold mb-4">{incident.description.substring(0, 30)}{incident.description.length > 30 ? '...' : ''}</h2>
          
          <div className="grid grid-cols-2 gap-4 border-b border-outline/10 pb-4 mb-4">
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Site/Zone</p>
              <p className="font-headline font-bold mt-1">Aurum-7 / Secteur B</p>
            </div>
            <div>
               <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Catégorie</p>
               <p className="font-headline font-bold mt-1">Panne d'Équipement</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Impact Opérationnel</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-highest p-3 rounded-xl border border-outline/5 border-l-2 border-l-error">
                <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">Perte de Production</p>
                <p className="font-headline font-bold text-lg text-error">450 g</p>
              </div>
              <div className="bg-surface-container-highest p-3 rounded-xl border border-outline/5 border-l-2 border-l-error">
                <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">Impact Financier</p>
                <p className="font-headline font-bold text-lg text-error">$12,400</p>
              </div>
              <div className="bg-surface-container-highest p-3 rounded-xl border border-outline/5">
                <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">Durée</p>
                <p className="font-headline font-bold text-sm">2h 15m</p>
              </div>
              <div className="bg-surface-container-highest p-3 rounded-xl border border-outline/5">
                <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">Actif Lié</p>
                <p className="font-headline font-bold text-[11px] truncate uppercase">{relatedEquipment ? relatedEquipment.name : 'N/A'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Narrative */}
        <section>
          <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4 pl-2">Récit de l'Incident</h3>
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline/10">
            <p className="text-sm text-on-surface leading-relaxed">{incident.description}</p>
            <div className="mt-4 pt-4 border-t border-outline/10 flex justify-between items-center text-xs text-on-surface-variant uppercase font-bold tracking-widest">
              <span>{new Date(incident.date).toLocaleDateString()}</span>
              <span>{new Date(incident.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </section>

        {/* Oversight Timeline */}
        <section>
          <h3 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4 pl-2">Chronologie de Supervision</h3>
          
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline/10 space-y-6 relative before:absolute before:inset-0 before:ml-9 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-outline/20 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-surface-container-low bg-primary text-surface-container-low shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow whitespace-nowrap z-10"></div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] bg-surface-container-highest p-4 rounded-xl border border-outline/5">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-xs uppercase tracking-widest text-primary">Note du Superviseur</div>
                </div>
                <div className="text-sm text-on-surface">"Évaluation initiale terminée. Redémarrage autorisé en attente d'une réinitialisation manuelle."</div>
                <div className="text-[9px] uppercase tracking-widest mt-2 font-bold text-on-surface-variant flex items-center gap-1"><Icon name="person" className="text-[12px]" /> J. Miller</div>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-surface-container-low bg-surface-container-highest text-on-surface-variant shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow whitespace-nowrap z-10"></div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] bg-surface-container-highest p-4 rounded-xl border border-outline/5">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-xs uppercase tracking-widest text-on-surface-variant">Changement de Statut</div>
                </div>
                <div className="text-sm text-on-surface">Passé de Signalé à En Revue</div>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group border-error/50">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-surface-container-low bg-error text-error shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow whitespace-nowrap z-10"></div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] bg-error/10 p-4 rounded-xl border border-error/20">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-xs uppercase tracking-widest text-error">Entrée de Registre Créée</div>
                </div>
                <div className="text-sm text-on-surface">Alerte système automatisée déclenchée. Superviseur en route.</div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </>
  );
};

export default IncidentDetail;
