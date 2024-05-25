import {
  Course,
  Hole,
} from '@prisma/client';
import { string } from 'yup';

/*
import { Prisma } from '@prisma/client'

// Build 'select' object
const userEmail: Prisma.UserSelect = {
  email: true,
}
 */

export type FormField<T> = { id: T; label: string };
