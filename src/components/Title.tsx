'use client';

import {
  styled,
  Typography,
} from '@mui/material';

import {
  appPageLabel,
  useAppPageContext,
} from '@/contexts/AppPageContext';

export const PageTitle = styled(Typography)({});

export default function Title() {
  const { appPage } = useAppPageContext();

  return (
    <PageTitle>
      {appPageLabel[appPage]}
    </PageTitle>
  );
}
