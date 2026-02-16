export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#93c5fd',
          600: '#60a5fa',
          700: '#1d4ed8'
        }
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: []
};
