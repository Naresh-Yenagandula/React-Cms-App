import React from 'react';
// import Layout from './components/layout';
import Login from './components/login';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Dashboard from './components/dashboard';
import Page from './components/page';
import Category from './components/category';
import User from './components/user';
import AddPage from './components/addPage';
import UpdatePage from './components/updatePage';
import UpdateCategory from './components/updateCategory';
import AddCategory from './components/categoryAdd';
import AddUser from './components/addUser';
import UpdateUser from './components/updateUser';

function App() {
  return (
    <React.Fragment>
       <Router>
         <Switch>
           <Route exact path="/" component={Dashboard} />
           <Route exact path="/dashboard" component={Dashboard} />
           <Route exact path="/login" component={Login} />
           <Route exact path="/pages" component={Page} />
           <Route exact path="/category" component={Category} />
           <Route exact path="/users" component={User} />
           <Route exact path="/pages/add" component={AddPage} />
           <Route exact path="/pages/update" component={UpdatePage} />
           <Route exact path="/category/update" component={UpdateCategory} />
           <Route exact path="/category/add" component={AddCategory} />
           <Route exact path="/users/add" component={AddUser} />
           <Route exact path="/users/update" component={UpdateUser} />
         </Switch>
       </Router>
    </React.Fragment>
  );
}

export default App;
