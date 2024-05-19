import {
  Box,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Hole } from '@prisma/client';
import { useFormik } from 'formik';
import { ChangeEvent } from 'react';
import {
  number,
  object,
} from 'yup';

import { FormikField } from '@/utils/types';

export const holeSchema = object({
  holeNumber: number().required(),
  handicap: number().required(),
  par: number().required(),
});

type HoleField = keyof typeof holeSchema.fields;

export type FormHole = { holeNumber: Hole['holeNumber']; par?: Hole['par']; handicap?: Hole['handicap'] };

type Props = {
  isEditing: boolean;
  handleChange: (hole: FormHole) => void;
} & FormHole;

export default function CourseHoleRow({
  isEditing, handleChange, holeNumber, par, handicap,
}: Props) {
  const formik = useFormik({
    initialValues: {
      holeNumber,
      par,
      handicap,
    },
    validationSchema: holeSchema,
    onSubmit: () => undefined,
  });

  formik.handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(e.target.id, e.target.value);
    handleChange(formik.values);
  };

  const holeFields: FormikField<HoleField>[] = [
    { id: 'holeNumber', label: 'Hole #' },
    { id: 'handicap', label: 'Handicap' },
    { id: 'par', label: 'Par' },
  ];

  return (
    <Box sx={{ display: 'flex', columnGap: 1 }}>
      {holeFields.map(({ id, label }) => (
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
                type="number"
                disabled={id === 'holeNumber'}
                variant="outlined"
                size="small"
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
          ) : <Typography key={id}>{formik.values[id]}</Typography>
      ))}
    </Box>
  );
}
