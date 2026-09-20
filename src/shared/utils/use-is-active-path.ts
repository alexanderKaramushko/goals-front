import { useCallback } from 'react';
import { matchPath, useLocation } from 'react-router';

export const useIsActivePath = () => {
  const { pathname } = useLocation();

  return useCallback((path: string) => Boolean(matchPath(`${path}/*`, pathname)), [pathname]);
};
