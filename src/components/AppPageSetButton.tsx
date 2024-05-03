import { Button } from '@mui/material';
import { Course } from '@prisma/client';

import {
  AppPage,
  useAppPageContext,
} from '@/contexts/AppPageContext';

export default function AppPageSetButton({ label, appPage }: { label: Course['name']; appPage: AppPage }) {
  const { setAppPage } = useAppPageContext();

  const handleButtonClick = () => {
    setAppPage(AppPage.RULESET_SELECT);
  };
  return (
    <Button
      onClick={() => handleButtonClick()}
      aria-label={label}
      variant="contained"
      size="large"
    >
      {label}
    </Button>
  );
}
