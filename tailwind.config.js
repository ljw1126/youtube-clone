/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'selector',
    content: ["./src/**/*.{jsx,js,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: '#FF0000',
            },
            backgroundColor: {
                darkSearchBar: '#121212',
                darkBtn: '#222222',
                description: '#F2F2F2',
                darkDescription: '#353334',
                notFound: '#F1F1F1',
                darkBg: '#0F0F0F',
                lightBg: '#fdfffd'
            },
            borderColor: {
                dark: '#303030'
            }
        },
    },
    plugins: [],
}
