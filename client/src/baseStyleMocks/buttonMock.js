export default (overrides = {}) => {

  const styles = {
    "outline-style": "none;",
    "display": "inline-block;",
    "margin-bottom": "0;",
    "font-size": "12px;",
    "font-weight": "normal;",
    "line-height": "1.42857143;",
    "text-align": "center;",
    "white-space": "nowrap;",
    "vertical-align": "middle;",
    "user-select": "none;",
    "background-image": "none;",
    "border": "2px solid #428bca;",
    "border-radius": "4px;",
    "padding": "3px 12px;",
    "cursor": "pointer;",
    "background-color": "#428bca;",
    "color": "#fff;",
    ...overrides
  };
  const stringStyles = Object.keys(styles).map((key) => key + ":" + styles[key]);
  return stringStyles;
};