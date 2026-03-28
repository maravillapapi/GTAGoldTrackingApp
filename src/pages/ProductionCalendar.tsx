import React, { useState } from 'react';
import { Icon } from '../components/Icon';

const ProductionCalendar: React.FC = () => {

  // For this exact visual replica, we'll hardcode the view to October 2023 to match the design system "Sovereign Vein" mock.
  const [activeDate, setActiveDate] = useState(new Date(2023, 9, 27)); // Oct 27, 2023
  const [selectedDay, setSelectedDay] = useState(27);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const year = activeDate.getFullYear();
  const month = activeDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Adjust so Monday is the first column (1 = Monday, ..., 0 = Sunday -> 7)
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const handlePrevMonth = () => setActiveDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setActiveDate(new Date(year, month + 1, 1));

  // Visual state mapping mimicking the exact screenshot
  const getDayState = (day: number) => {
    if (day === 5 || day === 18) return 'closed';
    if (day === 8 || day === 19) return 'unvalidated';
    if ([2, 3, 4, 7, 9, 10, 11, 12, 15, 16, 20, 22, 25, 26, 27].includes(day)) return 'high';
    if ([6, 14, 21, 23, 29].includes(day)) return 'medium';
    if ([13, 17, 24, 28].includes(day)) return 'low';
    return 'none';
  };

  const hasIncident = (day: number) => [7, 15, 27].includes(day);

  const days = Array.from({ length: daysInMonth }).map((_, i) => {
    const day = i + 1;
    return {
      day,
      state: getDayState(day),
      incident: hasIncident(day)
    };
  });

  const monthNames = ["JANVIER", "FÉVRIER", "MARS", "AVRIL", "MAI", "JUIN", "JUILLET", "AOÛT", "SEPTEMBRE", "OCTOBRE", "NOVEMBRE", "DÉCEMBRE"];

  return (
    <div className="bg-[#131313] min-h-screen text-[#E5E2E1] font-body selection:bg-primary/30">
      
      {/* Top Main Navigation Header (matches global shell view in mock) */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-outline/5 bg-[#1C1B1B]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-outline/20">
            {/* Mock Avatar */}
            <div className="w-full h-full bg-gradient-to-tr from-[#353534] to-[#4A4023] flex items-center justify-center">
              <Icon name="person" className="text-on-surface-variant text-sm" />
            </div>
          </div>
          <h1 className="font-headline font-bold uppercase tracking-widest text-primary text-sm lg:text-base">The Sovereign Vein</h1>
        </div>
        <div className="relative">
          <Icon name="notifications" className="text-primary text-xl" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF8888] rounded-full border-2 border-[#1C1B1B]"></span>
        </div>
      </header>

      <main className="px-6 mt-8 max-w-lg mx-auto md:max-w-2xl pb-32">
        
        {/* Page Header */}
        <div className="flex justify-between items-start mb-10">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D0C5AF] mb-1">Supervision</span>
            <h2 className="font-headline text-4xl font-extrabold tracking-tight leading-none text-white">Calendrier de<br/>Production</h2>
          </div>
          <div className="bg-[#1C1B1B] border border-outline/10 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-lg">
            <Icon name="location_on" className="text-primary text-sm" />
            <span className="text-xs font-bold text-on-surface">Site A-12</span>
          </div>
        </div>

        {/* Month Selector */}
        <div className="bg-[#1C1B1B] rounded-full flex justify-between items-center px-4 py-3 mb-8 shadow-sm">
          <button onClick={handlePrevMonth} className="text-on-surface-variant hover:text-white transition-colors">
            <Icon name="chevron_left" />
          </button>
          <span className="font-headline text-sm font-bold uppercase tracking-widest text-primary">{monthNames[month]} {year}</span>
          <button onClick={handleNextMonth} className="text-on-surface-variant hover:text-white transition-colors">
            <Icon name="chevron_right" />
          </button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-2 mb-4 text-center">
          {['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'].map(d => (
            <div key={d} className="text-[9px] font-bold text-[#D0C5AF] uppercase tracking-widest">{d}</div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-3 mb-10">
          {Array.from({ length: adjustedFirstDay }).map((_, i) => (
            <div key={`blank-${i}`} className="aspect-square"></div>
          ))}
          
          {days.map(d => {
            let bgClass = "bg-[#1C1B1B]"; // default surface_container_low
            let textClass = "text-[#D0C5AF]";
            let borderClass = "";
            let glowClass = "";

            if (d.state === 'high') {
              bgClass = "bg-[#F2CA50]";
              textClass = "text-[#131313]";
            } else if (d.state === 'medium') {
              bgClass = "bg-[#A58835]";
              textClass = "text-[#131313]";
            } else if (d.state === 'low') {
              bgClass = "bg-[#4D4222]";
              textClass = "text-[#D0C5AF]";
            } else if (d.state === 'closed') {
              bgClass = "bg-[repeating-linear-gradient(-45deg,#1C1B1B,#1C1B1B_4px,#262423_4px,#262423_8px)]";
              textClass = "text-[#D0C5AF] opacity-50";
            } else if (d.state === 'unvalidated') {
              bgClass = "bg-transparent";
              textClass = "text-[#F2CA50]";
              borderClass = "border border-dashed border-[#F2CA50]";
            }

            if (d.day === selectedDay) {
              glowClass = "ring-2 ring-[#F2CA50] ring-offset-4 ring-offset-[#131313] shadow-[0_0_15px_rgba(242,202,80,0.3)] z-10 scale-[1.05] transition-transform";
            }

            return (
              <button 
                key={d.day}
                onClick={() => {
                  setSelectedDay(d.day);
                  setIsPopupOpen(true);
                }}
                className={`aspect-square rounded-[14px] flex items-center justify-center font-headline font-bold text-sm relative transition-all ${bgClass} ${textClass} ${borderClass} ${glowClass}`}
              >
                {d.day}
                {d.incident && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FF8888] border-2 border-[#131313]"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Visual Legend */}
        <section className="bg-[#1C1B1B] p-6 rounded-[24px] mb-8">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D0C5AF] mb-5">Légende Visuelle</h3>
          <div className="grid grid-cols-2 gap-y-4 gap-x-2">
            <div className="flex items-center gap-3">
              <div className="w-[18px] h-[18px] rounded-[6px] bg-[#F2CA50]"></div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#D0C5AF]">Haut Rendement</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[18px] h-[18px] rounded-[6px] bg-[repeating-linear-gradient(-45deg,#1C1B1B,#1C1B1B_3px,#262423_3px,#262423_6px)] border border-outline/10"></div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#D0C5AF]">Site Fermé</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[18px] h-[18px] rounded-[6px] bg-[#A58835]"></div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#D0C5AF]">Rendement Moyen</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[18px] h-[18px] rounded-[6px] bg-transparent flex items-start justify-end pr-0.5 pt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#FF8888]"></span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#D0C5AF]">Incident</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[18px] h-[18px] rounded-[6px] bg-[#4D4222]"></div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#D0C5AF]">Faible Rendement</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[18px] h-[18px] rounded-[6px] bg-transparent border border-dashed border-[#F2CA50]"></div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#D0C5AF]">Non Validé</span>
            </div>
          </div>
        </section>

        {/* Monthly Aggregate */}
        <section className="mb-12">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D0C5AF] mb-4">Bilan Mensuel</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Total Production Card */}
            <div className="bg-[#1C1B1B] p-5 rounded-[24px]">
              <p className="text-[8px] font-bold uppercase tracking-widest text-[#D0C5AF] mb-3">Production Totale</p>
              <p className="font-headline text-xl text-[#F2CA50] font-bold tracking-tight mb-3">34,120.00 g</p>
              <div className="h-1 bg-outline/10 rounded-full w-full overflow-hidden flex">
                <div className="h-full bg-[#F2CA50] w-[75%]"></div>
              </div>
            </div>

            {/* Validation Rate Card */}
            <div className="bg-[#1C1B1B] p-5 rounded-[24px]">
              <p className="text-[8px] font-bold uppercase tracking-widest text-[#D0C5AF] mb-3">Taux de Validation</p>
              <p className="font-headline text-2xl text-[#BFCDFF] font-bold tracking-tight mb-1">98.2%</p>
              <p className="text-[8px] uppercase tracking-widest text-[#D0C5AF] opacity-70">Dépasse l'Objectif</p>
            </div>

            {/* Incidents Card */}
            <div className="bg-[#1C1B1B] p-5 rounded-[24px]">
              <p className="text-[8px] font-bold uppercase tracking-widest text-[#D0C5AF] mb-3">Incidents</p>
              <p className="font-headline text-xl text-[#FF8888] font-bold tracking-tight mb-1">4 Jours</p>
              <p className="text-[8px] uppercase tracking-widest text-[#D0C5AF] opacity-70">-12% par rap. Sept</p>
            </div>

            {/* Closures Card */}
            <div className="bg-[#1C1B1B] p-5 rounded-[24px]">
              <p className="text-[8px] font-bold uppercase tracking-widest text-[#D0C5AF] mb-3">Fermetures</p>
              <p className="font-headline text-xl text-white font-bold tracking-tight mb-1">2 Jours</p>
              <p className="text-[8px] uppercase tracking-widest text-[#D0C5AF] opacity-70">Maintenance</p>
            </div>
          </div>
        </section>

      </main>

      {/* Selected Day Bottom Sheet Replica */}
      {isPopupOpen && (
        <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-[#1C1B1B] rounded-t-[32px] p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-30 max-w-7xl mx-auto md:max-w-md md:left-auto md:right-8 border-t border-outline/5 transition-all animate-in slide-in-from-bottom-full duration-300">
          <button 
            onClick={() => setIsPopupOpen(false)}
            className="w-12 h-6 mx-auto absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer group hover:bg-white/5 rounded-b-lg transition-colors"
          >
            <div className="w-8 h-1 bg-outline/20 group-hover:bg-outline/50 rounded-full transition-colors"></div>
          </button>
          
          <div className="flex justify-between items-start mb-6 mt-2">
            <div>
              <h2 className="font-headline text-2xl font-bold tracking-tight text-white mb-1">
                {new Date(year, month, selectedDay).toLocaleDateString('fr-FR', { weekday: 'long', month: 'short', day: 'numeric' })}
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F2CA50]">Pic de Production</p>
            </div>
            <button onClick={() => setIsPopupOpen(false)} className="px-3 py-1 rounded-full border border-[#F2CA50]/30 bg-[#F2CA50]/10 text-[#F2CA50] text-[8px] font-bold tracking-widest uppercase hover:bg-[#F2CA50]/20 transition-colors cursor-pointer">
              Fermer / Valider
            </button>
          </div>

          <div className="space-y-3">
            {/* Total Prod */}
            <div className="bg-[#242323] p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#F2CA50]/10 p-2 rounded-lg text-[#F2CA50]">
                  <Icon name="analytics" className="text-sm" />
                </div>
                <span className="text-xs font-bold text-[#E5E2E1]">Production Totale</span>
              </div>
              <span className="font-headline text-base font-bold text-white">1,248.50 g</span>
            </div>

            {/* Validation Status */}
            <div className="bg-[#242323] p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#BFCDFF]/10 p-2 rounded-lg text-[#BFCDFF]">
                  <Icon name="verified_user" className="text-sm" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#E5E2E1] leading-tight">Statut de Validation</span>
                  <span className="text-[9px] text-[#D0C5AF] leading-tight mt-0.5">Superviseur: M. Sterling</span>
                </div>
              </div>
              <span className="text-[8px] uppercase tracking-widest text-[#BFCDFF] font-bold">En Attente de Signature</span>
            </div>

            {/* Splitted Box */}
            <div className="flex gap-3">
              <div className="bg-[#242323] p-4 rounded-2xl flex items-center gap-3 flex-1">
                <Icon name="history_edu" className="text-[#D0C5AF] text-base" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-[#E5E2E1] font-bold">Registres</span>
                  <span className="text-xs text-white">8 entrées</span>
                </div>
              </div>
              <div className="bg-[#242323] p-4 rounded-2xl flex items-center gap-3 flex-1">
                <div className="bg-[#FF8888] w-4 h-4 rounded-full flex items-center justify-center text-[#242323]">
                  <Icon name="priority_high" className="text-[10px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-[#E5E2E1] font-bold">Incidents</span>
                  <span className="text-xs text-white">1 signalé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionCalendar;
