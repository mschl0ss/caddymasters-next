import { Course } from '@prisma/client';
import type {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/prisma';

type ResponseData = {
  courses: Course[];
};

const getCourses = async (): Promise<Course[]> => {
  const courses = await prisma.course.findMany();
  return courses;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method === 'GET') {
    const courses = await getCourses();
    res.status(200).json({ courses });
  } else {
    // Handle any other HTTP method
    res.status(419);
  }
}
