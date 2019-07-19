export default (overrides) => {

  const styles = { 
    "background-color": "#3276b1;",
    ...overrides
  };
  const stringStyles = Object.keys(styles).map((key) => key + ":" + styles[key]);
  return stringStyles;
};