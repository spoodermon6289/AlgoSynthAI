/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'matrix-rain': 'matrixRain 20s linear infinite',
        'circuit-pulse': 'circuitPulse 3s ease-in-out infinite',
        'neural-glow': 'neuralGlow 2s ease-in-out infinite alternate',
        'data-flow': 'dataFlow 4s linear infinite',
        'hologram': 'hologram 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotateX(0deg)' },
          '50%': { transform: 'translateY(-20px) rotateX(5deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 112, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(139, 69, 255, 0.6)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        circuitPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        neuralGlow: {
          '0%': { 
            boxShadow: '0 0 20px rgba(0, 112, 255, 0.3), inset 0 0 20px rgba(139, 69, 255, 0.1)' 
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(139, 69, 255, 0.6), inset 0 0 30px rgba(0, 112, 255, 0.2)' 
          },
        },
        dataFlow: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        hologram: {
          '0%': { 
            textShadow: '0 0 10px rgba(0, 112, 255, 0.5), 0 0 20px rgba(139, 69, 255, 0.3)',
            filter: 'hue-rotate(0deg)'
          },
          '100%': { 
            textShadow: '0 0 20px rgba(139, 69, 255, 0.8), 0 0 30px rgba(0, 112, 255, 0.5)',
            filter: 'hue-rotate(15deg)'
          },
        },
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      colors: {
        'cyber-blue': {
          50: '#f0f4ff',
          100: '#e0ecff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#0070ff',
          600: '#0056cc',
          700: '#003d99',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        'cyber-purple': {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#8b45ff',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        'neon': {
          blue: '#0070ff',
          purple: '#8b45ff',
          pink: '#ff006e',
          dark: '#0a0a1a',
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        'cyber': ['Orbitron', 'monospace'],
      },
    },
  },
  plugins: [],
};