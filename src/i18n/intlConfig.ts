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
  "/reset-password/[token]": {
    en: "/reset-password/[token]",
    fr: "/reinitialiser-mot-de-passe/[token]",
  },

  "/mail-confirmation": {
    en: "/mail-confirmation",
    fr: "/confirmation-mail",
  },

  "/internal-error": {
    en: "/internal-error",
    fr: "/erreur-interne",
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
  "/dashboard/settings": {
    en: "/dashboard/settings",
    fr: "/tableau-de-bord/parametres",
  },
  "/dashboard/post/[id]": {
    en: "/dashboard/post/[id]",
    fr: "/tableau-de-bord/post/[id]",
  },
  "/dashboard/create": {
    en: "/dashboard/create",
    fr: "/tableau-de-bord/creer",
  },
  "/dashboard/profile": {
    en: "/dashboard/profile",
    fr: "/tableau-de-bord/profil",
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
