import localFont from 'next/font/local'

export const VelaSansFont = localFont({
  src: [
    {
      path: '../../public/fonts/vela-sans/VelaSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vela-sans/VelaSans-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vela-sans/VelaSans-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vela-sans/VelaSans-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vela-sans/VelaSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vela-sans/VelaSans-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vela-sans/VelaSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vela-sans/VelaSans-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-vela-sans',
})

export const CygreFont = localFont({
  src: [
    {
      path: '../../public/fonts/cygre/Cygre-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/cygre/Cygre-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/cygre/Cygre-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-cygre',
})
