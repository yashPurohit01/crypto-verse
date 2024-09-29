// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Next.js pages directory
    './components/**/*.{js,ts,jsx,tsx}', // Any custom components you have
    './app/**/*.{js,ts,jsx,tsx}', // If using the app directory (Next.js 13+)
    './node_modules/@mantine/**/*.{js,ts,jsx,tsx}', // Mantine components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
