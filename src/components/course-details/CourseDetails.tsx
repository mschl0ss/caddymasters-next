import {
  Box,
  Button,
  styled,
} from '@mui/material';
import { Course } from '@prisma/client';
import { useFormik } from 'formik';
import {
  useMemo,
  useState,
} from 'react';
import {
  array,
  object,
} from 'yup';

import CourseHoleRow, {
  FormHole,
  holeSchema,
} from '@/components/course-details/CourseHoleRow';
import CourseInfo, {
  courseInfoSchema,
  FormCourseInfo,
} from '@/components/course-details/CourseInfo';
import { NumberInputNoArrows } from '@/utils/constants';

const wrapperPadding = 20;

const Wrapper = styled(Box)({
  position: 'relative',
  height: '100%',
  boxSizing: 'borderBox',
});

const CourseInfoWrapper = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
  rowGap: 10,
  columnGap: 5,
  padding: `${wrapperPadding}px ${wrapperPadding}px 10px`,
  marginBottom: 10,
  '& :first-child': {
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
});

const validationSchema = object({
  courseInfo: courseInfoSchema,
  holes: array().of(holeSchema).length(18).ensure(),
});

interface Props {
  courseId?: Course['id'];
  openAsForm?: boolean;
  onClose: () => void;
}

export default function CourseDetails({ courseId, onClose, openAsForm = true }: Props) {
  const [isEditing, setIsEditing] = useState(openAsForm);
  const defaultHoles: FormHole[] = useMemo(() => Array.from(
    { length: 18 },
    (v, i) => ({
      holeNumber: i + 1,
    } as FormHole),
  ), []);

  const buttonText = useMemo(() => {
    if (isEditing) {
      return courseId ? 'Save Changes' : 'Save New Course';
    }
    return 'Edit';
  }, [courseId, isEditing]);
  // TODO fetch these
  const fetchedCourse: Partial<Course> = { id: courseId };
  const fetchedHoles = undefined as unknown as FormHole[];

  const formik = useFormik({
    initialValues: {
      courseInfo: fetchedCourse,
      holes: fetchedHoles || defaultHoles,
    },
    validationSchema,
    onSubmit: () => console.log('submitted'),
  });

  const handleCourseInfoChange = (courseInfo: FormCourseInfo) => {
    formik.values.courseInfo = courseInfo;
  };

  const handleHoleChange = (hole: FormHole) => {
    formik.values.holes[hole.holeNumber - 1] = hole;
  };

  return (
    <Wrapper>
      <Button onClick={onClose}>Close</Button>
      <form
        style={{ height: `calc(100% - ${wrapperPadding * 2}px)`, overflow: 'scroll' }}
        onSubmit={formik.handleSubmit}
      >
        <CourseInfoWrapper>
          <CourseInfo
            handleChange={handleCourseInfoChange}
            isEditing={isEditing}
            {...formik.values.courseInfo}
          />
        </CourseInfoWrapper>
        <Divider />
        <HolesWrapper>
          {formik.values.holes.map(({ holeNumber, par, handicap }) => (
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
