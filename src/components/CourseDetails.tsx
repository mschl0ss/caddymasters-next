/*
name

sloping rating coursePar

 holes
 */

import {
  Box,
  styled,
  TextField,
  TextFieldProps,
  Tooltip,
  Typography,
} from '@mui/material';
import { Course } from '@prisma/client';
import { useFormik } from 'formik';
import { HTML } from 'mdast';
import { arrayOf } from 'prop-types';
import {
  ChangeEvent,
  ChangeEventHandler,
  useState,
} from 'react';
import {
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
  padding: 20,
  '& :first-child': {
    gridColumnStart: 1,
    gridColumnEnd: 4,
  },
});

const validationSchema = object({
  name: string().required(),
  slope: number().required(),
  rating: number().required(),
  coursePar: number().required(),
});

interface Props {
  courseId?: Course['id'];
  openAsForm?: boolean;
}

export default function CourseDetails({ courseId, openAsForm = true }: Props) {
  const [isEditing, setIsEditing] = useState(true);
  const formik = useFormik({
    initialValues: {
      name: '',
      slope: '',
      rating: '',
      coursePar: '',
    },
    validationSchema,
    onSubmit: () => console.log('submitted'),
  });

  const shouldFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field = validationSchema.fields[e.target.id as keyof typeof validationSchema.fields];
    console.log(NumberRegex.test(e.target.value));
    if (!field) {
      console.error('[CourseDetails::handleChange] This should not have happened');
      return false;
    }
    if (field.describe().type === 'number') {
      return NumberRegex.test(e.target.value) ? formik.handleChange(e) : false;
    }
    return true;
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (shouldFieldChange(e)) { formik.handleChange(e); }
  };
  /*
  idea - disable holes until initial name/slope/rating/cp are entered and submitted
  from then on, on change of those values (debounced) save
   */
  const infoFields: FormikField<keyof typeof validationSchema.fields>[] = [
    { id: 'name', label: 'Course Name' },
    { id: 'slope', label: 'Slope' },
    { id: 'rating', label: 'Rating' },
    { id: 'coursePar', label: 'Course Par' },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
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
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[id] && Boolean(formik.errors[id])}
                />
              </Tooltip>
            )
            //   TODO - fetch course by id
            : <Typography key={id}>{formik.values[id]}</Typography>))}
      </CourseInfoWrapper>
    </form>
  );
}
