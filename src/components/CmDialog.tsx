import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  SxProps,
} from '@mui/material';

import { WRAPPER_WIDTH } from '@/utils/constants';

type CmDialogProps = {
  title?: string;
} & DialogProps;

export default function CmDialog({ title, children, ...props }: CmDialogProps) {
  const style: SxProps = {
    width: WRAPPER_WIDTH,
    margin: '0 auto',
    '& .MuiDialog-paper': {
      width: '100%',
    },
  };
  return (
    <Dialog {...props} sx={style}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
