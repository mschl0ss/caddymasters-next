import { Button } from '@mui/material';
import {
  Course,
  User,
} from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import CmDialog from '@/components/CmDialog';
import CreateUserForm from '@/components/CreateUserForm';
import GameSetupLayout from '@/components/layouts/GameSetupLayout';
import { ButtonListItem } from '@/components/styledComponents';
import {
  AppPage,
  useAppPageContext,
} from '@/contexts/AppPageContext';

export default function UserSelect() {
  const { setAppPage } = useAppPageContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleButtonClick = useCallback((userId: string) => {
    // console.log(`${ruleset} selected`);
    // setAppPage(AppPage.USER_SELECT);
  }, []);

  useLayoutEffect(() => {
    async function fetcher() {
      setIsLoading(true);
      const { data: { users: userData } }: AxiosResponse<{ users: User[] }> = await axios.get('http://localhost:3000/api/courses');
      setUsers(userData);
      setIsLoading(false);
    }
    fetcher();
  }, []);

  return (
    <GameSetupLayout>
      {users.map((user) => (
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
          + New Course
        </Button>
      </ButtonListItem>
      <CmDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Add New Golfer">
        <CreateUserForm />
      </CmDialog>
    </GameSetupLayout>
  );
}
