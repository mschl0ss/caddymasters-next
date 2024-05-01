'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
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

// export const appPages: { [key in AppPage]: JSX.Element } = {
//   [AppPage.PATH_SELECT]: <PathSelect />,
//   [AppPage.COURSE_SELECT]: <CourseSelect />,
//   [AppPage.RULESET_SELECT]: <RulesetSelect />,
//   [AppPage.PLAYER_INFO]: <></>,
//   [AppPage.HOLE_INFO]: <></>,
// };

export const appPageLabel: { [key in AppPage]: string } = {
  [AppPage.PATH_SELECT]: 'Welcome',
  [AppPage.COURSE_SELECT]: 'Choose a Course',
  [AppPage.RULESET_SELECT]: 'Choose a Ruleset',
  [AppPage.PLAYER_SELECT]: 'Choose Players',
  [AppPage.HOLE_INFO]: 'Hole',
};

interface AppPageContext {
  appPage: AppPage;
  setAppPage: Dispatch<SetStateAction<AppPage>>;
}

const missingContextValue = null;

const appPageContext = createContext<AppPageContext>(missingContextValue as unknown as AppPageContext);

export default function AppPageProvider({ children }: { children: ReactNode }) {
  const [appPage, setAppPage] = useState<AppPage>(AppPage.PATH_SELECT);

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
