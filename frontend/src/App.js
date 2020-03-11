import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import routes from "./routes/routes";

function App() {
  return <Router>{routes}</Router>;
}

export default App;
