import {
  Button,
  CircularProgress,
} from '@mui/material';
import {
  useCallback,
  useState,
} from 'react';

import CmDialog from '@/components/CmDialog';
import CreateUserForm from '@/components/CreateUserForm';
import GameSetupLayout from '@/components/layouts/GameSetupLayout';
import { ButtonListItem } from '@/components/styledComponents';
import { useGetUsersQuery } from '@/utils/clientApi';

export default function UserSelect() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: users = [], isLoading } = useGetUsersQuery();

  const handleButtonClick = useCallback((userId: string) => {
    // console.log(`${ruleset} selected`);
    // setAppPage(AppPage.USER_SELECT);
  }, []);

  return (
    <GameSetupLayout>
      {isLoading ? <CircularProgress /> : users.map((user) => (
        <ButtonListItem key={user.id}>
          <Button
            onClick={() => handleButtonClick(user.id)}
            aria-label={`${user.firstName} ${user.lastName}`}
            variant="contained"
            size="large"
          >
            {`${user.firstName} ${user.lastName}`}
          </Button>
        </ButtonListItem>
      ))}
      <ButtonListItem>
        <Button
          onClick={() => setIsDialogOpen(true)}
          aria-label="New Course"
          variant="outlined"
          size="large"
        >
          + New User
        </Button>
      </ButtonListItem>
      <CmDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Add New Golfer">
        <CreateUserForm onSettledCb={() => setIsDialogOpen(false)} />
      </CmDialog>
    </GameSetupLayout>
  );
}
