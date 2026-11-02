/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FFF9F2',
          200: '#F5ECE1',
          300: '#E9DDCE',
        },
        lavender: {
          100: '#F2EDFA',
          200: '#E2D6F5',
          300: '#C9B8E8',
          400: '#A993D6',
          500: '#8873B5',
          600: '#695593',
          700: '#4D3B70',
        },
        blush: {
          100: '#FDF0F3',
          200: '#FBDDE5',
          300: '#F5C9D6',
          400: '#E79AB3',
          500: '#D56A8F',
        },
        charcoal: {
          800: '#3D3845',
          900: '#29252F',
          950: '#1D1923',
        },
        gold: {
          300: '#E3C994',
          400: '#D6B77E',
          500: '#C9A66B',
          600: '#A68449',
        },
        // Parisian Ribbon & Champagne Gold Luxury Theme
        parisian: {
          ivory: '#FFF9F5',
          border: '#F3E3DC',
          ribbon: '#9E2A47',
          'ribbon-dark': '#7E1F38',
          'ribbon-wine': '#5E1B2E',
          'ribbon-deep': '#3B101D',
          'ribbon-night': '#240911',
          gold: '#D49B4B',
          'gold-tint': '#FDF4E7',
          cocoa: '#2B181E',
          mauve: '#7A6269',
          mint: '#1F8A65',
          'mint-bg': '#EAF7F1',
          amber: '#C87D20',
          'amber-bg': '#FEF6E7',
          coral: '#D64550',
          'coral-bg': '#FDEDEE',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(136, 115, 181, 0.12)',
        'soft-lg': '0 20px 40px -15px rgba(41, 37, 47, 0.1)',
        'glow': '0 0 25px rgba(201, 184, 232, 0.5)',
      }
    },
  },
  plugins: [],
}
