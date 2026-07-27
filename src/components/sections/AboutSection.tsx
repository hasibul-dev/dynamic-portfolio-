import React, { useState } from 'react';

import { SKILLS } from '@/constants/config';
import { useScrollReveal } from '@/hooks';
import { User, Award, Briefcase, Heart, Cpu, Activity, LayoutGrid, Layers, ChevronDown } from 'lucide-react';

interface SkillItem {
  name: string;
  level: number;
}

const LiveDataBar: React.FC<{ skill: SkillItem; idx: number; isVisible: boolean; triggerAnim: boolean }> = ({ skill, idx, isVisible, triggerAnim }) => {
  const getStatus = (lvl: number) => {
    if (lvl >= 90) return 'EXPERT';
    if (lvl >= 75) return 'ADVANCED';
    return 'INTERMEDIATE';
  };

  return (
    <div 
      className="p-4 rounded-xl bg-gradient-to-b from-white/[0.03] to-white/[0.001] border border-white/[0.06] shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] group/bar relative overflow-hidden transition-all duration-500 hover:border-[#7CFF00]/30 hover:-translate-y-0.5"
      style={{
        transitionDelay: `${idx * 40}ms`,
        transform: triggerAnim ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.99)',
        opacity: triggerAnim ? 1 : 0,
      }}
    >
      <div className="flex justify-between items-start mb-2.5 relative z-10">
        <div>
          <span className="text-[10px] font-mono tracking-wider text-neutral-500 block mb-0.5 font-medium">TRACK 0{idx + 1}</span>
          <h4 className="text-sm font-semibold tracking-tight text-neutral-200 group-hover/bar:text-white transition-colors antialiased">{skill.name}</h4>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono font-semibold tracking-wide px-2 py-0.5 rounded bg-black/50 border border-white/[0.06] text-neutral-400 group-hover/bar:text-[#7CFF00] transition-colors">
            {getStatus(skill.level)}
          </span>
          <span className="text-sm font-bold font-mono block mt-1 antialiased" style={{ color: '#7CFF00' }}>{skill.level}%</span>
        </div>
      </div>
      <div className="w-full h-2 bg-black/60 rounded-sm relative overflow-hidden border border-white/[0.03]">
        <div 
          className="h-full rounded-sm transition-all duration-1000 ease-out"
          style={{ 
            width: isVisible && triggerAnim ? `${skill.level}%` : '0%',
            background: 'linear-gradient(to right, #7CFF00, #A6FF00)' 
          }}
        >
          <div className="absolute inset-0 w-20 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-sweep" />
        </div>
      </div>
    </div>
  );
};

export const AboutSection: React.FC = () => {
  const { ref: containerRef, isVisible: sectionVisible } = useScrollReveal(0.05);
  const [selectedCategory, setSelectedCategory] = useState<'design' | 'frontend' | 'backend' | 'tools'>('design');
  const [expandedCard, setExpandedCard] = useState<number | null>(0);
  const [animateCards, setAnimateCards] = useState(true);

  const handleCategoryChange = (tab: 'design' | 'frontend' | 'backend' | 'tools') => {
    if (tab === selectedCategory) return;
    setAnimateCards(false);
    setTimeout(() => {
      setSelectedCategory(tab);
      setAnimateCards(true);
    }, 250); 
  };

  const profileHighlights = [
    { 
      icon: User, 
      label: 'IDENTITY PROTOCOL', 
      title: 'Hasibul Hassan Shanto', 
      detailedText: 'Engineered at the intersection of logical computation and visual design. Leveraging a core CSE foundation, I design architectural frontend interfaces that transform clean layout parameters into ultra-fluid, human-centric visual art.',
      aiInsight: 'System Profile: Exhibits deep proficiency in UI composition. Calibrates interface mechanics to ensure fast execution speeds and high-fidelity adaptive properties.'
    },
    { 
      icon: Briefcase, 
      label: 'OPERATIONS & STACK', 
      title: 'Fullstack Execution', 
      detailedText: 'Specialized in unified stack developments that transcend simple designs. Seamlessly integrates server-side computations with front-facing architectures to craft high-velocity e-commerce pipelines, automation systems, and modular digital solutions.',
      aiInsight: 'System Profile: Codebase refactoring methodologies and asynchronous stream allocations adhere to standard enterprise compliance.'
    },
    { 
      icon: Award, 
      label: 'ENGINEERING STANDARD', 
      title: 'Pixel Precision Protocol', 
      detailedText: 'Enforces absolute pixel boundaries, accessibility protocols, and cross-platform fidelity layouts. Rejects engineering shortcuts to secure clean, lightning-fast rendering indexes and optimal search engine positioning benchmarks.',
      aiInsight: 'System Profile: Exceptional layout purist with deep structural mastery over modern bento layouts and asymmetric interface distributions.'
    },
    { 
      icon: Heart, 
      label: 'ECOSYSTEM & TRENDS', 
      title: 'Neural Network & Focus', 
      detailedText: 'Constantly tracking shifting tech horizons. Exploring high-end eSports branding dynamics, constructing design assets for modern agencies, and scaling collaborative open-source packages are the primary core engines powering my technical evolution.',
      aiInsight: 'System Profile: Infuses layouts with unique cinematic shadows and high-octane cyberpunk aesthetics derived from active digital creation.'
    },
  ];

  const categoryMeta = {
    design: { icon: LayoutGrid, desc: 'UI/UX & Branding Frameworks' },
    frontend: { icon: Layers, desc: 'Interactive Client-Side Systems' },
    backend: { icon: Cpu, desc: 'Server Logic & Data Engines' },
    tools: { icon: Activity, desc: 'Deployment & Workflow Boosters' },
  };

  const ActiveIcon = categoryMeta[selectedCategory].icon;

  return (
    <section id="about" ref={containerRef} className="relative bg-[#050505] py-28 px-4 overflow-hidden font-sans antialiased">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-1/4 w-[500px] h-[500px] bg-[#7CFF00]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-1/4 w-[500px] h-[500px] bg-[#A6FF00]/5 rounded-full blur-[150px] pointer-events-none" />

      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
        .skeleton-sweep {
          animation: sweep 2s infinite linear;
        }
      `}</style>

      <div className="max-w-[1700px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className={`mb-16 border-b border-white/[0.06] pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-700 ${sectionVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] block mb-2" style={{ color: '#7CFF00' }}>ENGINE INTERFACE // 2026</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Technical Command Center
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.05] backdrop-blur-md px-4 py-2 rounded-xl font-mono text-[11px] font-semibold text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-wide">SYSTEM: ONLINE</span>
          </div>
        </div>

        {/* Core Interactive Layout Hub */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE - Accordion List (Crystal Glass) */}
          <div className="lg:col-span-5 space-y-3">
            {profileHighlights.map((item, idx) => {
              const Icon = item.icon;
              const isExpanded = expandedCard === idx;
              
              return (
                <div 
                  key={item.title}
                  className={`rounded-2xl border backdrop-blur-xl transition-all duration-500 overflow-hidden ${
                    isExpanded 
                      ? 'bg-gradient-to-b from-white/[0.05] to-white/[0.005] border-t border-l border-white/[0.2] border-r border-b border-white/[0.04] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.6)]' 
                      : 'bg-gradient-to-b from-white/[0.02] to-transparent border-white/[0.05] hover:border-white/[0.12]'
                  } ${sectionVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: `${idx * 60}ms` }}
                >
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : idx)}
                    className="w-full p-5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-black/40 border flex items-center justify-center transition-colors ${
                        isExpanded ? 'border-[#7CFF00]/40 text-white' : 'border-white/[0.05] text-neutral-400'
                      }`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-neutral-500 block uppercase tracking-widest font-semibold">{item.label}</span>
                        <h3 className="text-base font-bold tracking-tight text-white mt-0.5">{item.title}</h3>
                      </div>
                    </div>
                    <ChevronDown 
                      size={18} 
                      className={`text-neutral-500 transition-transform duration-500 ease-in-out ${isExpanded ? 'rotate-180 text-white' : ''}`} 
                    />
                  </button>

                  <div 
                    className="transition-all duration-500 ease-in-out overflow-hidden"
                    style={{ 
                      maxHeight: isExpanded ? '320px' : '0px',
                      opacity: isExpanded ? 1 : 0
                    }}
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-white/[0.05] space-y-3">
                      <p className="text-xs text-neutral-400 leading-relaxed font-normal tracking-normal">
                        {item.detailedText}
                      </p>
                      
                      <div className="p-3 rounded-xl bg-black/40 border border-white/[0.05] text-[10px] font-mono tracking-wide text-neutral-400 leading-relaxed relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-[#7CFF00] to-[#A6FF00]" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#7CFF00] block mb-1">AI SYSTEM FEED</span>
                        {item.aiInsight}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE - Skills Control Console Panel (Crystal Glass) */}
          <div className={`lg:col-span-7 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.002] border-t border-l border-white/[0.18] border-r border-b border-white/[0.04] shadow-[inset_0_2px_4px_rgba(255,255,255,0.08),0_30px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl p-6 sm:p-8 relative transition-all duration-1000 ${sectionVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div>
              {/* Category Toggles */}
              <div className="flex flex-wrap gap-2 border-b border-white/[0.06] pb-4 mb-6">
                {([ 'design', 'frontend', 'backend', 'tools' ] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleCategoryChange(tab)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                      selectedCategory === tab
                        ? 'bg-gradient-to-r from-[#7CFF00] to-[#A6FF00] text-black border-none shadow-lg shadow-[#7CFF00]/15 scale-105'
                        : 'bg-black/20 text-neutral-500 border-white/[0.05] hover:text-neutral-300 hover:border-white/[0.12]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Module Metadata Feed Banner */}
              <div className="flex items-center justify-between mb-6 bg-black/30 border border-white/[0.04] p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/[0.05] flex items-center justify-center">
                    <ActiveIcon size={16} style={{ color: '#7CFF00' }} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold font-mono uppercase text-neutral-400 tracking-widest mb-0.5">
                      MODULE FEED // {selectedCategory}
                    </h3>
                    <p className="text-xs text-neutral-500 font-medium tracking-tight">{categoryMeta[selectedCategory].desc}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-neutral-600 hidden sm:inline tracking-wider">REFRESH RATE: 12ms</span>
              </div>

              {/* Skills Progress Content Grid */}
              <div 
                className="grid sm:grid-cols-2 gap-4 transition-all duration-300 ease-in-out"
                style={{
                  transform: animateCards ? 'translateY(0)' : 'translateY(8px)',
                  opacity: animateCards ? 1 : 0
                }}
              >
                {SKILLS[selectedCategory] && (SKILLS[selectedCategory] as unknown as SkillItem[]).map((skill, idx) => (
                  <LiveDataBar 
                    key={skill.name} 
                    skill={skill} 
                    idx={idx} 
                    isVisible={sectionVisible}
                    triggerAnim={animateCards}
                  />
                ))}
              </div>
            </div>

            {/* Panel Footer */}
            <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[10px] font-mono text-neutral-500 text-center sm:text-left tracking-wide">
                * Click on tabs above to analyze real-time stack distributions.
              </p>
              <button
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 hover:text-white hover:border-[#7CFF00]/40 transition-all duration-300 cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
              >
                Inquire Stack Capabilities_
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

