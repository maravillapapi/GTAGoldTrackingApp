import React from 'react';
import { Icon } from '../components/Icon';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero.png';

const AddEquipment: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen text-on-surface font-body selection:bg-primary/30 pb-32">
      
      {/* Top Header */}
      <header className="flex justify-between items-center px-6 py-6 border-b border-outline-variant/20">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-primary hover:text-on-surface transition-colors">
            <Icon name="arrow_back" />
          </button>
          <h1 className="font-headline font-bold text-sm tracking-[0.2em] text-on-surface uppercase">Ajouter Matériel</h1>
        </div>
        <span className="font-headline font-bold text-sm tracking-[0.2em] text-primary uppercase">Sovereign</span>
      </header>

      <main className="px-6 mt-6 max-w-lg mx-auto md:max-w-2xl">
        
        {/* Banner */}
        <div className="w-full h-[140px] rounded-2xl overflow-hidden mb-8 relative border border-outline-variant/20 bg-surface-container-low">
          <img src={heroImg} alt="Hardware" className="w-full h-full object-cover object-top opacity-30 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent"></div>
        </div>

        <form className="space-y-10">
          
          {/* Identity Group */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-4 bg-[#F2CA50] rounded-full"></div>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Identification</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[8px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">Nom de l'Équipement</label>
                <input 
                  type="text" 
                  placeholder="ex. Concasseur Primaire A1" 
                  className="w-full bg-[#242323] border border-outline/10 rounded-[12px] px-4 py-3.5 text-sm text-on-surface focus:outline-none focus:border-[#F2CA50]/50 placeholder:text-on-surface/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[8px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">Catégorie</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-[#242323] border border-outline/10 text-on-surface rounded-[12px] px-4 py-3.5 text-sm focus:outline-none focus:border-[#F2CA50]/50 transition-colors">
                    <option>Excavateurs</option>
                    <option>Chargeuses</option>
                    <option>Foreuses</option>
                  </select>
                  <Icon name="expand_more" className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[8px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">Référence / ID</label>
                <input 
                  type="text" 
                  placeholder="MNE-4402-B" 
                  className="w-full bg-[#242323] border border-outline/10 rounded-[12px] px-4 py-3.5 text-sm text-on-surface focus:outline-none focus:border-[#F2CA50]/50 placeholder:text-on-surface/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[8px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">Marque / Modèle</label>
                <input 
                  type="text" 
                  placeholder="Caterpillar 797F" 
                  className="w-full bg-[#242323] border border-outline/10 rounded-[12px] px-4 py-3.5 text-sm text-on-surface focus:outline-none focus:border-[#F2CA50]/50 placeholder:text-on-surface/30 transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Location Group */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-4 bg-[#F2CA50] rounded-full"></div>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Localisation</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[8px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">Site</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-[#242323] border border-outline/10 text-on-surface rounded-[12px] px-4 py-3.5 text-sm focus:outline-none focus:border-[#F2CA50]/50 transition-colors">
                    <option>Eagle Ridge</option>
                    <option>Fosse Nord</option>
                  </select>
                  <Icon name="location_on" className="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-[18px] pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[8px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">Zone</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-[#242323] border border-outline/10 text-on-surface rounded-[12px] px-4 py-3.5 text-sm focus:outline-none focus:border-[#F2CA50]/50 transition-colors">
                    <option>Secteur 4G</option>
                    <option>Secteur 5A</option>
                  </select>
                  <Icon name="layers" className="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-[18px] pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

          {/* Details Group */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-4 bg-[#F2CA50] rounded-full"></div>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Détails</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[8px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">Date d'Acquisition</label>
                <input 
                  type="date" 
                  className="w-full bg-[#242323] border border-outline/10 rounded-[12px] px-4 py-3.5 text-sm text-on-surface focus:outline-none focus:border-[#F2CA50]/50 transition-colors"
                />
              </div>

              {/* Physical State Pills */}
              <div>
                <label className="block text-[8px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-3">État Physique</label>
                <div className="flex bg-[#242323] rounded-[12px] border border-outline-variant/20 overflow-hidden">
                  <button type="button" className="flex-1 py-3 text-[9px] font-bold uppercase tracking-widest text-primary border border-[#F2CA50]/40 bg-[#F2CA50]/5 rounded-[12px]">Neuf</button>
                  <button type="button" className="flex-1 py-3 text-[9px] font-bold uppercase tracking-widest text-on-surface-variant hover:bg-white/5 transition-colors">Bon</button>
                  <button type="button" className="flex-1 py-3 text-[9px] font-bold uppercase tracking-widest text-on-surface-variant hover:bg-white/5 transition-colors">Moyen</button>
                  <button type="button" className="flex-1 py-3 text-[9px] font-bold uppercase tracking-widest text-on-surface-variant hover:bg-white/5 transition-colors">Défect.</button>
                </div>
              </div>

              {/* Operational Status Toggle */}
              <div>
                <label className="block text-[8px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-3">Statut Opérationnel</label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className="flex items-center justify-between p-4 bg-[#242323] border border-[#BFCDFF]/40 bg-[#BFCDFF]/5 rounded-[12px]">
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#BFCDFF]">Fonctionnel</span>
                      <span className="text-[10px] text-on-surface opacity-70">Prêt à l'emploi</span>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-[#BFCDFF] flex items-center justify-center">
                      <Icon name="check" className="text-[#131313] text-[12px] font-bold" />
                    </div>
                  </button>
                  <button type="button" className="flex items-center justify-between p-4 bg-surface-container-low border border-outline/10 rounded-[12px] hover:bg-[#242323] transition-colors">
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-on-surface-variant">En Panne</span>
                      <span className="text-[10px] text-on-surface-variant opacity-50">Réparation</span>
                    </div>
                    <Icon name="error" className="text-on-surface-variant/30 text-xl" />
                  </button>
                </div>
              </div>

            </div>
          </section>

          {/* Observations Group */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-4 bg-[#F2CA50] rounded-full"></div>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Observations</h2>
            </div>
            
            <div>
              <label className="block text-[8px] font-extrabold uppercase tracking-widest text-on-surface-variant mb-2">Commentaire / Note</label>
              <textarea 
                rows={4}
                placeholder="Entrez des notes spécifiques ou limites opérationnelles..."
                className="w-full bg-[#242323] border border-outline/10 rounded-[12px] px-4 py-4 text-sm text-on-surface focus:outline-none focus:border-[#F2CA50]/50 placeholder:text-on-surface-variant/30 transition-colors resize-none"
              ></textarea>
            </div>
          </section>

          {/* Bottom Actions */}
          <div className="pt-4 pb-10 space-y-4">
            <button type="button" className="w-full bg-gradient-to-br from-[#F2CA50] to-[#D4AF37] text-[#131313] rounded-full py-4 flex items-center justify-center gap-3 hover:opacity-90 transition-opacity shadow-[0_4px_20px_rgba(242,202,80,0.3)]">
              <Icon name="save" className="text-xl" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Enregistrer Matériel</span>
            </button>
            <button type="button" onClick={() => navigate(-1)} className="w-full bg-transparent border border-outline/10 text-on-surface rounded-full py-4 flex items-center justify-center hover:bg-white/5 transition-colors">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">Annuler</span>
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default AddEquipment;
