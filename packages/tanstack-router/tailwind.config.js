/** @type {import('tailwindcss').Config} */
export default {
  relative: true,
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      spacing: {},
      borderRadius: {},
      fontSize: {},
      colors: {},
      fontFamily: {
        //
      },
    },
  },
  plugins: [],
};
