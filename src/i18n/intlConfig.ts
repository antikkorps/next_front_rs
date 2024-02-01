import { Pathnames } from "next-intl/navigation"

export const locales = ["en", "fr"] as const

export const pathnames = {
  "/": "/",

  "/login": {
    en: "/login",
    fr: "/connexion",
  },

  "/signup": {
    en: "/signup",
    fr: "/inscription",
  },

  "/forgotten-password": {
    en: "/forgotten-password",
    fr: "/mot-de-passe-oublie",
  },

  "/coming-soon": {
    en: "/coming-soon",
    fr: "/bientot",
  },

  // SIDEBAR NAV
  "/dashboard": {
    en: "/dashboard",
    fr: "/tableau-de-bord",
  },

  "/dashboard/search": {
    en: "/dashboard/search",
    fr: "/tableau-de-bord/recherche",
  },
  "/dashboard/explore": {
    en: "/dashboard/explore",
    fr: "/tableau-de-bord/explorer",
  },
  "/dashboard/reels": {
    en: "/dashboard/reels",
    fr: "/tableau-de-bord/reels",
  },
  "/dashboard/messages": {
    en: "/dashboard/messages",
    fr: "/tableau-de-bord/messages",
  },
  "/dashboard/notifications": {
    en: "/dashboard/notifications",
    fr: "/tableau-de-bord/notifications",
  },
  "/dashboard/create": {
    en: "/dashboard/create",
    fr: "/tableau-de-bord/creer",
  },
  "/shop": {
    en: "/shop",
    fr: "/boutique",
  },
} satisfies Pathnames<typeof locales>

// Use the default: `always`
// export const localePrefix = "as-needed";
export const localePrefix = undefined
export type AppPathnames = keyof typeof pathnames
