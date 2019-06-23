import React from "react";
import ReactDom from "react-dom";
import Routes from "./routes";


const wrapper = document.getElementById("react-wrapper");
ReactDom.render(<Routes />, wrapper);
