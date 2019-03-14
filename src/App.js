import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
//import {HashRouter as Router, Route,Switch} from 'react-router-dom';

import {UserIsAuthenticated, UserIsNotAuthenticated} from './helpers/auth.js'

import {Provider} from 'react-redux';
import store from './store.js'

import AppNavbar from './components/layout/AppNavbar.js';
import Dashboard from './components/layout/Dashboard.js';

import AddClient from './components/clients/AddClient.js';

import EditClient from './components/clients/EditClient.js';

import ClientDetail from './components/clients/ClientDetail.js';

import Login from './components/auth/Login.js';
import Settings from './components/settings/Settings.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
       <Router>
       <div className="App">

         <AppNavbar />

          <div className="container">
           <Switch>
             <Route exact path="/" component={UserIsAuthenticated(Dashboard)}/>
            
             <Route exact path="/client/add" component={UserIsAuthenticated(AddClient)}/>
             <Route exact path="/client/edit/:id" component={UserIsAuthenticated(EditClient)}/>
             <Route exact path="/clients/:id" component={UserIsAuthenticated(ClientDetail)}/>
             <Route exact path="/login" component={UserIsNotAuthenticated(Login)}/>
             <Route exact path="/settings" component={UserIsAuthenticated(Settings)}/>
           </Switch>
          </div>

       </div>
      </Router>
      </Provider>
     
     
    );
  }
}

export default App;
