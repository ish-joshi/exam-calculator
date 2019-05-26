import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPage from './mainPage'
import UnitPage from "./unitCalculator";








function AppRouter() {
  return (
    <Router>
      

        <Route path="/" exact component={MainPage} />
        <Route exact path="/unit/:unitcode" component={UnitPage} />
        
    </Router>
  );
}

export default AppRouter;