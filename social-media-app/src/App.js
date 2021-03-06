import React from 'react';
import jwtDecode from 'jwt-decode'
import axios from 'axios'

import './App.css';
import themeObject from './util/theme';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'


import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import user from './pages/user'

import NavBar from './components/layout/Navbar'
import AuthRoute from './util/AuthRoute'


import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData} from './redux/actions/userActions'



const theme = createMuiTheme(themeObject)

axios.defaults.baseURl = 'https://europe-west3-socialape-a8f4d.cloudfunctions.net/api'

const token = localStorage.FBIdToken;
if (token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp*1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login'

  }else{
    store.dispatch({ type: SET_AUTHENTICATED})
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

class App extends React.Component {
  
  render() {    
    return (
      <Provider store={store}>
        <MuiThemeProvider  theme={theme}>                
            <Router>
              <NavBar />
              <div className="container">
                <Switch>
                  <Route exact path='/' component={home}></Route>
                  <AuthRoute exact path='/login' component={login}  />
                  <AuthRoute exact path='/signup' component={signup} />
                  <Route exact path='/user/:handle' component={user} />
                  <Route exact path='/user/:handle/scream/:screamId' component={user} />
                </Switch>
              </div>
            </Router> 
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
