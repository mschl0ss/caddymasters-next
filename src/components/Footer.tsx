'use client';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import {
  Box,
  IconButton,
  styled,
} from '@mui/material';
import {AppPage, useAppPageContext} from "@/contexts/AppPageContext";

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

  const handleArrowClick = (direction: ArrowDirection) => {
    const newPage = direction === 'left' ? appPage - 1 : appPage + 1;
    setAppPage(newPage);
  };

  const renderContent = (direction: ArrowDirection) => {
    let icon;
    let Wrapper;
    if (direction === 'left') {
      if (appPage === AppPage.PATH_SELECT) {
        return null;
      }
      Wrapper = StyledLeft;
      icon = <ArrowLeft />;
    } else {
      if (appPage === AppPage.HOLE_INFO) {
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
