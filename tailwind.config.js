/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-600': '#334EAC',
        'primary-200': '#BAD6EB',
        'bg-base': '#FFF9EF',
        'accent-500': '#E95623',
        'neutral-700': '#405363',
        'neutral-200': '#C9D4E0',
      },
      borderRadius: {
        '2xl': '1rem', // 16px
      },
      boxShadow: {
        'card': '0 4px 18px -2px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
