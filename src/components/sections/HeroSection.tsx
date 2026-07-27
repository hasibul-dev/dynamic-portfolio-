import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/common';
import { ArrowRight, Send, Sparkles, Github, Linkedin, Facebook } from 'lucide-react';
import { SOCIAL_LINKS } from '@/constants/config';
import mainImg from '@/image/main.png';

const TYPING_WORDS = ['Web Designer', 'Backend Dev', 'Frontend Dev', 'Problem Solver'];

// Floating Particle for Background
const FloatingParticle: React.FC<{ delay: number; size: number; left: number; duration: number }> = ({ delay, size, left, duration }) => (
  <div
    className="particle"
    style={{
      width: size,
      height: size,
      left: `${left}%`,
      bottom: '-20px',
      backgroundColor: '#7CFF00',
      opacity: 0.15,
      position: 'absolute',
      borderRadius: '2px',
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  />
);

// Cybernetic Grid Line for the image background
const GridLine: React.FC<{ left: number; delay: number }> = ({ left, delay }) => (
  <div 
    className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-[#7CFF00]/20 to-transparent"
    style={{ 
      left: `${left}%`, 
      animation: `dataStream 4s linear infinite`,
      animationDelay: `${delay}s`
    }}
  />
);

export const HeroSection: React.FC = () => {
  const [typingText, setTypingText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPING_WORDS[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setTypingText(currentWord.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (charIndex > 0) {
          setTypingText(currentWord.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % TYPING_WORDS.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  const particles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: Math.random() * 15,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 15,
    })), []);

  const gridLines = useMemo(() => 
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: i * 10 + Math.random() * 5,
      delay: Math.random() * 2
    })), []);

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    /* pt-32 sm:pt-36 lg:pt-40 যোগ করা হয়েছে যেন এটি হেডার থেকে পর্যাপ্ত নিচে নেমে আসে */
    <section className="min-h-screen relative flex items-center px-4 pt-32 sm:pt-36 lg:pt-40 pb-16 overflow-hidden bg-[#050505]">
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#7CFF00]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#A6FF00]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15" />
      
      {particles.map((p) => (
        <FloatingParticle key={p.id} {...p} />
      ))}

      <div className="max-w-[1700px] mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE - TEXT CONTENT */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-6 animate-fadeInDown">
              <Sparkles size={14} style={{ color: '#7CFF00' }} className="animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Available for Freelance</span>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#7CFF00' }} />
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 animate-fadeInUp leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              Hi, I'm<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7CFF00] to-[#A6FF00]">
                Hasibul Hassan Shanto
              </span>
            </h1>

            <div
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 animate-fadeInUp h-10 md:h-12 flex items-center"
              style={{ 
                animationDelay: '0.2s', 
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                color: '#7CFF00'
              }}
            >
              <span className="typing-cursor border-r-2 border-[#7CFF00] pr-1">{typingText}</span>
            </div>

            <p className="text-base md:text-lg text-neutral-400 mb-8 max-w-xl leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              I craft <span className="font-semibold text-white">stunning</span>,{' '}
              <span className="font-semibold" style={{ color: '#7CFF00' }}>pixel-perfect</span>, and{' '}
              <span className="font-semibold" style={{ color: '#A6FF00' }}>high-performance</span>
              {' '}experiences that captivate users and elevate brands.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <button onClick={scrollToPortfolio} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full group text-base !bg-gradient-to-r from-[#7CFF00] to-[#A6FF00] border-0 text-black font-bold rounded-xl shadow-lg shadow-[#7CFF00]/10 hover:scale-[1.02] transition-transform">
                  <span>View My Work</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Button>
              </button>
              <button onClick={scrollToContact} className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full group text-base rounded-xl border-white/[0.05] bg-white/[0.02] backdrop-blur-md text-neutral-300 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12] transition-all">
                  <Send size={18} />
                  <span>Hire Me</span>
                </Button>
              </button>
            </div>

            <div className="flex items-center gap-4 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <span className="text-xs uppercase tracking-widest text-neutral-600 font-bold">Follow</span>
              <div className="h-px flex-1 max-w-[40px] bg-white/[0.05]" />
              {[
                { href: SOCIAL_LINKS.github, icon: Github, label: 'GitHub' },
                { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: SOCIAL_LINKS.facebook, icon: Facebook, label: 'Facebook' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/[0.15] hover:scale-110 transition-all duration-300"
                  title={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - THE UNIQUE "NEURAL DATA STREAM" IMAGE DESIGN */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fadeInUp relative" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px] flex items-center justify-center">
              
              {/* 1. Behind everything: Rotating Cyber Hexagon */}
              <div className="absolute inset-0 rotate-animate opacity-40">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#7CFF00]" fill="none" strokeWidth="0.5">
                  <polygon points="50,1 95,25 95,75 50,99 5,75 5,25" />
                </svg>
              </div>

              {/* 2. Neural Grid & Data Streams area */}
              <div className="absolute w-[80%] h-[80%] overflow-hidden mask-fade-edges">
                {gridLines.map(line => (
                  <GridLine key={line.id} left={line.left} delay={line.delay} />
                ))}
              </div>

              {/* 3. Global Outer Glow */}
              <div className="absolute inset-10 bg-gradient-to-r from-[#7CFF00] to-[#A6FF00] opacity-15 blur-[100px] rounded-full pointer-events-none" />

              {/* 4. The Main Image (Floating) */}
              <div className="relative w-[75%] h-[75%] z-10 animate-float-slow">
                <img
                  src={mainImg}
                  alt="Hasibul Hassan Shanto"
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(124,255,0,0.3)] transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              {/* 5. Glowing Corner Elements (no solid frame) */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-[#7CFF00] rounded-tl-xl shadow-[0_0_15px_#7CFF00]" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#A6FF00] rounded-tr-xl shadow-[0_0_15px_#A6FF00]" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-[#7CFF00] rounded-br-xl shadow-[0_0_15px_#7CFF00]" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-[#A6FF00] rounded-bl-xl shadow-[0_0_15px_#A6FF00]" />

              {/* 6. Abstract Code snippets floating around */}
              <div className="hidden lg:block absolute -top-5 right-1/4 bg-black/50 backdrop-blur-sm border border-white/10 px-2 py-1 rounded text-[10px] font-mono text-[#7CFF00]/70 z-20">
                const user = "Hasibul";
              </div>
              <div className="hidden lg:block absolute bottom-10 -left-10 bg-black/50 backdrop-blur-sm border border-white/10 px-2 py-1 rounded text-[10px] font-mono text-[#A6FF00]/70 z-20">
                render(DevMode);
              </div>
            </div>
          </div>
        </div>

        {/* STATS GLASS BOARD */}
        <div className="mt-16 md:mt-20 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
          <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.002] border-t border-l border-white/[0.18] border-r border-b border-white/[0.04] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_30px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl grid grid-cols-3 gap-6 md:gap-12 text-center lg:text-left group hover:from-white/[0.06] hover:to-white/[0.01] hover:border-t-white/[0.25] hover:border-l-white/[0.25] hover:-translate-y-1.5 hover:shadow-[0_25px_50px_rgba(124,255,0,0.08)] transition-all duration-500 ease-out">
            {[
              { value: '10+', label: 'Projects Done' },
              { value: '5+', label: 'Happy Clients' },
              { value: '3+', label: 'Years Experience' },
            ].map(({ value, label }) => (
              <div key={label} className="group/stat cursor-pointer">
                <p
                  className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7CFF00] to-[#A6FF00] group-hover/stat:scale-105 transition-transform duration-500 inline-block"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {value}
                </p>
                <p className="text-neutral-500 group-hover/stat:text-neutral-300 transition-colors mt-1 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

     {/* REQUIRED CSS ANIMATIONS */}
<style>{`
  @keyframes rotate-animate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes dataStream {
    0% { transform: translateY(-100%); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(100%); opacity: 0; }
  }
  @keyframes float-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .rotate-animate {
    animation: rotate-animate 20s linear infinite;
  }
  .animate-float-slow {
    animation: float-slow 6s ease-in-out infinite;
  }
  .mask-fade-edges {
    mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
  }
`}</style>
    </section>
  );
};