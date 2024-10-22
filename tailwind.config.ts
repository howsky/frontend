import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        screen: '100dvh',
      },
      width: {
        screen: '100dvw',
      },
      maxHeight: {
        screen: '100dvh',
      },
      maxWidth: {
        screen: '100dvw',
      },
    },
  },
  plugins: [],
};
export default config;
