import React,
{
  useState,
} from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Register from './Register';
import Login from './Login';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const Home = (props) => {

  const classes = useStyles();

  const [login, selectLogin] = useState(true);

  const handleLogin = (id, user, token, status) => {

    props.handleAuth(id, user, token, status);
    props.history.push('/voting/about');
  }

  const showOptions = (e) => {
    console.log(e.target.textContent)
    selectLogin(!login);
    let q = document.querySelector('.question');
    if (e.target.textContent === 'Need an account? Register') {
      q.textContent = 'Have an account? Login'
    } else {
      q.textContent = 'Need an account? Register'
    }
  }

  return (
    <Container className={classes.paper} maxWidth="xs">
      <CssBaseline />
      {!login ?
        <Register handleLogin={handleLogin} />
        : <Login handleLogin={handleLogin} />}
      <Box
        mt={2}>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center">
          <Link
            component="button"
            variant="body2"
            underline="hover"
            className="question"
            onClick={showOptions}>Need an account? Register</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;