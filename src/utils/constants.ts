// TODO add to theme
import { SxProps } from '@mui/material';

export const WRAPPER_WIDTH = 450;
export const WRAPPER_HEIGHT = 932;

export const NumberRegex = /^[0-9]*$/;

export const NumberInputNoArrows: SxProps = {
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    display: 'none',
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
};
