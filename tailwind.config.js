/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#0D0D0D',
        accent: '#7CFF00',
        success: '#39FF14',
        danger: '#EF4444',
        warning: '#A6FF00',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-in-out',
        fadeInUp: 'fadeInUp 0.8s ease-out',
        fadeInDown: 'fadeInDown 0.8s ease-out',
        slideUp: 'slideUp 0.7s ease-out',
        slideDown: 'slideDown 0.7s ease-out',
        slideRight: 'slideRight 0.7s ease-out',
        slideLeft: 'slideLeft 0.7s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 4s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        shimmer: 'shimmer 3s infinite',
        bounce: 'bounce 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        spin: 'spin 1s linear infinite',
        heartbeat: 'heartbeat 1.3s ease-in-out infinite',
        gradientShift: 'gradientShift 4s ease infinite',
        morph: 'morph 8s ease-in-out infinite',
        auroraMove: 'auroraMove 12s ease-in-out infinite alternate',
        gridMove: 'gridMove 20s linear infinite',
        scaleIn: 'scaleIn 0.5s ease-out',
        rotateIn: 'rotateIn 0.6s ease-out',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        neonPulse: 'neonPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 255, 0, 0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(124, 255, 0, 0.6), 0 0 100px rgba(124, 255, 0, 0.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '1000px 0' },
          '100%': { backgroundPosition: '-1000px 0' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        morph: {
          '0%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 60% 70% 40%' },
          '75%': { borderRadius: '60% 30% 60% 40% / 70% 40% 50% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
        },
        auroraMove: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(50px, -30px) scale(1.05)' },
        },
        gridMove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        rotateIn: {
          '0%': { transform: 'rotate(-180deg) scale(0)', opacity: '0' },
          '100%': { transform: 'rotate(0) scale(1)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        neonPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 255, 0, 0.3), 0 0 40px rgba(124, 255, 0, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(124, 255, 0, 0.6), 0 0 80px rgba(124, 255, 0, 0.3), 0 0 120px rgba(124, 255, 0, 0.1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
