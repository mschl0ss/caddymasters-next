'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import {Theme} from "@mui/material";

// const roboto = Roboto({
//     weight: ['300', '400', '500', '700'],
//     subsets: ['latin'],
//     display: 'swap',
// });
//
// const theme = createTheme({
//     typography: {
//         fontFamily: roboto.style.fontFamily,
//     },
// });

const primary = {
    main: '#4C9A2A',
    light: '#76BA1B',
    dark: '#1E5631',
    contrastText: '#fff',
};

const theme: Theme = createTheme({
    palette: {
        primary,
    },
});

export default theme;
