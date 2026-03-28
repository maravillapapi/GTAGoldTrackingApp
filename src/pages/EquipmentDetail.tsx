import React from 'react';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero.png'; // Using the standard hero image available

const EquipmentDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#131313] min-h-screen text-[#E5E2E1] font-body selection:bg-primary/30 pb-32">
      
      {/* Top App Bar - Overlaid on Image */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-gradient-to-b from-black/80 to-transparent md:pl-32">
        <button onClick={() => navigate(-1)} className="text-[#F2CA50] hover:text-white transition-colors">
          <Icon name="arrow_back" className="text-2xl" />
        </button>
        <h1 className="font-headline font-bold text-sm tracking-widest text-white">Excavateur XT-900</h1>
        <button className="text-[#F2CA50] hover:text-white transition-colors">
          <Icon name="more_vert" className="text-2xl" />
        </button>
      </div>

      <main className="max-w-lg mx-auto md:max-w-2xl">
        
        {/* Hero Image & Title Area */}
        <div className="relative h-[300px] w-full bg-[#1C1B1B] -mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-full md:rounded-b-[40px] overflow-hidden mb-6">
          <img 
            src={heroImg} 
            alt="Excavator XT-900" 
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/60 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#F2CA50] mb-2 block">ID: XT-900-ALPHA</span>
            <h2 className="font-headline text-4xl font-extrabold tracking-tight leading-none text-white mb-4">Excavateur XT-900</h2>
            
            <div className="flex flex-wrap gap-2">
              <div className="bg-[#1C1B1B]/80 backdrop-blur-md border border-outline/10 rounded-full px-3 py-1.5 flex items-center gap-1.5">
                <Icon name="category" className="text-[#F2CA50] text-[10px]" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#D0C5AF]">Excavation Lourde</span>
              </div>
              <div className="bg-[#1C1B1B]/80 backdrop-blur-md border border-outline/10 rounded-full px-3 py-1.5 flex items-center gap-1.5">
                <Icon name="location_on" className="text-[#F2CA50] text-[10px]" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#D0C5AF]">Site A-12 • Fosse Nord</span>
              </div>
            </div>
          </div>
        </div>

        {/* General Info Card */}
        <div className="px-6 md:px-0">
          <div className="bg-[#1C1B1B] rounded-[24px] p-5 flex border border-outline/5 mb-8">
            <div className="flex-1 border-r border-outline/10">
              <h3 className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] mb-2">Acquisition</h3>
              <p className="font-bold text-white text-sm">12 Jan 2021</p>
            </div>
            <div className="flex-1 pl-5">
              <h3 className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] mb-2">Propriété</h3>
              <p className="font-bold text-white text-sm">Flotte Privée</p>
            </div>
          </div>
          
          {/* Current Condition */}
          <section className="mb-8">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D0C5AF] mb-4">État Actuel</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-[#1C1B1B] rounded-[24px] p-5 relative overflow-hidden group border border-outline/5">
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#F2CA50]"></div>
                <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-[#F2CA50]/10 to-transparent pointer-events-none"></div>
                <h4 className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] mb-3">État Physique</h4>
                <p className="font-headline text-[28px] font-bold text-[#F2CA50] mb-1 tracking-tight">Moyen</p>
                <p className="text-[9px] text-[#D0C5AF] font-medium leading-tight">Nécessite Observation</p>
              </div>
              
              <div className="bg-[#1C1B1B] rounded-[24px] p-5 relative overflow-hidden group border border-outline/5">
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#BFCDFF]"></div>
                <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-[#BFCDFF]/10 to-transparent pointer-events-none"></div>
                <h4 className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] mb-3">Statut Opérationnel</h4>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#BFCDFF] shadow-[0_0_8px_rgba(191,205,255,0.6)]"></div>
                  <p className="font-headline text-xl font-bold text-[#BFCDFF] tracking-tight">Fonctionnel</p>
                </div>
                <p className="text-[9px] text-[#D0C5AF] font-medium leading-tight">En Ligne & Actif</p>
              </div>
            </div>

            <div className="bg-[#1C1B1B] rounded-[24px] p-5 border border-outline/5 relative">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF]">Observation Superviseur</h4>
                <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF]">Oct 24, 08:12</span>
              </div>
              <p className="text-sm text-[#E5E2E1] italic leading-relaxed">
                "Températures hydrauliques légèrement élevées en pic. Surveiller les niveaux de fluides."
              </p>
            </div>
          </section>

          {/* Impact Analytics */}
          <section className="mb-8">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D0C5AF] mb-4">Analyses d'Impact</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#1C1B1B] rounded-[24px] p-5 border border-outline/5">
                <h4 className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] mb-3">Incidents (Mois)</h4>
                <p className="font-headline text-[32px] font-bold text-white mb-3 tracking-tight leading-none">03</p>
                <div className="h-1 bg-outline/10 rounded-full w-full overflow-hidden flex">
                  <div className="h-full bg-[#F2CA50] w-[60%]"></div>
                </div>
              </div>

              <div className="bg-[#1C1B1B] rounded-[24px] p-5 border border-outline/5">
                <h4 className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] mb-3">Arrêt Est. (h)</h4>
                <p className="font-headline text-[32px] font-bold text-white mb-2 tracking-tight leading-none">18h</p>
                <p className="text-[9px] font-bold text-[#BFCDFF]">+2h vs Mois Dernier</p>
              </div>

              <div className="bg-[#1C1B1B] rounded-[24px] p-5 border border-outline/5">
                <h4 className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] mb-3">Impact Coût</h4>
                <p className="font-headline text-[24px] font-bold text-[#F2CA50] mb-1 tracking-tight leading-none">$1,650</p>
                <p className="text-[9px] font-medium text-[#D0C5AF]">Surcoût Maintenance</p>
              </div>

              <div className="bg-[#1C1B1B] rounded-[24px] p-5 border border-outline/5">
                <h4 className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] mb-3">Dernière Produc.</h4>
                <p className="font-headline text-[24px] font-bold text-white mb-1 tracking-tight leading-none">24 Oct</p>
                <p className="text-[9px] font-medium text-[#D0C5AF]">Efficacité Pic : 92%</p>
              </div>
            </div>
          </section>

          {/* Incident History */}
          <section className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D0C5AF]">Historique Incidents</h3>
              <button className="text-[9px] font-black uppercase tracking-widest text-[#F2CA50] hover:opacity-70 transition-opacity">
                Voir Tout
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="bg-[#1C1B1B] p-5 rounded-[24px] flex items-center justify-between border border-outline/5">
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-white mb-1.5">Chute pression hydrau.</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#D0C5AF]">20 Oct 2023</span>
                    <span className="bg-[#A58835]/20 text-[#F2CA50] px-2 py-0.5 rounded-[4px] text-[8px] font-black uppercase tracking-widest">Moyen</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-[#BFCDFF]/10 px-2.5 py-1.5 rounded-full border border-[#BFCDFF]/20">
                  <Icon name="check_circle" className="text-[#BFCDFF] text-[10px]" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#BFCDFF]">Révisé</span>
                </div>
              </div>

              <div className="bg-[#1C1B1B] p-5 rounded-[24px] flex items-center justify-between border border-outline/5">
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-white mb-1.5">Alerte alignement chenille</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#D0C5AF]">15 Oct 2023</span>
                    <span className="bg-[#353534] text-[#D0C5AF] px-2 py-0.5 rounded-[4px] text-[8px] font-black uppercase tracking-widest">Faible</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-[#BFCDFF]/10 px-2.5 py-1.5 rounded-full border border-[#BFCDFF]/20">
                  <Icon name="check_circle" className="text-[#BFCDFF] text-[10px]" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#BFCDFF]">Révisé</span>
                </div>
              </div>
            </div>
          </section>

          {/* Expense Logs */}
          <section className="mb-12">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D0C5AF]">Registres Dépenses</h3>
              <button className="text-[9px] font-black uppercase tracking-widest text-[#F2CA50] hover:opacity-70 transition-opacity">
                Relevés
              </button>
            </div>
            
            <div className="bg-[#1C1B1B] rounded-[24px] border border-outline/5 overflow-hidden">
              <div className="p-5 flex items-center justify-between border-b border-outline/5">
                <div className="flex items-center gap-4">
                  <div className="bg-[#F2CA50]/10 p-2.5 rounded-xl">
                    <Icon name="oil_barrel" className="text-[#F2CA50] text-lg" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-white mb-0.5">Remplacement Fluide Hydrau.</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#D0C5AF]">18 Oct 2023 • Consommables</span>
                  </div>
                </div>
                <span className="font-headline text-lg font-bold text-white">$450</span>
              </div>
              
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-[#F2CA50]/10 p-2.5 rounded-xl">
                    <Icon name="build" className="text-[#F2CA50] text-lg" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-white mb-0.5">Entretien Joint Filtre</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#D0C5AF]">12 Oct 2023 • Pièces détachées</span>
                  </div>
                </div>
                <span className="font-headline text-lg font-bold text-white">$120</span>
              </div>
            </div>
          </section>
          
        </div>

        {/* Floating Actions */}
        <div className="fixed bottom-20 md:bottom-6 left-0 right-0 px-6 z-40 max-w-lg mx-auto md:max-w-2xl">
          <div className="flex gap-4">
            <button className="flex-1 bg-[#242323] border border-outline/10 text-[#E5E2E1] rounded-full py-4 flex items-center justify-center gap-2 hover:bg-[#353534] transition-colors shadow-lg">
              <Icon name="add_notes" className="text-xl" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest">Ajouter Note</span>
            </button>
            <button className="flex-1 bg-gradient-to-br from-[#F2CA50] to-[#D4AF37] text-[#131313] rounded-full py-4 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_4px_20px_rgba(242,202,80,0.3)]">
              <Icon name="sync_alt" className="text-xl" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest">Mettre à Jour</span>
            </button>
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default EquipmentDetail;
