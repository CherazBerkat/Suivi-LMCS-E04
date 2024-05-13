/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main_yellow: "#E2FD52",
        pressed_yellow: "#F1FF96",
        hover_yellow: "#B3DA08",
        main_blue: "#3D80B3",
        pressed_blue: "#31668F",
        hover_blue: "#94B9D5",
        dark_blue: "#16273B",
        pure_black: "#191919",
        steel_blue: "#234869",
        bg_black: " #1D1D1D",
        bg_yellow: "#F3F3F3",
        pure_white: "#FFFFFF",
        gris: "#939393",
        bg_gris: "#1D1D1D",
        error: "#DA1414",
        bg_error: "#FFEEEF",
        success: "#158212",
        bg_success: "#EBEEF2",
        gris_claire: "#BDBDBD"
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
