import React from 'react';
// import Layout from './components/layout';
import Login from './components/login';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Dashboard from './components/dashboard';
import Page from './components/page';
import Category from './components/category';
import User from './components/user';
import AddPage from './components/addPage';

function App() {
  return (
    <React.Fragment>
       <Router>
         <Switch>
           <Route exact path="/" component={Dashboard} />
           <Route exact path="/dashboard" component={Dashboard} />
           <Route exact path="/login" component={Login} />
           <Route exact path="/pages" component={Page} />
           <Route exact path="/categories" component={Category} />
           <Route exact path="/users" component={User} />
           <Route exact path="/pages/add" component={AddPage} />
         </Switch>
       </Router>
    </React.Fragment>
  );
}

export default App;
