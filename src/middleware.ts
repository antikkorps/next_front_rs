import createMiddleware from 'next-intl/middleware';
import {pathnames, locales, localePrefix} from './i18n/intlConfig';
import { NextRequest, NextResponse } from 'next/server';



const publicPages = ['/login', '/connexion'];

const intlMiddleware = createMiddleware({
    defaultLocale: 'en',
    locales,
    pathnames,
    localePrefix
  });
 
const authMiddleware = async (req: NextRequest) => {
  
    // All the logic to get UserData
    const userData = "OK";
    if (!userData) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    return intlMiddleware(req);

};


export async function middleware(req: NextRequest) {
    // Here the middleware part to check if Route is public or auth need
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

    
  if (isPublicPage) {
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

