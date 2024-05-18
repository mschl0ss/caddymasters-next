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

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export type Stripped<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

const getUsers = () => axios.get<{ users: User[] }>('http://localhost:3000/api/users')
  .then(({ data: { users } }) => users);

export const useGetUsersQuery = () => useQuery({ queryKey: [QueryKey.USERS], queryFn: getUsers });

export type CreateUserBody = Stripped<User>;
const createUser = async (user: CreateUserBody): Promise<void> => axios
  .post(
    'http://localhost:3000/api/users',
    user,
    { headers },
  );

export const useCreateUserMutation = (options?: UseMutationOptions<void, DefaultError, CreateUserBody>) => useMutation({
  ...options,
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [QueryKey.USERS] });
  },
});
