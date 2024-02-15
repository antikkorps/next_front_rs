import createMiddleware from 'next-intl/middleware';
import {pathnames, locales, localePrefix} from './i18n/intlConfig';
import { NextRequest, NextResponse } from 'next/server';
import { checkRoles, getUser } from '../actions/get-user.server';



const publicPages = [
  '/login', 
  '/connexion', 
  "/signup", 
  "/inscription",
  "/forgotten-password",
  "/mot-de-passe-oublie",
  "/internal-error",
  "/erreur-interne",
  "/dashboard",
  "/tableau-de-bord",
];
const dynamicPublicPages = [
  "/reset-password",
  "/reinitialiser-mot-de-passe",
];

const isMustBeGuestPage = [
  '/login', 
  '/connexion', 
  "/signup", 
  "/inscription",
];




const intlMiddleware = createMiddleware({
    defaultLocale: 'en',
    locales,
    pathnames,
    localePrefix
  });
 
  
const authMiddleware = async (req: NextRequest) => {
  // if you need to deactivate the authMiddleware you can comment the uncomment code, and uncomment the commented code.
    const { user, error } = await getUser();

    if (!user || error) {
      if(error) {
        if(error.code === 500) {
          return NextResponse.redirect(new URL('/internal-error', req.nextUrl));
        }
      }
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    return intlMiddleware(req);


    // return intlMiddleware(req);
};

// middleware for loggin and signup pages.
const mustBeGuestMiddleware = async (req: NextRequest) => {
  const { user, error } = await getUser();
  if(error) {
    if(error.code === 500) {
      return NextResponse.redirect(new URL('/internal-error', req.nextUrl));
    }
  }
  if (user && !error) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }
  return intlMiddleware(req);
}


export async function middleware(req: NextRequest) {
  // this was the first regex without dynamic params, I keep it in case the new one doesn't work
  // const publicPathnameRegex = RegExp(
  //   `^(/(${locales.join('|')}))?(${publicPages
  //     .flatMap((p) => (p === '/' ? ['', '/'] : p))
  //     .join('|')})/?$`,
  //   'i'
  // );

  // this is the new regex with dynamic params
  // First all the route that doesn't need to be authenticated
  const notAuthPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.concat(dynamicPublicPages).join('|')})($|(/[a-zA-Z0-9_.-]+)*(\\?.*)?$)`,
    'i'
);
  // Here the route that need to be guest only, not auth
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${isMustBeGuestPage.join('|')})($|(/[a-zA-Z0-9_-]+)*)$`,
    'i'
  );
  
  const notAuthPage = notAuthPathnameRegex.test(req.nextUrl.pathname);
  const isPublic = publicPathnameRegex.test(req.nextUrl.pathname);

  if (notAuthPage) {
    if(isPublic) {
      return await(mustBeGuestMiddleware as any)(req);
    }
    return intlMiddleware(req);
  } else {
    return await(authMiddleware as any)(req);
  }
}


export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix

    '/(fr|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)

    '/((?!_next|_vercel|.*\\..*).*)',
    '/((?!api|_next|.*\\..*).*)'
  ]
};

