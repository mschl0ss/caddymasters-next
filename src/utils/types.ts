import { string } from 'yup';

export interface Hole {
  holeNumber: number;
  handicap: number;
}
/*
import { Prisma } from '@prisma/client'

// Build 'select' object
const userEmail: Prisma.UserSelect = {
  email: true,
}
 */

export type FormikField<T> = { id: T; label: string };
