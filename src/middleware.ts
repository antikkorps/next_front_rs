import createMiddleware from 'next-intl/middleware';
import {pathnames, locales, localePrefix} from './i18n/intlConfig';
import { NextRequest, NextResponse } from 'next/server';
import { redirect } from './i18n/navigation';
import { checkRoles, getUser } from '../actions/get-user.server';



const publicPages = ['/login', '/connexion', "/signup", "/inscription"];

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
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    return intlMiddleware(req);


    // return intlMiddleware(req);
};

// middleware for loggin and signup pages.
const mustBeGuestMiddleware = async (req: NextRequest) => {
  const { user, error } = await getUser();

  if (user && !error) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }
  return intlMiddleware(req);
}


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
    // return intlMiddleware(req);
    return await(mustBeGuestMiddleware as any)(req);
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

