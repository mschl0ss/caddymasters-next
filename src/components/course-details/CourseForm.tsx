import {
  Box,
  Button,
  styled,
} from '@mui/material';
import { Course } from '@prisma/client';
import React, {
  FormEvent,
  useMemo,
  useReducer,
  useState,
} from 'react';

import {
  courseFormReducer,
  CourseFormState,
  FormCourseInfo,
  FormCourseInfoField,
  FormCourseInfoValue,
  FormHole,
  FormHoleField,
  FormHoleValue,
} from '@/components/course-details/CourseFormReducer';
import CourseHoleRow from '@/components/course-details/CourseHoleRow';
import CourseInfo from '@/components/course-details/CourseInfo';
import {
  NumberInputNoArrows,
  useDefaultHoles,
} from '@/utils/constants';

const wrapperPadding = 20;

const Wrapper = styled(Box)({
  position: 'relative',
  height: '100%',
  boxSizing: 'border-box',
});

const CourseInfoWrapper = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
  rowGap: 10,
  columnGap: 5,
  padding: `${wrapperPadding}px ${wrapperPadding}px 10px`,
  marginBottom: 10,
  '& :first-of-type': {
    gridColumnStart: 1,
    gridColumnEnd: 4,
  },
  ...NumberInputNoArrows,
});

const Divider = styled(Box)(({ theme }) => ({
  borderBottom: `dashed 1px ${theme.palette.primary.light}`,
}));

const HolesWrapper = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr',
  rowGap: 15,
  gridTemplateRows: 'repeat(18, 1fr)',
  maxHeight: '75%',
  overflow: 'scroll',
  padding: wrapperPadding,
  ...NumberInputNoArrows,
});

const ButtonWrapper = styled(Box)({
  position: 'absolute',
  padding: '20px 0',
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  background: 'white',
  zIndex: 10,
  boxShadow: '0 -4px 8px 0 rgb(0 0 0 / 14%)',
  borderRadius: 5,
});

interface Props {
  courseId?: Course['id'];
  openAsForm?: boolean;
  onClose: () => void;
}

export default function CourseForm({ courseId, onClose, openAsForm = true }: Props) {
  const [isEditing, setIsEditing] = useState(openAsForm);

  const buttonText = useMemo(() => {
    if (isEditing) {
      return courseId ? 'Save Changes' : 'Save New Course';
    }
    return 'Edit';
  }, [courseId, isEditing]);
  // TODO fetch these
  const fetchedCourse = undefined as unknown as FormCourseInfo;
  const fetchedHoles = undefined as unknown as FormHole[];

  const initialState: CourseFormState = {
    holes: useDefaultHoles(),
  };

  const [state, dispatch] = useReducer(courseFormReducer, initialState);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted ', state);
  };

  const handleCourseInfoChange = (field: FormCourseInfoField, newValue: FormCourseInfoValue) => {
    dispatch({ type: field, payload: newValue });
  };

  const handleHoleChange = (holeNumber: number, field: FormHoleField, newValue: FormHoleValue) => {
    dispatch({
      type: 'hole',
      payload: { ...state.holes[holeNumber - 1], ...{ [field]: newValue as number } },
    });
  };

  return (
    <Wrapper>
      <Button onClick={onClose}>Close</Button>
      <form
        style={{ height: `calc(100% - ${wrapperPadding * 2}px)`, overflow: 'scroll' }}
        onSubmit={onSubmit}
      >
        <CourseInfoWrapper>
          <CourseInfo
            handleChange={handleCourseInfoChange}
            isEditing={isEditing}
            name={state.name}
            slope={state.slope}
            coursePar={state.coursePar}
            rating={state.rating}
          />
        </CourseInfoWrapper>
        <Divider />
        <HolesWrapper>
          {state.holes.map(({ holeNumber, par, handicap }) => (
            <CourseHoleRow isEditing={isEditing} key={holeNumber} holeNumber={holeNumber} handleChange={handleHoleChange} par={par} handicap={handicap} />
          ))}
        </HolesWrapper>
        <ButtonWrapper>
          <Button
            type="submit"
            aria-label="Submit"
            variant="contained"
            size="large"
          >
            {buttonText}
          </Button>
        </ButtonWrapper>
      </form>
    </Wrapper>
  );
}
