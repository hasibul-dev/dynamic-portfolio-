import React, { useState, useEffect, useMemo } from 'react';
import { useProjects } from '@/context/ProjectsContext';
import { PORTFOLIO_SECTORS } from '@/constants/config';
import { ProjectCard } from './ProjectCard';
import { LoadingSpinner } from '@/components/common';
import { useScrollReveal } from '@/hooks';
import { Terminal, FolderGit2, Cpu, Grid } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const { projects, loading } = useProjects();
  const [selectedSector, setSelectedSector] = useState('all');
  const [isScanning, setIsScanning] = useState(false);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal(0.05);

  useEffect(() => {
    setIsScanning(true);
    const timer = setTimeout(() => setIsScanning(false), 400);
    return () => clearTimeout(timer);
  }, [selectedSector]);

  const filteredProjects = useMemo(() => {
    return selectedSector === 'all'
      ? projects
      : projects.filter((project) => project.sector === selectedSector);
  }, [selectedSector, projects]);

  return (
    <section id="portfolio" ref={sectionRef} className="relative bg-[#0D0D0D] py-24 px-4 overflow-hidden select-none">
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#7CFF00_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute top-0 right-10 w-[350px] h-[350px] bg-[#7CFF00]/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#A6FF00]/5 rounded-full blur-[150px] pointer-events-none" />

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .matrix-scan::after {
          content: " ";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(124, 255, 0, 0.1) 50%), linear-gradient(to right, rgba(124, 255, 0, 0.05), rgba(166, 255, 0, 0.05));
          background-size: 100% 4px, 4px 100%;
          animation: scanline 0.4s linear infinite;
          pointer-events: none;
          z-index: 20;
        }
      `}</style>

      <div className="max-w-[1700px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className={`mb-16 border-b border-neutral-900/60 pb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 transition-all duration-1000 ${sectionVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Terminal size={14} style={{ color: '#7CFF00' }} className="animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">System Index Deployment</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7CFF00] via-[#7CFF00] to-[#A6FF00]">Projects</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-[#111111] border border-neutral-900 px-4 py-2 rounded-xl font-mono text-[11px] text-neutral-400">
            <Cpu size={14} style={{ color: '#7CFF00' }} />
            <span>Grid Layout Active</span>
          </div>
        </div>

        {/* Sidebar Categories and Controls */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE - Filter Menu */}
          <div className={`lg:col-span-3 flex flex-col space-y-2 sticky top-24 transition-all duration-1000 delay-200 ${sectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-600 uppercase px-3 mb-2 flex items-center gap-2">
              <Grid size={12} /> Filter Matrices
            </span>
            {PORTFOLIO_SECTORS.map((sector) => {
              const isActive = selectedSector === sector.slug;
              return (
                <button
                  key={sector.id}
                  onClick={() => setSelectedSector(sector.slug)}
                  className={`w-full px-4 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-widest text-left transition-all duration-300 relative group overflow-hidden border ${
                    isActive
                      ? 'border-[#7CFF00]/30 text-white shadow-xl shadow-[#7CFF00]/5 bg-neutral-900/40'
                      : 'border-neutral-900 bg-[#111111]/40 text-neutral-500 hover:text-neutral-300 hover:border-neutral-800'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#7CFF00] to-[#A6FF00]" />
                  )}

                  <div className="flex justify-between items-center relative z-10">
                    <span>{sector.name}</span>
                    <span className="text-[9px] text-neutral-600 font-normal group-hover:text-neutral-400 transition-colors">
                      {isActive ? '[ACTIVE]' : 'OPEN'}
                    </span>
                  </div>
                  
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT SIDE - Project Showcase Grid */}
          <div className="lg:col-span-9 relative">
            <div className={`transition-all duration-300 relative ${isScanning ? 'matrix-scan min-h-[300px]' : ''}`}>
              
              {loading ? (
                <div className="flex flex-col justify-center items-center min-h-[400px] bg-neutral-950/40 border border-neutral-900/60 rounded-2xl backdrop-blur-sm">
                  <LoadingSpinner message="Loading project parameters..." />
                </div>
              ) : filteredProjects.length > 0 ? (
                
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
                  {filteredProjects.map((project, idx) => (
                    <div
                      key={project.id}
                      className={`group/item rounded-xl border bg-[#050505] transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50 border-neutral-900/70 hover:border-[#7CFF00]/30 ${
                        sectionVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
                      }`}
                      style={{ 
                        transitionDelay: `${50 + idx * 40}ms`
                      }}
                    >
                      <div className="relative h-full overflow-hidden p-1">
                        <div className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-r from-transparent to-neutral-800 group-hover/item:to-[#7CFF00]/40 transition-colors z-20" />
                        <div className="absolute bottom-0 left-0 w-[1px] h-12 bg-gradient-to-b from-transparent to-neutral-800 group-hover/item:to-[#7CFF00]/40 transition-colors z-20" />

                        <ProjectCard project={project} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-neutral-950/30 border border-neutral-900/60 rounded-3xl backdrop-blur-sm">
                  <div className="inline-block p-8 rounded-2xl bg-[#050505] border border-neutral-900 relative max-w-sm">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-[#7CFF00] to-[#A6FF00]" />
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                      <FolderGit2 size={20} className="text-neutral-600" />
                    </div>
                    <h3 className="text-xs font-bold font-mono uppercase text-neutral-400 mb-1">No Projects Found</h3>
                    <p className="text-neutral-500 text-[11px] font-mono leading-relaxed">
                      There are currently no deployed items inside this sector category.
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

