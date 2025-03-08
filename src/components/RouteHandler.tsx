import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { NavItem, Routes } from '@/constants/globalConstants';
import { useHeaderNavSlice } from '@/globalState/stateSlices/headerNavSlice/useHeaderNavSlice';

export const RouteHandler = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const {
    actions: { changeNav },
  } = useHeaderNavSlice();

  useEffect(() => {
    const activeNav = Object.keys(Routes).find(
      (key) => Routes[key as NavItem] === pathname
    ) as NavItem | undefined;

    if (activeNav) {
      changeNav(activeNav);
    }
  }, []);

  return <>{children}</>;
};
