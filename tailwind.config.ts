import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
        mono: ["var(--font-mono)", "Fira Code", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-in": {
          from: {
            transform: "translateX(-100%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        "pulse-health": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.05)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "pulse-health": "pulse-health 2s ease-in-out infinite",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, hsl(140 20% 95%) 0%, hsl(35 30% 95%) 50%, hsl(25 25% 90%) 100%)',
        'pattern-viz': 'linear-gradient(45deg, transparent 30%, hsl(140 15% 85% / 0.3) 30%, hsl(140 15% 85% / 0.3) 70%, transparent 70%)',
      },
      boxShadow: {
        'app-preview': '0 25px 50px hsl(140 15% 50% / 0.15)',
        'health-card': '0 4px 6px -1px hsl(140 15% 50% / 0.1), 0 2px 4px -1px hsl(140 15% 50% / 0.06)',
      },
      gridTemplateColumns: {
        'health-week': 'repeat(7, minmax(0, 1fr))',
        'health-pattern': 'repeat(auto-fit, minmax(2rem, 1fr))',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), 
    require("@tailwindcss/typography"),
    // Add custom plugin for health-specific utilities
    function({ addUtilities }: any) {
      const newUtilities = {
        '.bristol-1': {
          backgroundColor: 'hsl(30 60% 30%)',
          color: 'white',
        },
        '.bristol-2': {
          backgroundColor: 'hsl(30 60% 40%)',
          color: 'white',
        },
        '.bristol-3': {
          backgroundColor: 'hsl(30 60% 50%)',
          color: 'white',
        },
        '.bristol-4': {
          backgroundColor: 'hsl(30 60% 60%)',
          color: 'white',
        },
        '.bristol-5': {
          backgroundColor: 'hsl(30 60% 70%)',
          color: 'black',
        },
        '.bristol-6': {
          backgroundColor: 'hsl(30 60% 80%)',
          color: 'black',
        },
        '.bristol-7': {
          backgroundColor: 'hsl(30 60% 90%)',
          color: 'black',
        },
        '.file-upload-drag': {
          borderColor: 'var(--primary)',
          backgroundColor: 'hsl(var(--primary) / 0.05)',
        },
        '.pattern-grid': {
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '0.25rem',
        },
        '.health-metric': {
          background: 'linear-gradient(135deg, var(--card) 0%, var(--muted) 100%)',
          border: '1px solid var(--border)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config;
