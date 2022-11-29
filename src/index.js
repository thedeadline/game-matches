import React from "react";
import { render } from "react-dom";
import { processFile } from "./code";

export const getFile = async (e) => {
  e.preventDefault();
  const reader = new FileReader();
  reader.onload = async (e) => {
    const text = e.target.result;
    processFile(text);
  };
  reader.readAsText(e.target.files[0]);
};

const App = () => (
  <div>
    <h2>Add input file {"\u2728"}</h2>
    <input type="file" onChange={(e) => getFile(e)} />
  </div>
);

render(<App />, document.getElementById("root"));
