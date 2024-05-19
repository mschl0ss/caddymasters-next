import {
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Course } from '@prisma/client';
import { useFormik } from 'formik';
import { ChangeEvent } from 'react';
import {
  number,
  object,
  string,
} from 'yup';

import { FormikField } from '@/utils/types';

export const courseInfoSchema = object({
  name: string().required('Course Name is required'),
  slope: number().required('Slope is required'),
  rating: number().required('Rating is required'),
  coursePar: number().required('Par is required'),
});

export type FormCourseInfo = {
  name?: Course['name'];
  slope?: Course['slope'];
  rating?: Course['rating'];
  coursePar?: Course['coursePar'];
};

type CourseInfoField = keyof typeof courseInfoSchema.fields;

type Props = {
  isEditing: boolean;
  handleChange: (courseInfo: FormCourseInfo) => void;
} & FormCourseInfo;

export default function CourseInfo({
  isEditing, handleChange, name, slope, rating, coursePar,
}: Props) {
  const formik = useFormik({
    initialValues: {
      name, slope, rating, coursePar,
    },
    validationSchema: courseInfoSchema,
    onSubmit: () => undefined,
  });

  formik.handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(e.target.id, e.target.value);
    handleChange(formik.values);
  };

  const infoFields: FormikField<CourseInfoField>[] = [
    { id: 'name', label: 'Course Name' },
    { id: 'slope', label: 'Slope' },
    { id: 'rating', label: 'Rating' },
    { id: 'coursePar', label: 'Course Par' },
  ];

  return (
    <>
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
                type={id === 'name' ? 'text' : 'number'}
                variant="outlined"
                fullWidth
                id={id}
                name={id}
                label={label}
                aria-label={label}
                value={formik.values[id] || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[id] && Boolean(formik.errors[id])}
              />
            </Tooltip>
          )
          : <Typography key={id}>{formik.values[id]}</Typography>))}
    </>
  );
}
