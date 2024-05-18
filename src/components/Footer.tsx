import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import {
  Box,
  IconButton,
  styled,
} from '@mui/material';
import { useMemo } from 'react';

import {
  AppPage,
  useAppPageContext,
} from '@/contexts/AppPageContext';

const StyledFooterWrapper = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
});

const StyledLeft = styled(Box)({
  gridColumn: 1,
  display: 'flex',
  justifyContent: 'flex-start',
});

const StyledRight = styled(Box)({
  gridColumn: 3,
  display: 'flex',
  justifyContent: 'flex-end',
});

type ArrowDirection = 'left' | 'right';

export default function Footer() {
  const {
    appPage,
    setAppPage,
  } = useAppPageContext();

  const currentPageIndex = useMemo(() => Object.values(AppPage).findIndex((el) => el === appPage), [appPage]);

  const handleArrowClick = (direction: ArrowDirection) => {
    const newPage = direction === 'left' ? Object.values(AppPage)[currentPageIndex - 1] : Object.values(AppPage)[currentPageIndex + 1];
    setAppPage(newPage);
  };

  const renderContent = (direction: ArrowDirection) => {
    let icon;
    let Wrapper;
    if (direction === 'left') {
      if (currentPageIndex === 0) {
        return null;
      }
      Wrapper = StyledLeft;
      icon = <ArrowLeft />;
    } else {
      // minus 2 because there's an UNKNOWN app page
      if (currentPageIndex >= Object.values(AppPage).length - 2) {
        return null;
      }
      Wrapper = StyledRight;
      icon = <ArrowRight />;
    }

    return (
      <Wrapper>
        <IconButton onClick={() => handleArrowClick(direction)}>
          {icon}
        </IconButton>
      </Wrapper>
    );
  };

  return (
    <StyledFooterWrapper>
      {renderContent('left')}
      <div />
      {renderContent('right')}
    </StyledFooterWrapper>
  );
}
