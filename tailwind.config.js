/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: 'rgb(var(--main-default-rgb) / <alpha-value>)',
          darkness: 'rgb(var(--main-darkness-rgb) / <alpha-value>)',
          dark: 'rgb(var(--main-dark-rgb) / <alpha-value>)',
          light: 'rgb(var(--main-light-rgb) / <alpha-value>)',
          neutral: 'rgb(var(--main-neutral-rgb) / <alpha-value>)',
          lighter: 'rgb(var(--main-lighter-rgb) / <alpha-value>)',
        },
        blue: {
          DEFAULT: 'rgb(var(--blue-default-rgb) / <alpha-value>)',
          darkness: 'rgb(var(--blue-darkness-rgb) / <alpha-value>)',
          dark: 'rgb(var(--blue-dark-rgb) / <alpha-value>)',
          light: 'rgb(var(--blue-light-rgb) / <alpha-value>)',
          neutral: 'rgb(var(--blue-neutral-rgb) / <alpha-value>)',
          lighter: 'rgb(var(--blue-lighter-rgb) / <alpha-value>)',
        },
        cyan: {
          DEFAULT: 'rgb(var(--cyan-default-rgb) / <alpha-value>)',
          darkness: 'rgb(var(--cyan-darkness-rgb) / <alpha-value>)',
          dark: 'rgb(var(--cyan-dark-rgb) / <alpha-value>)',
          light: 'rgb(var(--cyan-light-rgb) / <alpha-value>)',
          neutral: 'rgb(var(--cyan-neutral-rgb) / <alpha-value>)',
          lighter: 'rgb(var(--cyan-lighter-rgb) / <alpha-value>)',
        },
        red: {
          DEFAULT: 'rgb(var(--red-default-rgb) / <alpha-value>)',
          darkness: 'rgb(var(--red-darkness-rgb) / <alpha-value>)',
          dark: 'rgb(var(--red-dark-rgb) / <alpha-value>)',
          light: 'rgb(var(--red-light-rgb) / <alpha-value>)',
          neutral: 'rgb(var(--red-neutral-rgb) / <alpha-value>)',
          lighter: 'rgb(var(--red-lighter-rgb) / <alpha-value>)',
        },
        yellow: {
          DEFAULT: 'rgb(var(--yellow-default-rgb) / <alpha-value>)',
          darkness: 'rgb(var(--yellow-darkness-rgb) / <alpha-value>)',
          dark: 'rgb(var(--yellow-dark-rgb) / <alpha-value>)',
          light: 'rgb(var(--yellow-light-rgb) / <alpha-value>)',
          neutral: 'rgb(var(--yellow-neutral-rgb) / <alpha-value>)',
          lighter: 'rgb(var(--yellow-lighter-rgb) / <alpha-value>)',
        },
        green: {
          DEFAULT: 'rgb(var(--green-default-rgb) / <alpha-value>)',
          darkness: 'rgb(var(--green-darkness-rgb) / <alpha-value>)',
          dark: 'rgb(var(--green-dark-rgb) / <alpha-value>)',
          light: 'rgb(var(--green-light-rgb) / <alpha-value>)',
          neutral: 'rgb(var(--green-neutral-rgb) / <alpha-value>)',
          lighter: 'rgb(var(--green-lighter-rgb) / <alpha-value>)',
        },
        orange: {
          DEFAULT: 'rgb(var(--orange-default-rgb) / <alpha-value>)',
          darkness: 'rgb(var(--orange-darkness-rgb) / <alpha-value>)',
          dark: 'rgb(var(--orange-dark-rgb) / <alpha-value>)',
          light: 'rgb(var(--orange-light-rgb) / <alpha-value>)',
          neutral: 'rgb(var(--orange-neutral-rgb) / <alpha-value>)',
          lighter: 'rgb(var(--orange-lighter-rgb) / <alpha-value>)',
        },
        pink: {
          DEFAULT: 'rgb(var(--pink-default-rgb) / <alpha-value>)',
          darkness: 'rgb(var(--pink-darkness-rgb) / <alpha-value>)',
          dark: 'rgb(var(--pink-dark-rgb) / <alpha-value>)',
          light: 'rgb(var(--pink-light-rgb) / <alpha-value>)',
          neutral: 'rgb(var(--pink-neutral-rgb) / <alpha-value>)',
          lighter: 'rgb(var(--pink-lighter-rgb) / <alpha-value>)',
        },
        grey: {
          DEFAULT: 'rgb(var(--grey-default-rgb) / <alpha-value>)',
          darkness: 'rgb(var(--grey-darkness-rgb) / <alpha-value>)',
          dark: 'rgb(var(--grey-dark-rgb) / <alpha-value>)',
          light: 'rgb(var(--grey-light-rgb) / <alpha-value>)',
          neutral: 'rgb(var(--grey-neutral-rgb) / <alpha-value>)',
          lighter: 'rgb(var(--grey-lighter-rgb) / <alpha-value>)',
        },
        background: {
          DEFAULT: 'rgb(var(--background-default-rgb) / <alpha-value>)',
          white: 'rgb(var(--background-white-rgb) / <alpha-value>)',
          black: 'rgb(var(--background-black-rgb) / <alpha-value>)',
          table: 'rgb(var(--background-table-rgb) / <alpha-value>)',
        },
        'default-text': {
          dark: 'rgb(var(--text-dark-rgb) / <alpha-value>)',
          DEFAULT: 'rgb(var(--text-default-rgb) / <alpha-value>)',
          light: 'rgb(var(--text-light-rgb) / <alpha-value>)',
          white: 'rgb(var(--text-white-rgb) / <alpha-value>)',
          black: 'rgb(var(--text-black-rgb) / <alpha-value>)',
        },
        table: {
          highlight: 'rgb(var(--table-highlight-rgb) / <alpha-value>)',
        },
        fontFamily: {
          main: ['"Inter"', 'sans-serif'],
        },
        'mc-container': {
          sm: {
            maxWidth: '40rem', // 640px
          },
          md: {
            maxWidth: '48rem', // 768px
          },
          lg: {
            maxWidth: '64rem', // 1024px
          },
          xl: {
            maxWidth: '80rem', // 1280px
          },
          '2xl': {
            maxWidth: '120', // 1920px
          },
          fluid: {
            maxWidth: '100%',
          },
        },
      },
      fontSize: {
        '8px': ['0.5rem', '1.2'],
        '11px': ['0.6875rem', '1.2'],
        '12px': ['0.75rem', '1.2'],
        '13px': ['0.8125rem', '1.2'],
        '14px': ['0.875rem', '1.2'],
        '15px': ['0.9375rem', '1.2'],
        '16px': ['1rem', '1.2'],
        '17px': ['1.0625rem', '1.2'],
        '18px': ['1.125rem', '1.2'],
        '19px': ['1.1875rem', '1.2'],
        '20px': ['1.25rem', '1.2'],
        '21px': ['1.3125rem', '1.2'],
        '22px': ['1.375rem', '1.2'],
        '23px': ['1.4375rem', '1.2'],
        '24px': ['1.5rem', '1.2'],
        '25px': ['1.5625rem', '1.2'],
        '26px': ['1.625rem', '1.2'],
        '27px': ['1.6875rem', '1.2'],
        '28px': ['1.75rem', '1.2'],
        '29px': ['1.8125rem', '1.2'],
        '30px': ['1.875rem', '1.2'],
        '31px': ['1.9375rem', '1.2'],
        '32px': ['2rem', '1.2'],
        // for icon only
        '80px': ['5rem', '0'],
        '96px': ['6rem', '0'],
        '104px': ['6.5rem', '0'],
      },
      borderWidth: {
        1: '1px',
      },
      fontFamily: {
        main: ['"Inter"', 'sans-serif'],
      },
      screens: {
        pc: '1400px', // 1400px
        'max-pc': {
          max: '1399px', // 1399px
        },
        desktop: '1200px', // 1200px
        'max-desktop': {
          max: '1199px', // 1199px
        },
        laptop: '992px', // 992px
        'max-laptop': {
          max: '991px', // 991px
        },
        tablet: '768px', // 768px
        'max-tablet': {
          max: '767px', // 767px
        },
        mobile: '576px', // 576px
        'max-mobile': {
          max: '575px', // 575px
        },
      },
      aspectRatio: {
        '16/9': '16 / 9',
        '9/16': '9 / 16',
        '4/3': '4 / 3',
        '3/4': '3 / 4',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        fadeOut: 'fadeOut 0.3s ease-in-out',
        fadeInUp: 'fadeInUp 0.3s ease-in-out',
        fadeOutDown: 'fadeOutDown 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOutDown: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(20px)' },
        },
      },
    },
  },
};
