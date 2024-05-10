import {
  Box,
  Button,
  FormControl,
  styled,
  TextField,
} from '@mui/material';
import { User } from '@prisma/client';
import { useFormik } from 'formik';
import {
  number,
  object,
  string,
} from 'yup';

import {
  CreateUserBody,
  useCreateUserMutation,
} from '@/utils/clientApi';

const validationSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  handicap: number(),
  email: string().email().required(),
});

const InputWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 16,
  rowGap: 12,
  '& .MuiFormControl-root': {
    width: '100%',
  },
});

interface Props {
  onSettledCb?: () => void;
}

export default function CreateUserForm({ onSettledCb }: Props) {
  const { mutate: addUser } = useCreateUserMutation({ onSettled: onSettledCb });
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      handicap: null,
      email: '',
    },
    validationSchema,
    onSubmit: (values) => addUser(values),
  });

  const textFields: { id: keyof typeof formik.values; label: string }[] = [
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'handicap', label: 'Handicap' },
    { id: 'email', label: 'Email' },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <InputWrapper>
        {textFields.map(({ id, label }) => (
          <TextField
            key={id}
            variant="outlined"
            fullWidth
            id={id}
            name={id}
            label={label}
            value={formik.values[id]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[id] && Boolean(formik.errors[id])}
            helperText={formik.touched[id] && formik.errors[id]}
          />
        ))}
      </InputWrapper>
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
}
