import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            },
            screens: {
                lg: { min: '90rem' },
                mo: { max: '900px' },
                sm: { min: '900px' },
                md: [{ min: '900px', max: '1440px' }],
                smd: [{ min: '900px', max: '1200px' }]
            },
            width: {
                container: '1440px'
            }
        }
    },
    plugins: []
};
export default config;
