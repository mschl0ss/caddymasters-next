'use client';

import { useRouter } from 'next/navigation';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export enum AppPage {
  PATH_SELECT,
  COURSE_SELECT,
  RULESET_SELECT,
  PLAYER_SELECT,
  HOLE_INFO,
}

export const appPages: { [key in AppPage]: { label: string; path?: string } } = {
  [AppPage.PATH_SELECT]: { label: 'Welcome', path: '/game-setup/path-select' },
  [AppPage.COURSE_SELECT]: { label: 'Choose a Course', path: '/game-setup/course-select' },
  [AppPage.RULESET_SELECT]: { label: 'Choose a Ruleset', path: '/game-setup/ruleset-select' },
  [AppPage.PLAYER_SELECT]: { label: 'Choose Players' },
  [AppPage.HOLE_INFO]: { label: 'Hole' },
};

interface AppPageContext {
  appPage: AppPage;
  setAppPage: Dispatch<SetStateAction<AppPage>>;
}

const missingContextValue = null;

const appPageContext = createContext<AppPageContext>(missingContextValue as unknown as AppPageContext);

export default function AppPageProvider({ children }: { children: ReactNode }) {
  const [appPage, setAppPage] = useState<AppPage>(AppPage.PATH_SELECT);
  const router = useRouter();

  useEffect(() => {
    router.push(appPages[appPage].path || '/game-setup/path-select');
  }, [appPage, router]);

  const contextValue = useMemo(() => ({
    appPage,
    setAppPage,
  }), [appPage]);

  return (
    <appPageContext.Provider value={contextValue}>
      {children}
    </appPageContext.Provider>
  );
}

export const useAppPageContext = () => {
  const context = useContext(appPageContext);
  if (context === missingContextValue) {
    throw new Error('Missing appPageContext');
  }
  return context;
};
