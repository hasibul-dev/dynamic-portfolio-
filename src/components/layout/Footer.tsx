import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SOCIAL_LINKS, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, WHATSAPP_NUMBER, NICKNAME } from '@/constants/config';
import { Mail, Phone, Github, Linkedin, Facebook, ArrowUp, Sparkles, Heart, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Home', action: goHome },
    { label: 'About', action: (e: React.MouseEvent) => scrollToSection(e, 'about') },
    { label: 'Portfolio', action: (e: React.MouseEvent) => scrollToSection(e, 'portfolio') },
    { label: 'Contact', action: (e: React.MouseEvent) => scrollToSection(e, 'contact') },
  ];

  const socials = [
    { href: SOCIAL_LINKS.github, icon: Github, label: 'GitHub', bg: 'hover:bg-neutral-800/40 hover:text-white' },
    { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: 'LinkedIn', bg: 'hover:bg-[#7CFF00]/10 hover:text-[#7CFF00]' },
    { href: SOCIAL_LINKS.facebook, icon: Facebook, label: 'Facebook', bg: 'hover:bg-[#7CFF00]/10 hover:text-[#7CFF00]' },
  ];

  return (
    <footer className="relative bg-[#050505] text-white pt-24 pb-8 overflow-hidden border-t border-white/[0.03]">
      
      {/* 1. SOLID GIANT WATERMARK TEXT (Highly Visible & Sharp) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none select-none text-center font-black tracking-tighter text-[28vw] leading-none opacity-[0.06] text-white mix-blend-normal"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {NICKNAME}
      </div>

      {/* High-tech abstract lighting & glow ambient effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#7CFF00]/8 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#A6FF00]/8 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 md:px-8">
        
        {/* SECTION 1: Minimalist heading & Mega CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#7CFF00' }}>
              <Sparkles size={12} className="animate-spin" style={{ animationDuration: '3s' }} />
              <span>Let's collaborate</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Ready to bring your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7CFF00] to-[#A6FF00]">
                next big idea to life?
              </span>
            </h2>
          </div>
          
          {/* CTA Button with smooth hover effects */}
          <a href={`mailto:${CONTACT_EMAIL}`} className="group relative inline-flex items-center justify-center p-4 px-8 py-4 overflow-hidden font-bold rounded-2xl bg-white text-black transition-all duration-300 ease-out shadow-xl shadow-white/5 hover:scale-[1.05] hover:shadow-[#7CFF00]/10">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#7CFF00] to-[#A6FF00] group-hover:translate-x-0 ease-out">
              <ArrowRight size={20} />
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease-out">
              Start A Project
            </span>
            <span className="relative invisible">Start A Project</span>
          </a>
        </div>

        {/* SECTION 2: Ultra-Modern Bento Grid (Fully Transparent & High Animation) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          
          {/* CARD 1: Quick links & Navigation */}
          <div className="p-8 rounded-3xl bg-transparent border border-white/[0.06] backdrop-blur-md flex flex-col justify-between group hover:bg-white/[0.03] hover:border-white/[0.15] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out">
            <div>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6 group-hover:text-neutral-400 transition-colors">Navigation</h3>
              <div className="grid grid-cols-2 gap-4">
                {quickLinks.map(({ label, action }) => (
                  <a
                    key={label}
                    href="/"
                    onClick={action}
                    className="text-sm text-neutral-400 hover:text-white font-medium transition-colors duration-200 cursor-pointer flex items-center gap-1 group/link"
                  >
                    <span>{label}</span>
                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" style={{ color: '#7CFF00' }} />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/[0.05] text-xs text-neutral-500 font-medium group-hover:text-neutral-400 transition-colors">
              Explore my digital playground.
            </div>
          </div>

          {/* CARD 2: Live Contact Methods */}
          <div className="p-8 rounded-3xl bg-transparent border border-white/[0.06] backdrop-blur-md flex flex-col justify-between group hover:bg-white/[0.03] hover:border-white/[0.15] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out">
            <div>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6 group-hover:text-neutral-400 transition-colors">Connect Directly</h3>
              <div className="space-y-4">
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors group/item">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/[0.05] group-hover/item:border-[#7CFF00]/40 group-hover/item:bg-[#7CFF00]/5 transition-all duration-300">
                    <Mail size={16} className="group-hover/item:text-[#7CFF00] transition-colors" />
                  </div>
                  <span className="text-sm font-medium truncate">{CONTACT_EMAIL}</span>
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors group/item">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/[0.05] group-hover/item:border-[#A6FF00]/40 group-hover/item:bg-[#A6FF00]/5 transition-all duration-300">
                    <Phone size={16} className="group-hover/item:text-[#A6FF00] transition-colors" />
                  </div>
                  <span className="text-sm font-medium">{CONTACT_PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/[0.05] flex items-center gap-2 text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#7CFF00' }} />
              <span>Available for freelance contracts</span>
            </div>
          </div>

          {/* CARD 3: Social Hub & Brand Identity */}
          <div className="p-8 rounded-3xl bg-transparent border border-white/[0.06] backdrop-blur-md flex flex-col justify-between group hover:bg-white/[0.03] hover:border-white/[0.15] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out">
            <div>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6 group-hover:text-neutral-400 transition-colors">Follow Me</h3>
              <div className="flex gap-3">
                {socials.map(({ href, icon: Icon, label, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className={`w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-neutral-400 hover:scale-110 hover:border-white/20 transition-all duration-300 ${bg}`}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/[0.05]">
              <span className="text-base font-bold tracking-wide block mb-1 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#7CFF00] transition-all duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Hasibul Hassan
              </span>
              <span className="text-[11px] text-neutral-500 block leading-tight group-hover:text-neutral-400 transition-colors">
                Software Engineer & UI/UX Specialist.
              </span>
            </div>
          </div>

        </div>

        {/* SECTION 3: Bottom Bar & Copyright info */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-neutral-500 text-xs font-medium text-center sm:text-left">
            <span>&copy; {currentYear} {NICKNAME}. All rights reserved. </span>
            <span className="block sm:inline sm:ml-2 mt-1 sm:mt-0 text-neutral-600">
              Made with <Heart size={10} className="inline text-[#7CFF00] fill-[#7CFF00] mx-0.5" /> in Bangladesh
            </span>
          </div>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.01] hover:bg-white/[0.06] border border-white/[0.05] hover:border-white/[0.12] text-neutral-400 hover:text-white transition-all duration-300 text-xs font-semibold tracking-wide shadow-sm"
          >
            <span>Back to top</span>
            <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};
