import React, { useEffect, useCallback, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import User from './components/user';
import AddUser from './components/addUser';
import UpdateUser from './components/updateUser';
import axios from 'axios';
import Dashboard from './components/dashboard';
import Page from './components/page';
import Category from './components/category';
import Login from './components/login';
import AddPage from './components/addPage';
import UpdatePage from './components/updatePage';
import UpdateCategory from './components/updateCategory';
import AddCategory from './components/categoryAdd';

export const UserContext = React.createContext()

function App() {
  const [auth, setAuth] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({ name: '', group: '' })

  const authToken = useCallback(async () => {
    const token = localStorage.getItem("token")
    await axios.get("http://localhost:8081/verify/data?token=" + token)
      .then((result) => {
        setUserData({ name: result.data.name.name, group: result.data.name.group })
        setAuth(true)
        setLoading(false)
      })
      .catch((err) => {
        setAuth(false)
        setLoading(false)
        setUserData({ name: '', group: '' })
      })
  }, [])

  useEffect(() => {
    authToken()
  }, [authToken])


  if (!auth && loading === true) {
    return (<div style={{ display: "flex", justifyContent: "center", top: "40%" }}><p>Checking....</p></div>)
  } else {

    return (
      <React.Fragment>
        <UserContext.Provider value={{ isAuth: auth, isLoading: loading, userName: userData.name, userRole: userData.group, callAuth: authToken }}>
          <Router>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/pages" component={Page} />
              <Route exact path="/category" component={Category} />
              <Route exact path="/pages/add" component={AddPage} />
              <Route exact path="/pages/update/:id" component={UpdatePage} />
              <Route exact path="/category/update/:id" component={UpdateCategory} />
              <Route exact path="/category/add" component={AddCategory} />
              <Route exact path="/users">
                {userData.group === "Admin" ? <>
                  <Route exact path="/users" component={User} />
                  <Redirect to="/users" />
                </> : <Redirect to="/dashboard" />}
              </Route>
              <Route exact path="/users/add">
                {userData.group === "Admin" ?
                  <>
                    <Route exact path="/users/add" component={AddUser} />
                    <Redirect to="/users/add" />
                  </>
                  : <Redirect to="/dashboard" />}
              </Route>
              <Route exact path="/users/update/:id" component={UpdateUser}>
              </Route>
            </Switch>
          </Router>
        </UserContext.Provider>
      </React.Fragment>
    )
  }
}

export default App;
