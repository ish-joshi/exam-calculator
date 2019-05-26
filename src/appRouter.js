import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPage from './mainPage'
import UnitPage from "./unitCalculator";


function Index() {
  return <MainPage/>;
}

function Units() {
  return <UnitPage/>;
}


function AppRouter() {
  return (
    <Router>
      

        <Route path="/" exact component={Index} />
        <Route path="/unit/:unitcode" component={Units} />
        
    </Router>
  );
}

export default AppRouter;