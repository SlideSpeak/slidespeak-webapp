/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'canvas': {
          100: '#F2F4F7',
        },
        'text': {
          'primary': '#1D2939',
        },
        'border': {
          'primary': '#00000033',
        }
      },
      animation: {
        'spin-pretty': 'spin-pretty 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite',
        bounce200: 'bounce 1s infinite 250ms',
        bounce400: 'bounce 1s infinite 500ms',
        bounce600: 'bounce 1s infinite 750ms',
      },
      keyframes: {
        'spin-pretty': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'translateY(-3px)',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
    },
  },
  plugins: [],
}
