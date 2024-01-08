import { pathnames } from "@/i18n/intlConfig";


export const checkPathname = (href) => {
    if (href in pathnames) {
      const pathnameData = pathnames[href];
      if (typeof pathnameData === 'string') {
        return [pathnameData];
      } else {
        const iterations = Object.values(pathnameData);
        return iterations;
      }
    }
    return null;  
  };