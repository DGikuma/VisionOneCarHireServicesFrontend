/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          orange: {
            50: "#FFF3EC",
            100: "#FFE1CF",
            200: "#FFC3A1",
            300: "#FFA573",
            400: "#FF8745",
            500: "#F36F21", // PRIMARY BRAND COLOR
            600: "#DB5F1D",
            700: "#B84F18",
            800: "#943F13",
            900: "#70300F",
          },
          charcoal: {
            50: "#F4F5F6",
            100: "#E6E8EA",
            200: "#C9CDD1",
            300: "#ACB2B8",
            400: "#8F969E",
            500: "#3E434A", // BRAND DARK
            600: "#353A40",
            700: "#2C3035",
            800: "#23262A",
            900: "#1A1C1F",
          },
        },
        neutral: {
          light: "#F5F5F5",
          white: "#FFFFFF",
        },
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },

      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },

      boxShadow: {
        soft: "0 10px 40px rgba(0, 0, 0, 0.05)",
        hard: "0 20px 80px rgba(0, 0, 0, 0.1)",
        "inner-lg": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};

