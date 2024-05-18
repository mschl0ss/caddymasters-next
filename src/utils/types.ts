import { string } from 'yup';

/*
import { Prisma } from '@prisma/client'

// Build 'select' object
const userEmail: Prisma.UserSelect = {
  email: true,
}
 */

export type FormikField<T> = { id: T; label: string };
