import {
  Box,
  styled,
} from '@mui/material';

import AppBar from '@/components/AppBar';
import Footer from '@/components/Footer';
import {
  AppPage,
  useAppPageContext,
} from '@/contexts/AppPageContext';

const DebugConsole = styled(Box)({
  position: 'absolute',
  left: 0,
  top: 0,
  border: 'dashed 1px black',
  width: 200,
  height: '100vh',
});

const Wrapper = styled(Box)({
  width: 450,
  margin: '0 auto',
  border: 'dashed 1px black',
  minHeight: 750,
  height: '932px',
  borderRadius: 25,
  background: 'white',
  zIndex: '100',
});

export default function UxWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  const { appPage } = useAppPageContext();

  const currentPage = Object.keys(AppPage)[Object.values(AppPage)
    .indexOf(appPage)];

  return (
    <>
      <DebugConsole>
        ux wrapper
        current page:
        {' '}
        {currentPage}
        <Footer />
      </DebugConsole>
      <Wrapper>
        <AppBar />
        {children}
      </Wrapper>
    </>
  );
}
