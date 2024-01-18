/** @type {import('tailwindcss').Config} */
export const content = [
  './components/**/*.{js,vue,ts}',
  './layouts/**/*.vue',
  './pages/**/*.vue',
  './*.vue',
  './plugins/**/*.{js,ts}',
  './nuxt.config.{js,ts}'
]
export const theme = {
  fontFamily: {
    main: ['"Montserrat", Arial, Helvetica, sans-serif'],
    headerThin: ['"Poppins-Thin", Arial, Helvetica, sans-serif'],
    headerRegular: ['"Poppins-Regular", Arial, Helvetica, sans-serif'],
    headerBold: ['"Poppins-Bold", Arial, Helvetica, sans-serif']
  },
  extend: {
    screens: {
      sm: '600px',
      md: '960px',
      lg: '1200px',
      xl: '1440px',
      '2xl': '1600px'
    },
    colors: {
      text: '#ffffff',
      background: '#300F7B',
      primary: '#3700B3',
      secondary: '#03d8c3',
      accent: '#895dee'
    },
    backgroundColor: {
      text: '#ffffff',
      background: '#300F7B',
      primary: '#3700B3',
      secondary: '#03d8c3',
      accent: '#895dee',
      overlay: '#000000bf'
    },
    borderColor: {
      text: '#ffffff',
      background: '#300F7B',
      primary: '#3700B3',
      secondary: '#03d8c3',
      accent: '#895dee'
    },
    boxShadow: {
      main: '1px 1px 4px 0px rgba(0, 0, 0, 0.3)',
      light: '0 6px 6px rgba(0,0,0,.04)'
    },
    padding: {
      '1/12': '8.333333333333333%',
      '2/12': '16.666666666666666%',
      '3/12': '25%',
      '4/12': '33.33333333333333%',
      '5/12': '41.66666666666667%',
      '6/12': '50%',
      '7/12': '58.33333333333334%',
      '8/12': '66.66666666666666%',
      '9/12': '75%',
      '10/12': '83.33333333333334%',
      '11/12': '91.66666666666666%'
    },
    margin: {
      '1/12': '8.333333333333333%',
      '2/12': '16.666666666666666%',
      '3/12': '25%',
      '4/12': '33.33333333333333%',
      '5/12': '41.66666666666667%',
      '6/12': '50%',
      '7/12': '58.33333333333334%',
      '8/12': '66.66666666666666%',
      '9/12': '75%',
      '10/12': '83.33333333333334%',
      '11/12': '91.66666666666666%'
    },
    width: {
      '1/12': '8.333333333333333%',
      '2/12': '16.666666666666666%',
      '3/12': '25%',
      '4/12': '33.33333333333333%',
      '5/12': '41.66666666666667%',
      '6/12': '50%',
      '7/12': '58.33333333333334%',
      '8/12': '66.66666666666666%',
      '9/12': '75%',
      '10/12': '83.33333333333334%',
      '11/12': '91.66666666666666%'
    },
    maxWidth: {
      '1/12': '8.333333333333333%',
      '2/12': '16.666666666666666%',
      '3/12': '25%',
      '4/12': '33.33333333333333%',
      '5/12': '41.66666666666667%',
      '6/12': '50%',
      '7/12': '58.33333333333334%',
      '8/12': '66.66666666666666%',
      '9/12': '75%',
      '10/12': '83.33333333333334%',
      '11/12': '91.66666666666666%'
    }
  }
}
export const plugins = []
