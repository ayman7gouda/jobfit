module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  //darkMode: class, // or 'media' or 'class'
  theme: {
    boxShadow: {
      sm: "0 4px 32px 0 rgba(0, 0, 0, 0.16)",
      btn: "0 2px 8px 0 rgba(0, 0, 0, 0.08)",
    },
    extend: {
      bgGradientDeg: {
        54: "54 deg",
        61: "61 deg",
      },
      colors: {
        "safe-orange": "#ab4d00",
        "med-blue": "#134d78",
        "text-light": "#5a5a5a",
        "safe-green": "#3e754a",
        "dark-ui-dark-blue-lv-1": "#111a22",
        "backgrounds-light-grey": "#f9fafc",
        "backgrounds-dark-blue": "#040e16",
        "dark-ui-dark-blue-lv-2": "#232c33",
        "text-lightest": "#e1e1e1",
        "dark-ui-dark-blue-lv-4": "#363e45",
        "dark-ui-dark-blue-lv-3": "#2c353b",
        "dark-ui-white-50": "rgba(255, 255, 255, 0.5)",
        "dark-ui-white-30": "rgba(255, 255, 255, 0.3)",
        "text-lighter": "#c0c0c0",
        "dark-ui-white-15": "rgba(255, 255, 255, 0.15)",
        "greens-base-green": "#59a96a",
        "greens-dark-green": "#245b30",
        "greens-light-green": "#33cf54",
        "greens-lightest-green": "#c3f9ce",
        "session-summer-a": "#6a1b9a",
        "session-summer-b": "#c62828",
        "session-autumn": "#b2601c",
        "session-autum-light": "#fff3e0",
        "session-spring-light": "#e8f5e9",
        "session-spring": "#2e7d32",
        "session-summer-a-light": "#f3e5f5",
        "session-summer-b-light": "#ffebee",
        "skills-pink-light": "#f8bbd0",
        "skills-pink-base": "#d81b60",
        "skills-purple-base": "#8e24aa",
        "skills-purple-light": "#e1bee7",
        "skills-indigo-base": "#3949ab",
        "skills-indigo-light": "#c5cae9",
        "skills-blue-base": "#1e88e5",
        "skills-blue-light": "#b3e5fc",
        "skills-teal-base": "#00897b",
        "skills-teal-light": "#b2dfdb",
        "skills-green-base": "#43a047",
        "skills-green-light": "#c8e6c9",
        "skills-dark-ui-adjustments-indigo-base": "#9575cd",
        "skills-dark-ui-adjustments-pink-base": "#f06292",
        "skills-dark-ui-adjustments-purple-base": "#ba68c8",
        "skills-dark-ui-adjustments-blue-base": "#64b5f6",
        "skills-dark-ui-adjustments-green-base": "#81c784",
        "skills-dark-ui-adjustments-teal-base": "#4db6ac",
        "outlines-dark-blue": "#134d78",
        "crimson": "#903",
        "white": "#fff",
        "wsu-black": "#262223",
        "hilight-orange": "#ff5c5e",
        "academy-red": "#f03",
        "postgrad-blue": "#069",
        "research-purple": "#639",
        "crimson-30": "#e1b4af",
        "crimson-15": "#f0d7d6",
        "purple-30": "#cdb9d7",
        "purple-15": "#e6dceb",
        "teal-30": "#82b4c8",
        "teal-15": "#bed7e1",
        "vibrant-purple": "#c9f",
        "light-white": "#feffff",
        "off-white": "#f2f2f2",
        "lightest-grey": "#eaebea",
        "mid-grey": "#898687",
        "dark-grey": "#3a3537",
        "deep-grey": "#272727",
        "cherry-red": "#ed0033",
        "light-ui-black-15": "rgba(4, 14, 22, 0.15)",
        "light-ui-black-30": "rgba(4, 14, 22, 0.3)",
        "light-ui-black-5": "rgba(4, 14, 22, 0.05)",
      },
      backgroundImage: {
        "split-black-orange":
          "linear-gradient(to left, #ff5c5e 50%, #262223 50%);",
        "split-black-grey":
          "linear-gradient(to left, #eaebea 50%, #262223 50%);",
        "split-grey-orange":
          "linear-gradient(to left, #eaebea 50%, #ff5c5e 50%);",
        "pine-green-54":
          "linear-gradient(54deg, #092031 63%, #3f1831 88%, #5a0013 100%)",
        "pine-green-61":
          "linear-gradient(61deg, #092031 63%, #3f1831 88%, #5a0013 100%)",
          "start":"url('/images/start_background.jpg')",
          "questions":"url('/images/questions_background.jpg')",
          "careers":"url('/images/careers_background.jpg')",
          "dashboard-goal": "linear-gradient(61.42deg, #092031 20.31%, #990033 100%);"
      },
      backgroundSize: {
        "size-200": "200% 100%;",
      },
      fontFamily: {
        OpenSans: ["Open Sans", "sans-serif"],
        chronicle: ["Chronicle Text G1"],
      },
      spacing: {
        frame: "270px",
      },
      lineHeight: {
        wsu: "1.41",
      },
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        md: "1140px",
        lg: "1140px",
        xl: "1140px",
        "2xl": "1140px",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
