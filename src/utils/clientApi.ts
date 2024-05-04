import { User } from '@prisma/client';
import type { DefaultError } from '@tanstack/query-core';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';
import axios from 'axios';

import { queryClient } from '@/components/layouts/RootLayout';

enum QueryKey {
  USERS = 'users',
}

const getUsers = () => axios.get<{ users: User[] }>('http://localhost:3000/api/users')
  .then(({ data: { users } }) => users);

export const useGetUsersQuery = () => useQuery({ queryKey: [QueryKey.USERS], queryFn: getUsers });

const addUser = async (user: User): Promise<void> => axios
  .post('http://localhost:3000/api/users', { user });

export const useAddUserMutation = (options: UseMutationOptions<void, DefaultError, User>) => useMutation({
  ...options,
  mutationFn: addUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [QueryKey.USERS] });
  },
});
