import React from 'react';
import { Icon } from '../components/Icon';

const Sales: React.FC = () => {
  return (
    <div className="bg-[#131313] min-h-screen text-[#E5E2E1] font-body selection:bg-[#F2CA50]/30 pb-32">
      
      {/* Top Header */}
      <header className="flex justify-between items-center px-6 pt-6 pb-4">
        <div className="flex items-center gap-4">
          <button className="text-[#F2CA50] hover:text-white transition-colors">
            <Icon name="menu" className="text-2xl" />
          </button>
          <h1 className="font-headline font-bold text-base tracking-[0.2em] text-white uppercase mt-0.5">Ventes</h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-outline/20">
          {/* Avatar frame */}
          <div className="w-full h-full bg-gradient-to-tr from-[#353534] to-[#4A4023] flex items-center justify-center">
            <Icon name="person" className="text-on-surface-variant text-sm" />
          </div>
        </div>
      </header>

      <main className="px-6 mt-4 max-w-lg mx-auto md:max-w-3xl">

        {/* Top Scroll Cards */}
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          <div className="bg-[#1C1B1B] rounded-[24px] p-5 min-w-[200px] border border-outline/5 shrink-0 flex flex-col justify-between">
            <h3 className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] mb-3">Volume Mensuel</h3>
            <div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-headline text-3xl font-bold text-[#F2CA50] tracking-tight">4,250</span>
                <span className="font-headline text-sm font-bold text-[#F2CA50]">g</span>
              </div>
              <div className="h-[3px] bg-outline/10 rounded-full w-full overflow-hidden flex">
                <div className="h-full bg-[#F2CA50] w-[60%]"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1C1B1B] rounded-[24px] p-5 min-w-[240px] border border-outline/5 shrink-0 flex flex-col justify-between">
            <h3 className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] mb-3">Revenus Mensuels</h3>
            <div>
              <p className="font-headline text-3xl font-bold text-[#F2CA50] mb-2 tracking-tight">$276,250</p>
              <div className="flex items-center gap-1.5 text-[#BFCDFF]">
                <Icon name="trending_up" className="text-[12px]" />
                <span className="text-[9px] font-bold tracking-wide">+12.4% vs N-1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mt-4 mb-10">
          <button className="flex items-center gap-2 bg-[#2A2929] border border-outline/10 px-4 py-2.5 rounded-full hover:bg-[#353534] transition-colors">
            <Icon name="calendar_month" className="text-[#D0C5AF] text-[14px]" />
            <span className="text-[10px] font-bold text-[#E5E2E1]">Ce Mois</span>
          </button>
          <button className="flex items-center gap-2 bg-[#2A2929] border border-outline/10 px-4 py-2.5 rounded-full hover:bg-[#353534] transition-colors">
            <Icon name="location_on" className="text-[#D0C5AF] text-[14px]" />
            <span className="text-[10px] font-bold text-[#E5E2E1]">Site Aurum-7</span>
          </button>
          <button className="flex items-center gap-2 bg-[#2A2929] border border-outline/10 px-4 py-2.5 rounded-full hover:bg-[#353534] transition-colors">
            <Icon name="group" className="text-[#D0C5AF] text-[14px]" />
            <span className="text-[10px] font-bold text-[#E5E2E1]">Raffineurs Mond.</span>
          </button>
        </div>

        {/* Active Ledger Section */}
        <section className="mb-8">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D0C5AF]">Registre Actif</h2>
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#F2CA50]">12 Transactions</span>
          </div>

          <div className="space-y-4">
            
            {/* Card 1 */}
            <div className="bg-[#1C1B1B] rounded-[24px] p-5 border border-outline/5 relative overflow-hidden flex flex-col group hover:bg-[#201F1F] transition-colors">
              <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#F2CA50]"></div>
              
              <div className="flex justify-between items-start mb-6 pl-2">
                <div>
                  <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] block mb-1">Oct 28, 2025</span>
                  <h3 className="font-headline text-lg font-bold text-white mb-1 tracking-tight">Aurum Métaux Précieux</h3>
                  <div className="flex items-center gap-1.5 opacity-70">
                    <Icon name="factory" className="text-[#E5E2E1] text-[10px]" />
                    <span className="text-[10px] text-[#E5E2E1]">Site 7 - Secteur Sud</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-headline text-[22px] font-bold text-[#F2CA50] leading-none mb-1 tracking-tight">$55,250</span>
                  <span className="text-[8px] text-[#D0C5AF]">Valeur Totale</span>
                </div>
              </div>

              <div className="flex justify-between items-end pl-2">
                <div className="flex gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF]">Masse Nette</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline text-sm font-bold text-white">850.00</span>
                      <span className="text-[9px] text-white/50">g</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF]">Prix Unitaire</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline text-sm font-bold text-white">$65.00</span>
                      <span className="text-[9px] text-white/50">/g</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-10 h-10 rounded-[12px] bg-[#2A2929] flex items-center justify-center hover:bg-[#353534] transition-colors border border-outline/5">
                  <Icon name="chevron_right" className="text-[#F2CA50] text-xl" />
                </button>
              </div>
            </div>

            {/* Card 2 - Alert Variant */}
            <div className="bg-[#1C1B1B] rounded-[24px] p-5 border border-outline/5 relative overflow-hidden flex flex-col group hover:bg-[#201F1F] transition-colors">
              <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#FF8888]"></div>
              
              <div className="flex justify-between items-start mb-6 pl-2">
                <div>
                  <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] block mb-1">Oct 26, 2025</span>
                  <h3 className="font-headline text-lg font-bold text-white mb-2 tracking-tight">Corp. Raffineurs Mondiaux</h3>
                  <div className="inline-flex items-center gap-1.5 bg-[#FF8888]/10 border border-[#FF8888]/20 px-2.5 py-1 rounded-[6px]">
                    <Icon name="warning" className="text-[#FF8888] text-[9px]" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#FF8888]">Incohérence des Stocks</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-headline text-[22px] font-bold text-[#F2CA50] leading-none mb-1 tracking-tight">$78,000</span>
                  <span className="text-[8px] text-[#D0C5AF]">Valeur Totale</span>
                </div>
              </div>

              <div className="flex justify-between items-end pl-2">
                <div className="flex gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF]">Masse Nette</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline text-sm font-bold text-white">1,200.00</span>
                      <span className="text-[9px] text-white/50">g</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF]">Prix Unitaire</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline text-sm font-bold text-white">$65.00</span>
                      <span className="text-[9px] text-white/50">/g</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-10 h-10 rounded-[12px] bg-[#2A2929] flex items-center justify-center hover:bg-[#353534] transition-colors border border-outline/5">
                  <Icon name="chevron_right" className="text-[#F2CA50] text-xl" />
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#1C1B1B] rounded-[24px] p-5 border border-outline/5 relative overflow-hidden flex flex-col group hover:bg-[#201F1F] transition-colors">
              <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#A58835]"></div>
              
              <div className="flex justify-between items-start mb-6 pl-2">
                <div>
                  <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF] block mb-1">Oct 22, 2025</span>
                  <h3 className="font-headline text-lg font-bold text-white mb-1 tracking-tight">Swiss Heritage Mint</h3>
                  <div className="flex items-center gap-1.5 opacity-70">
                    <Icon name="factory" className="text-[#E5E2E1] text-[10px]" />
                    <span className="text-[10px] text-[#E5E2E1]">Site Aurum-7</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-headline text-[22px] font-bold text-[#F2CA50] leading-none mb-1 tracking-tight">$32,300</span>
                  <span className="text-[8px] text-[#D0C5AF]">Valeur Totale</span>
                </div>
              </div>

              <div className="flex justify-between items-end pl-2">
                <div className="flex gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF]">Masse Nette</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline text-sm font-bold text-white">500.00</span>
                      <span className="text-[9px] text-white/50">g</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#D0C5AF]">Prix Unitaire</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline text-sm font-bold text-white">$64.60</span>
                      <span className="text-[9px] text-white/50">/g</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-10 h-10 rounded-[12px] bg-[#2A2929] flex items-center justify-center hover:bg-[#353534] transition-colors border border-outline/5">
                  <Icon name="chevron_right" className="text-[#F2CA50] text-xl" />
                </button>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-20 md:bottom-10 right-6 w-14 h-14 bg-gradient-to-br from-[#F2CA50] to-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(242,202,80,0.4)] hover:scale-105 transition-transform z-40">
        <Icon name="add" className="text-[#131313] text-2xl font-bold" />
      </button>

    </div>
  );
};

export default Sales;
