import { Button } from '@mui/material';
import {
  useCallback,
  useMemo,
} from 'react';

import GameSetupLayout from '@/components/layouts/GameSetupLayout';
import { ButtonListItem } from '@/components/styledComponents';
import {
  AppPage,
  useAppPageContext,
} from '@/contexts/AppPageContext';

export default function RulesetSelect() {
  const { setAppPage } = useAppPageContext();

  const handleButtonClick = useCallback((ruleset: string) => {
    console.log(`${ruleset} selected`);
    setAppPage(AppPage.USER_SELECT);
  }, [setAppPage]);

  const rulesets: string[] = [...Array(4).keys()].map((i) => `Game ${i}`);

  const buttons = useMemo(() => rulesets.map((ruleset) => (
    <ButtonListItem key={ruleset}>
      <Button
        onClick={() => handleButtonClick(ruleset)}
        aria-label={ruleset}
        variant="contained"
        size="large"
      >
        {ruleset}
      </Button>
    </ButtonListItem>
  )), [handleButtonClick, rulesets]);

  return (<GameSetupLayout>{buttons}</GameSetupLayout>);
}
