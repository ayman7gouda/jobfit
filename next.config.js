// const withTM = require("next-transpile-modules")([
//   "react-dnd-html5-backend",
//   "react-dnd-touch-backend",
//   "react-dnd",
//   "@minoru/react-dnd-treeview",
// ]);

module.exports = {
  // experimental: { esmExternals: "loose" },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
    reactRemoveProperties: true,
  },
};
