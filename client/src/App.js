import React,
{
  useState,
  useEffect,
} from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import VotingPage from './components/VotingPage';
import Home from './components/Home';

const App = () => {

  const [authStatus, setAuthStatus] = useState(0);
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
  }, [authStatus]);

  const handleAuth = (id, user, token, status) => {
    setId(id);
    setUser(user);
    setAuthStatus(status);
    setToken(token);
  }

  return (
    <Box width={1}>
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
    </Box>
  );
}

export default App;