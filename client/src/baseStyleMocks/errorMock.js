export default (overrides = {}) => {

  const styles = {
    "font-weight": "bold;",
    "color": "#cc0000;",
    ...overrides
  };
  const stringStyles = Object.keys(styles).map((key) => key + ":" + styles[key]);
  return stringStyles;
};