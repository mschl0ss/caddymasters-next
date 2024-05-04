import {
  Box,
  List,
  ListItem,
  styled,
  SwipeableDrawer,
} from '@mui/material';

import { WRAPPER_WIDTH } from '@/utils/constants';

export const ButtonList = styled(List)({
  width: '80%',
  listStyleType: 'none',
  display: 'flex',
  flexDirection: 'column',
  padding: '0',
  height: '80%',
  overflow: 'scroll',
});

export const PageWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '15%',
  rowGap: '24px',
  height: '100%',
});

export const ButtonListItem = styled(ListItem)({
  width: '100%',
  '& .MuiButton-root': {
    width: '100%',
    padding: '1.5em',
    borderRadius: 20,
  },
});
