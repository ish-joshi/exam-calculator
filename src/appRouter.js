import React, {Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPage from './mainPage'
import UnitPage from "./unitCalculator";

import fire from './firebase'

import LinearProgress from '@material-ui/core/LinearProgress';



function AuthHoc(Component, props) {
  
  return class extends React.Component {

    state = {auth: false, loading: true, rc:0}

    componentDidMount() {
      fire.auth().onAuthStateChanged(auth => {
        if (!auth) {
          if (this.state.rc > 0) {this.setState({auth: false, loading: false})}
          else {fire.auth().signInAnonymously(); this.setState({rc: this.state.rc+1}) }
        }
        else this.setState({auth, loading: false})
      })
    }

    render() {
      console.log(this.state)
      return (<div>{ this.state.loading ? <LinearProgress /> : null}
      {!this.state.loading && !this.state.auth && this.state.rc > 0 ? <p>Authentication error occured</p> : null}
      {this.state.auth ? <Component {...props}/> : null}</div>)
    }

  }

}





function AppRouter() {
  return (
    <Router>
        <Route path="/" exact component={AuthHoc(MainPage)} />
        <Route exact path="/unit/:unitcode" component={UnitPage} />
        
    </Router>
  );
}

export default AppRouter;