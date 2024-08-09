import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'cursive': ['Brush Script MT', 'cursive'],
        'handwriting': ['Caveat', 'cursive'],
        'rounded': ['Varela Round', 'sans-serif'],
        'tech': ['Share Tech Mono', 'monospace'],
        'elegant': ['Cormorant Garamond', 'serif'],
        'slab': ['Roboto Slab', 'serif'],
        'decorative': ['Lobster', 'cursive'],
        'nature': ['Naturalist', 'sans-serif'],
        'romantic': ['Great Vibes', 'cursive'],
        'industrial': ['Roboto Condensed', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],  // Google Font
        'open-sans': ['Open Sans', 'sans-serif'],  // Google Font
        'lato': ['Lato', 'sans-serif'],  // Google Font
        'montserrat': ['Montserrat', 'sans-serif'],  // Google Font
        'source-sans': ['Source Sans Pro', 'sans-serif'],  // Google Font
        'poppins': ['Poppins', 'sans-serif'],  // Google Font
        'merriweather': ['Merriweather', 'serif'],  // Google Font
        'playfair': ['Playfair Display', 'serif'],  // Google Font
        'raleway': ['Raleway', 'sans-serif'],  // Google Font
        'nunito': ['Nunito', 'sans-serif'],  // Google Font
        'ubuntu': ['Ubuntu', 'sans-serif'],  // Google Font
        'oswald': ['Oswald', 'sans-serif'],  // Google Font
        'dancing-script': ['Dancing Script', 'cursive'],  // Google Font
        'rubik': ['Rubik', 'sans-serif'],  // Google Font
        'fira-sans': ['Fira Sans', 'sans-serif'],  // Google Font
        'lora': ['Lora', 'serif'],  // Google Font
        'karla': ['Karla', 'sans-serif'],  // Google Font
        'quicksand': ['Quicksand', 'sans-serif'],  // Google Font
        'inconsolata': ['Inconsolata', 'monospace'],  // Google Font
        'pt-sans': ['PT Sans', 'sans-serif'],  // Google Font
      },

      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
