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

export const config = {
  api: {
    bodyParser: '',
  },
};

type ResponseData = {
  users: User[];
};
const getUsers = async (): Promise<User[]> => prisma.user.findMany();

const addUser = async (user: UserCreateArgs['data']) => {
  const createUser = {
    ...user,
    handicap: Number(user.handicap),
  };
  return prisma.user.create({ data: { ...createUser } });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | { message: string }>,
) {
  if (req.method === 'GET') {
    const users = await getUsers();
    return res.status(200).json({ users });
  }
  if (req.method === 'POST') {
    try {
      await addUser(req.body);
      return res.status(200).send({ message: 'User created' });
    } catch (e) {
      // @ts-expect-error because
      let { message } = e;
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        message = e.message;
      }
      return res.status(400).json({ message });
    }
  } else {
    // Handle any other HTTP method
    return res.status(419).send({ message: 'unsupported HTTP method' });
  }
}
