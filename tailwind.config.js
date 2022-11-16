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
          // dark blue
          "primary": "#32475b",
          // medium blue
          "secondary": "#3e566c",
          // red
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

// "person" icon
{/* <svg
className="fill-current"
xmlns="http://www.w3.org/2000/svg"
width="24"
height="24"
viewBox="0 0 24 24"
>
<path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
</svg> */}
