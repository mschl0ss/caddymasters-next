/*
name

sloping rating coursePar

 holes
 */

import {
  Box,
  styled,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Course,
  Hole,
} from '@prisma/client';
import { useFormik } from 'formik';
import {
  ChangeEvent,
  useMemo,
  useState,
} from 'react';
import {
  array,
  number,
  object,
  string,
} from 'yup';

import { NumberRegex } from '@/utils/constants';
import { FormikField } from '@/utils/types';

const CourseInfoWrapper = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
  rowGap: 10,
  columnGap: 5,
  paddingBottom: 10,
  marginBottom: 10,
  '& :first-child': {
    gridColumnStart: 1,
    gridColumnEnd: 4,
  },
});

const Divider = styled(Box)(({ theme }) => ({
  borderBottom: `dashed 1px ${theme.palette.primary.light}`,
}));

const HolesWrapper = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr',
  rowGap: 15,
  gridTemplateRows: 'repeat(18, 1fr)',
  maxHeight: '70%',
  overflow: 'scroll',
  paddingTop: 20,
});

type CourseInfoField = Exclude<keyof typeof validationSchema.fields, 'holes'>;
type HoleField = keyof typeof holeSchema.fields;
type FormHole = { holeNumber: string } & Partial<Hole>;

const holeSchema = object({
  holeNumber: number().required(),
  handicap: number().required(),
  par: number().required(),
});

const validationSchema = object({
  name: string().required('Course Name is required'),
  slope: number().required('Slope is required'),
  rating: number().required('Rating is required'),
  coursePar: number().required('Par is required'),
  holes: array().of(holeSchema).length(18).ensure(),
});

interface Props {
  courseId?: Course['id'];
  openAsForm?: boolean;
}

export default function CourseDetails({ courseId, openAsForm = true }: Props) {
  const [isEditing, setIsEditing] = useState(openAsForm);
  const defaultHoles: FormHole[] = useMemo(() => Array.from(
    { length: 18 },
    (v, i) => ({
      holeNumber: i + 1,
    } as FormHole),
  ), []);

  const fetchedCourse: Partial<Course> = { id: courseId };
  const fetchedHoles = undefined as unknown as FormHole[];
  const formik = useFormik({
    initialValues: {
      name: fetchedCourse.name || '',
      slope: fetchedCourse.slope || '',
      rating: fetchedCourse.rating || '',
      coursePar: fetchedCourse.coursePar || '',
      holes: fetchedHoles || defaultHoles,
    },
    validationSchema,
    onSubmit: () => console.log('submitted'),
  });

  const shouldFieldChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    if (!key) { return false; }
    const field = validationSchema.fields[e.target.id as keyof typeof validationSchema.fields];
    if (!field) {
      console.error('[CourseDetails::handleChange] This should not have happened');
      return false;
    }
    if (field.describe().type === 'number') {
      return NumberRegex.test(e.target.value);
    }
    return true;
  };

  // TODO add handling for hole change
  formik.handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name || e.target.id;
    if (shouldFieldChange(e, key)) {
      formik.values[key as CourseInfoField] = e.target.value;
    }
  };
  const holeFields: FormikField<HoleField>[] = [
    { id: 'holeNumber', label: 'Hole #' },
    { id: 'handicap', label: 'Handicap' },
    { id: 'par', label: 'Par' },

  ];
  /*
  idea - disable holes until initial name/slope/rating/cp are entered and submitted
  from then on, on change of those values (debounced) save
   */
  const infoFields: FormikField<CourseInfoField>[] = [
    { id: 'name', label: 'Course Name' },
    { id: 'slope', label: 'Slope' },
    { id: 'rating', label: 'Rating' },
    { id: 'coursePar', label: 'Course Par' },
  ];

  const renderHole = (hole: { holeNumber: string } & Partial<Hole>) => {
    const touched = formik.touched.holes && formik.touched.holes[hole.holeNumber - 1];
    const error = formik.errors.holes && formik.errors.holes[hole.holeNumber - 1];
    return (
      <Box sx={{ display: 'flex', columnGap: 1 }}>
        {holeFields.map(({ id, label }) => (
          <Tooltip
            key={hole.holeNumber + id}
            title={(touched && error) as string | undefined}
            disableFocusListener={touched && Boolean(error)}
            disableHoverListener={touched && Boolean(error)}
            disableTouchListener={touched && Boolean(error)}
          >
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              id={id}
              name={id}
              label={label}
              value={formik.values.holes[hole.holeNumber - 1][id]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={touched && Boolean(error)}
            />
          </Tooltip>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ padding: '20px', height: '100%' }}>
      <form onSubmit={formik.handleSubmit} style={{ height: '100%' }}>
        <CourseInfoWrapper>
          {infoFields.map(({ id, label }) => (
            isEditing
              ? (
                <Tooltip
                  key={id}
                  describeChild
                  title={formik.touched[id] && formik.errors[id]}
                  disableFocusListener={!formik.touched[id] && Boolean(formik.errors[id])}
                  disableHoverListener={!formik.touched[id] && Boolean(formik.errors[id])}
                  disableTouchListener={!formik.touched[id] && Boolean(formik.errors[id])}
                >
                  <TextField
                    variant="outlined"
                    fullWidth
                    id={id}
                    name={id}
                    label={label}
                    value={formik.values[id]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched[id] && Boolean(formik.errors[id])}
                  />
                </Tooltip>
              )
              //   TODO - fetch course by id
              : <Typography key={id}>{formik.values[id]}</Typography>))}
        </CourseInfoWrapper>
        <Divider />
        <HolesWrapper>
          {formik.values.holes.map((hole) => (
            <Box key={hole.holeNumber}>
              {renderHole(hole)}
            </Box>
          ))}
        </HolesWrapper>
      </form>
    </Box>
  );
}
