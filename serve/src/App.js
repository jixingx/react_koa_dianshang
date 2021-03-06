import React from 'react';
import {Route,Switch,Redirect} from "react-router-dom"
import Login from './pages/login/login';
import Admin from './pages/admin/admin';

class App extends React.Component {
  render() { 
    return (  
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Redirect to="/login" />
      </Switch>
    );
  }
}
 
export default App;
