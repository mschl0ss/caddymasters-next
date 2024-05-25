import {
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent } from 'react';

import {
  FormCourseInfo,
  FormCourseInfoField,
  FormCourseInfoValue,
} from '@/components/course-details/CourseFormReducer';
import { FormField } from '@/utils/types';

type Props = {
  isEditing: boolean;
  handleChange: (field: FormCourseInfoField, newValue: FormCourseInfoValue) => void;
} & FormCourseInfo;

export default function CourseInfo(props: Props) {
  const { isEditing, handleChange } = props;
  const infoFields: FormField<FormCourseInfoField>[] = [
    { id: 'name', label: 'Course Name' },
    { id: 'slope', label: 'Slope' },
    { id: 'rating', label: 'Rating' },
    { id: 'coursePar', label: 'Course Par' },
  ];

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.id as FormCourseInfoField, e.target.value);
  };

  return (
    <>
      {infoFields.map(({ id, label }) => (
        isEditing
          ? (
            <TextField
              key={id}
              type={id === 'name' ? 'text' : 'number'}
              variant="outlined"
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
          )
          : <Typography key={id}>{props[id] || ''}</Typography>))}
    </>
  );
}
