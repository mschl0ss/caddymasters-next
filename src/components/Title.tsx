import {
  styled,
  Typography,
} from '@mui/material';

import {
  appPages,
  useAppPageContext,
} from '@/contexts/AppPageContext';

export const PageTitle = styled(Typography)({});

export default function Title() {
  const { appPage } = useAppPageContext();

  return (
    <PageTitle>
      {appPages[appPage]?.label}
    </PageTitle>
  );
}
