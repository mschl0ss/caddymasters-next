import {
  Course,
  Hole,
} from '@prisma/client';

export type FormCourseInfo = { name?: Course['name']; slope?: Course['slope']; rating?: Course['rating']; coursePar?: Course['coursePar'] };
export type FormCourseInfoField = keyof FormCourseInfo;
export type FormCourseInfoValue = FormCourseInfo[keyof FormCourseInfo];
export type FormHole = { holeNumber: Hole['holeNumber']; par?: Hole['par']; handicap?: Hole['handicap'] };
export type FormHoleField = keyof FormHole;
export type FormHoleValue = FormHole[keyof FormHole];

type CourseInfoAction = { type: FormCourseInfoField; payload: FormCourseInfoValue };
type HoleAction = { type: 'hole'; payload: FormHole };

export type CourseFormState = FormCourseInfo & {
  holes: FormHole[];
};

export function courseFormReducer(state: CourseFormState, action: CourseInfoAction | HoleAction) {
  const newState = { ...state };
  switch (action.type) {
    case 'name':
    case 'coursePar':
    case 'rating':
    case 'slope':
      (newState[action.type] as string | number | undefined) = action.payload;
      return newState;
    case 'hole':
      newState.holes[action.payload.holeNumber - 1] = action.payload;
      return newState;
    default:
      return state;
  }
}
