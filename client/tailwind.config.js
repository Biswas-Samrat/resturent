/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                texas: {
                    red: '#8B2635',
                    orange: '#CC5803',
                    slate: '#404E5C',
                    cream: '#F5E6D3',
                    darkRed: '#6B1E2C',
                    lightOrange: '#E97451',
                }
            },
            fontFamily: {
                heading: ['Bebas Neue', 'Impact', 'sans-serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
