import App from 'next/app';
import {
  useParams,
  usePathname,
  useRouter,
} from 'next/navigation';
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
  PATH_SELECT = 'PATH_SELECT',
  COURSE_SELECT = 'COURSE_SELECT',
  RULESET_SELECT = 'RULESET_SELECT',
  USER_SELECT = 'USER_SELECT',
  HOLE_INFO = 'HOLE_INFO',
  UNKNOWN = 'UNKNOWN',
}

type AppPageDetail = { label: string; path?: string };

export const appPages: { [key in AppPage]: AppPageDetail } = {
  [AppPage.PATH_SELECT]: { label: 'Welcome', path: '/path-select' },
  [AppPage.COURSE_SELECT]: { label: 'Choose a Course', path: '/course-select' },
  [AppPage.RULESET_SELECT]: { label: 'Choose a Ruleset', path: '/ruleset-select' },
  [AppPage.USER_SELECT]: { label: 'Choose Players', path: '/user-select' },
  [AppPage.HOLE_INFO]: { label: 'Hole' },
  [AppPage.UNKNOWN]: { label: '' },
};

interface AppPageContext {
  appPage: keyof typeof AppPage;
  setAppPage: Dispatch<SetStateAction<keyof typeof AppPage>>;
}

const missingContextValue = null;

const getAppPageFromPath = (path: string): keyof typeof AppPage => {
  const foundPath = Object.entries(appPages)
    .find(([appPage, details]) => path === details.path);
  if (!foundPath) {
    return 'UNKNOWN';
  }
  return foundPath[0] as keyof typeof AppPage;
};
const appPageContext = createContext<AppPageContext>(missingContextValue as unknown as AppPageContext);

export default function AppPageProvider({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const [appPage, setAppPage] = useState<keyof typeof AppPage>(getAppPageFromPath(pathName));
  const router = useRouter();

  useEffect(() => {
    router.push(appPages[appPage].path || '/path-select');
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
