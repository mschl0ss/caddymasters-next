// TODO add to theme
import { SxProps } from '@mui/material';
import {
  CSSProperties,
  useMemo,
} from 'react';

import { FormHole } from '@/utils/types';

export const WRAPPER_WIDTH = 450;
export const WRAPPER_HEIGHT = 932;

export const NumberRegex = /^[0-9]*$/;

export const NumberInputNoArrows = {
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    display: 'none',
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
};

export const useDefaultHoles = (): FormHole[] => useMemo(() => Array.from(
  { length: 18 },
  (v, i) => ({
    holeNumber: i + 1,
  } as FormHole),
), []);
