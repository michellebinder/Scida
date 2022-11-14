/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // theme for bubble animation
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  //customized theme for daisyUI!
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#32475b",

          "secondary": "#3e566c",

          "accent": "#ae131e",

          "neutral": "#191D24",

          "base-100": "white",

          "background": "#e5e7ec",

          "info": "#3ABFF8",

          "success": "#36D399",

          "warning": "#FBBD23",

          "error": "#F87272",
        },
        
      },
      
    ],
  },
  //essential for daisyUI!
  plugins: [require("daisyui")],
};
