/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'desktop-dark': "url('./assets/images/bg-desktop-dark.jpg')",
        'desktop-light': "url('./assets/images/bg-desktop-light.jpg')",
        'mobile-dark': "url('./assets/images/bg-mobile-dark.jpg')",
        'mobile-light': "url('./assets/images/bg-mobile-light.jpg')",
        'gradient': "linear-gradient(to left, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
        'gradientr': "linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))"
      },
      letterSpacing: {
        widest: '.5em'
      },
      colors: {
        todo: 'hsl(var(--todo-color))',
        checkmark: 'hsl(var(--checkmark))',
        // Light Theme
        lightGray: 'hsl(var(--light-grey))',
        vLightGrayBlue: 'hsl(var(--vlight-grey-blue))',
        lightGreyBlue: 'hsl(var(--light-grey-blue))',
        darkGrayBlue: 'hsl(var(--dark-grey-blue))',
        vdarkGrayBlue: 'hsl(var(--vdark-grey-blue))',

        // Dark Theme
        vDarkBlue: 'hsl(var(--vdark-blue))',
        vDarkSaturatedBlue: 'hsl(var(--vdark-desaturated-blue))',
        lightGrayBlue: 'hsl(var(--light-gray-blue))',
        lightGrayBlueH: 'hsl(var(--light-gray-blueH))',
        darkGreyBlue: 'hsl(var(--dark-gray-blue))',
        vDarkGrayBlue: 'hsl(var(--vdark-gray-blue))',
        vDarkGrayBlue2: 'hsl(var(--vdark-gray-blue2))'
      }
    },
  },
  plugins: [],
}

