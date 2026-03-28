import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useAppContext } from '../contexts/AppContext';

const Home: React.FC = () => {
  const { role, setIsMenuOpen } = useAppContext();

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

        <section className="bg-surface-container-low p-5 rounded-2xl space-y-6 mb-8 border border-outline-variant/10">
          <div className="flex justify-between items-baseline">
            <h2 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Tendance sur 7 jours</h2>
            <p className="text-[10px] text-on-surface-variant/60 font-medium">18 oct — 24 oct 2023</p>
          </div>
          <div className="bg-surface-container-low p-1 rounded-xl flex gap-1 overflow-x-auto no-scrollbar border border-outline-variant/10">
            <button className="flex-1 whitespace-nowrap px-3 py-2 rounded-lg text-[9px] font-bold uppercase transition-all bg-primary text-on-primary shadow-sm">JOUR VS J-1</button>
            <button className="flex-1 whitespace-nowrap px-3 py-2 rounded-lg text-[9px] font-bold uppercase transition-all text-on-surface-variant bg-surface-container-highest/30 hover:bg-surface-bright">Moyenne semaine</button>
            <button className="flex-1 whitespace-nowrap px-3 py-2 rounded-lg text-[9px] font-bold uppercase transition-all text-on-surface-variant bg-surface-container-highest/30 hover:bg-surface-bright">Moyenne mensuelle</button>
            <button className="flex-1 whitespace-nowrap px-3 py-2 rounded-lg text-[9px] font-bold uppercase transition-all text-on-surface-variant bg-surface-container-highest/30 hover:bg-surface-bright">Global</button>
            <button className="flex-1 whitespace-nowrap px-3 py-2 rounded-lg text-[9px] font-bold uppercase transition-all text-on-surface-variant bg-surface-container-highest/30 hover:bg-surface-bright">Objectif</button>
          </div>
          
          <div className="relative flex h-72 w-full gap-2 pt-12 pb-16">
            <div className="absolute left-0 top-12 bottom-16 w-full flex flex-col justify-between pointer-events-none">
              <div className="w-full border-t border-outline-variant/10 flex justify-end"><span className="text-[8px] text-on-surface-variant/40 -mt-2 pr-1">1,5 kg</span></div>
              <div className="w-full border-t border-outline-variant/10 flex justify-end"><span className="text-[8px] text-on-surface-variant/40 -mt-2 pr-1">1,0 kg</span></div>
              <div className="w-full border-t border-outline-variant/10 flex justify-end"><span className="text-[8px] text-on-surface-variant/40 -mt-2 pr-1">0,5 kg</span></div>
              <div className="w-full border-t border-outline-variant/10 flex justify-end"><span className="text-[8px] text-on-surface-variant/40 -mt-2 pr-1">0</span></div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-end relative z-10">
              <span className="text-[9px] font-bold text-on-surface-variant/80 mb-1.5">840 g</span>
              <div className="w-full bg-primary/30 rounded-t-sm h-[42%]"></div>
              <div className="absolute -bottom-10 flex flex-col items-center">
                <span className="text-[9px] font-bold text-on-surface-variant whitespace-nowrap uppercase">Mar 18</span>
                <span className="text-[8px] text-on-surface-variant/40">---</span>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-end relative z-10">
              <span className="text-[9px] font-bold text-on-surface-variant/80 mb-1.5">920 g</span>
              <div className="w-full bg-primary/40 rounded-t-sm h-[48%]"></div>
              <div className="absolute -bottom-10 flex flex-col items-center">
                <span className="text-[9px] font-bold text-on-surface-variant whitespace-nowrap uppercase">Mer 19</span>
                <span className="text-[8px] text-primary font-bold">+9%</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-end relative z-10">
              <span className="text-[9px] font-bold text-on-surface-variant/80 mb-1.5">710 g</span>
              <div className="w-full bg-primary/20 rounded-t-sm h-[35%]"></div>
              <div className="absolute -bottom-10 flex flex-col items-center">
                <span className="text-[9px] font-bold text-on-surface-variant whitespace-nowrap uppercase">Jeu 20</span>
                <span className="text-[8px] text-error font-bold">-22%</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-end relative z-10">
              <span className="text-[9px] font-bold text-on-surface-variant/80 mb-1.5">1150 g</span>
              <div className="w-full bg-primary/60 rounded-t-sm h-[68%]"></div>
              <div className="absolute -bottom-10 flex flex-col items-center">
                <span className="text-[9px] font-bold text-on-surface-variant whitespace-nowrap uppercase">Ven 21</span>
                <span className="text-[8px] text-primary font-bold">+62%</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-end relative z-10">
              <div className="absolute top-2 w-max text-center">
                <span className="text-[8px] leading-tight text-on-surface-variant font-bold uppercase tracking-tighter block bg-surface-container-low px-1"><br/></span>
              </div>
              <span className="text-[9px] font-bold text-on-surface-variant/80 mb-1.5">0 g</span>
              <div className="w-full border-t border-error/30 h-1"></div>
              <div className="absolute -bottom-10 flex flex-col items-center">
                <span className="text-[9px] font-bold text-on-surface-variant whitespace-nowrap uppercase">Sam 22</span>
                <span className="text-[8px] text-on-surface-variant/40">Off</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-end relative z-10">
              <div className="absolute top-2">
                <Icon name="report" className="text-error text-base" />
              </div>
              <span className="text-[9px] font-bold text-on-surface-variant/80 mb-1.5">1180 g</span>
              <div className="w-full bg-primary/70 rounded-t-sm h-[72%]"></div>
              <div className="absolute -bottom-10 flex flex-col items-center">
                <span className="text-[9px] font-bold text-on-surface-variant whitespace-nowrap uppercase">Dim 23</span>
                <span className="text-[8px] text-primary font-bold">+15%</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-end relative z-10">
              <span className="text-[10px] font-black text-primary mb-1.5">1248 g</span>
              <div className="w-full bg-primary rounded-t-sm h-[84%] shadow-[0_0_15px_rgba(242,202,80,0.3)]"></div>
              <div className="absolute -bottom-10 flex flex-col items-center">
                <span className="text-[9px] font-bold text-primary whitespace-nowrap uppercase">Lun 24</span>
                <span className="text-[8px] text-primary font-bold">+6%</span>
              </div>
            </div>
          </div>

          <div className="pt-12 flex justify-center">
            <div className="bg-surface-container-highest/50 px-4 py-2 rounded-full border border-outline-variant/10">
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
