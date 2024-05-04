import {
  Prisma,
  User,
} from '@prisma/client';
import type {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/prisma';
import UserCreateArgs = Prisma.UserCreateArgs;

type ResponseData = {
  users: User[];
};

const getUsers = async (): Promise<User[]> => prisma.user.findMany();

const addUser = async (user: UserCreateArgs['data']) => prisma.user.create({ data: user });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | { message: string }>,
) {
  if (req.method === 'GET') {
    const users = await getUsers();
    res.status(200).json({ users });
  } else if (req.method === 'POST') {
    try {
      await addUser(req.body);
      res.status(200);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({ message: e.message });
      }
      res.status(400);
    }
  } else {
    // Handle any other HTTP method
    res.status(419);
  }
}
