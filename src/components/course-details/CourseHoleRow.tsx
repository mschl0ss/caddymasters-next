import {
  Box,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent } from 'react';

import {
  FormHole,
  FormHoleField,
  FormHoleValue,
} from '@/components/course-details/CourseFormReducer';
import {
  FormField,
} from '@/utils/types';

type Props = {
  isEditing: boolean;
  handleChange: (holeNumber: number, field: FormHoleField, newValue: FormHoleValue) => void;
} & FormHole;

export default function CourseHoleRow(props: Props) {
  const { isEditing, handleChange, holeNumber } = props;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!Number.isNaN(Number(e.target.value))) {
      handleChange(holeNumber, e.target.id as FormHoleField, Number(e.target.value));
    }
  };

  const holeFields: FormField<FormHoleField>[] = [
    { id: 'holeNumber', label: 'Hole #' },
    { id: 'handicap', label: 'Handicap' },
    { id: 'par', label: 'Par' },
  ];

  return (
    <Box sx={{ display: 'flex', columnGap: 1 }}>
      {holeFields.map(({ id, label }) => (
        isEditing
          ? (
            <TextField
              key={id}
              type="number"
              disabled={id === 'holeNumber'}
              variant="outlined"
              size="small"
              fullWidth
              id={id}
              name={id}
              label={label}
              aria-label={label}
              value={props[id] || ''}
              onChange={onChange}
              onBlur={() => undefined}
              error={false}
            />
          ) : <Typography key={id}>{props[id]}</Typography>
      ))}
    </Box>
  );
}
