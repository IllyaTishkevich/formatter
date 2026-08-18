module.exports = {
    content: [
        './public/index.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],

    css: [
        './build/static/css/*.css',
    ],

    output: './build/static/css/',

    variables: true,
    keyframes: true,

    safelist: {
        standard: [
            'show',
            'fade',
            'collapse',
            'collapsing',
            'modal-backdrop',
            'modal-open',
            'offcanvas-backdrop',
        ],
    },
};