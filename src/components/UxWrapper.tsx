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
import {
  WRAPPER_HEIGHT,
  WRAPPER_WIDTH,
} from '@/utils/constants';

const DebugConsole = styled(Box)({
  position: 'absolute',
  left: 0,
  top: 0,
  border: 'dashed 1px black',
  width: 200,
  height: '100vh',
});

const Wrapper = styled(Box)({
  width: WRAPPER_WIDTH,
  margin: '0 auto',
  border: 'dashed 1px black',
  minHeight: 750,
  height: WRAPPER_HEIGHT,
  borderRadius: 25,
  background: 'white',
  zIndex: '100',
  position: 'relative',
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
