import React,
{
  useState,
  useEffect,
} from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import { Container } from '@material-ui/core';
import VotingPage from './components/VotingPage';
import Home from './components/Home';
//import './App.css';

const App = () => {

  const [authStatus, setAuthStatus] = useState(0);
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    console.log(`auth stat: ${authStatus}`);
  }, [authStatus]);

  const handleAuth = (id, user, token, status) => {
    console.log(`
    From App {\n
        Id: ${id}
        User: ${user}\n  
        Token: ${token}\n  
        Status: ${status}\n
    }`);
    setId(id);
    setUser(user);
    setAuthStatus(status);
    setToken(token);
  }

  return (
    <div className="backDrop">
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <Home
              {...props}
              handleAuth={handleAuth}
              auth={authStatus} />
          )} />
        <Route
          exact
          path="/voting/about"
          render={props => (
            <VotingPage
              {...props}
              id={id}
              user={user}
              token={token}
              auth={authStatus} />
          )}>
        </Route>
      </Switch>
    </div>
  );
}

export default App;