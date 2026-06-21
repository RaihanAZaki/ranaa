/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        script: ["Dancing Script", "cursive"]
      },
      colors: {
        blush: "#FFF1F4",
        roseLove: "#F65A83",
        softRose: "#FFD6DF",
        deepRose: "#C63A62"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(246, 90, 131, 0.18)"
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.5s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" }
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.08)", opacity: "0.8" }
        }
      }
    }
  },
  plugins: []
};
