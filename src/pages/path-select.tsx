import { Button } from '@mui/material';

import GameSetupLayout from '@/components/layouts/GameSetupLayout';
import { ButtonListItem } from '@/components/styledComponents';
import {
  AppPage,
  useAppPageContext,
} from '@/contexts/AppPageContext';

export default function PathSelect() {
  const { setAppPage } = useAppPageContext();

  // TODO add redux+session to track page
  const handleButtonClick = (appPage: AppPage) => setAppPage(appPage);

  return (
    <GameSetupLayout>
      <ButtonListItem>
        <Button
          onClick={() => handleButtonClick(AppPage.COURSE_SELECT)}
          aria-label="Start New Round"
          variant="contained"
          size="large"
        >
          Start New Round
        </Button>
      </ButtonListItem>
      <ButtonListItem>
        <Button
          size="large"
          onClick={() => handleButtonClick(AppPage.HOLE_INFO)}
          aria-label="Join Round"
          variant="contained"
        >
          Join Round
        </Button>
      </ButtonListItem>
    </GameSetupLayout>
  );
}
