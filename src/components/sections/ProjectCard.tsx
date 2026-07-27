import React from 'react';
import { Card } from '@/components/common';
import { ExternalLink, Github } from 'lucide-react';
import { truncateString } from '@/utils/helpers';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full bg-gradient-to-br from-white/[0.04] to-transparent border-t border-l border-white/[0.12] border-r-transparent border-b-transparent rounded-tr-3xl rounded-bl-3xl rounded-tl-sm rounded-br-sm group transition-all duration-500 hover:border-t-[#7CFF00]/40 hover:border-l-[#7CFF00]/40 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_40px_rgba(124,255,0,0.02)] backdrop-blur-xl p-5 relative select-none transform hover:-translate-y-1">
      
      {/* Dynamic Cyber Grid Mesh Accent Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Futuristic Index Corner Shield Badge */}
      <div className="absolute top-0 left-0 bg-gradient-to-r from-[#7CFF00] to-[#A6FF00] h-[2px] w-8 group-hover:w-16 transition-all duration-500 rounded-full" />
      <div className="absolute top-0 left-0 bg-gradient-to-b from-[#7CFF00] to-[#A6FF00] w-[2px] h-8 group-hover:h-16 transition-all duration-500 rounded-full" />

      {/* Top Holographic Infrastructure Track Head */}
      <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-white/[0.04] font-mono text-[9px] text-neutral-500 tracking-widest uppercase">
        <span className="group-hover:text-neutral-300 transition-colors">NODE // {project.sector}</span>
        <span className="text-[#7CFF00]/60 group-hover:text-[#7CFF00] transition-colors font-semibold">PRJ-X01</span>
      </div>

      {/* Ultra-Slim Glass Wrapped Media Chamber */}
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-tr-2xl rounded-bl-2xl rounded-tl-xs rounded-br-xs bg-black/40 border-t border-l border-white/[0.08] mb-4 shrink-0 shadow-2xl">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Cinematic High-Depth Shadow Mask Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500" />
      </div>

      {/* Core Operational Text Body Wrapper */}
      <div className="flex-1 flex flex-col justify-between relative z-10">
        
        <div>
          {/* Active Framework Line Indicator */}
          <div className="mb-2 flex items-center gap-2">
            <span className="w-1 h-3 rounded-full bg-gradient-to-b from-[#7CFF00] to-[#A6FF00]" />
            <h3 className="text-sm font-bold tracking-wide text-neutral-200 group-hover:text-white transition-colors duration-300 antialiased line-clamp-1">
              {project.title}
            </h3>
          </div>

          {/* Micro-Printed Description */}
          <p className="text-neutral-400 text-[11px] mb-5 leading-relaxed font-normal tracking-wide antialiased line-clamp-2 min-h-[2.5rem] pl-3 border-l border-white/[0.04]">
            {truncateString(project.shortDescription, 95)}
          </p>
        </div>

        {/* System Deployment Interaction Module */}
        <div className="mt-auto space-y-4">
          {/* Tech Nodes Wrapped in High-Contrast Capsule Tags */}
          <div className="flex flex-wrap gap-1.5 min-h-[20px] items-center">
            {project.technologies.slice(0, 3).map((tech, idx) => (
              <span
                key={tech}
                className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-tr-md rounded-bl-md bg-white/[0.02] border-t border-l border-white/[0.08] text-neutral-400 transition-all duration-300 group-hover:border-white/[0.18] group-hover:text-neutral-200"
                style={{ transitionDelay: `${idx * 20}ms` }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm bg-[#0A1A00] border border-[#7CFF00]/20 text-[#7CFF00] font-bold">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Floating Glass Control Terminal Dock */}
          <div className="flex gap-2 p-1.5 rounded-xl bg-black/40 border border-white/[0.05] shadow-[inset_0_1px_2px_rgba(255,255,255,0.04)] font-mono text-[10px] shrink-0">
            
            {/* Live Terminal Portal */}
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 text-black py-1.5 rounded-lg font-bold tracking-widest relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_rgba(124,255,0,0.25)] transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #7CFF00, #A6FF00)'
              }}
            >
              {/* Kinetic light reflection scan */}
              <div className="absolute inset-0 w-8 h-full bg-white/20 skew-x-[-30deg] -translate-x-12 group-hover:translate-x-44 transition-transform duration-1000 ease-in-out" />
              <ExternalLink size={10} className="stroke-[2.5]" />
              <span>LIVE</span>
            </a>

            {/* Repository Mirror Portal */}
            {project.codeLink && (
              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 bg-white/[0.02] border border-white/[0.08] text-neutral-400 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.2] py-1.5 rounded-lg transition-all duration-300 font-bold tracking-widest group/btn transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Github size={10} className="group-hover/btn:scale-110 group-hover/btn:rotate-3 transition-all duration-300" />
                <span>CODE</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </Card>
  );
};
