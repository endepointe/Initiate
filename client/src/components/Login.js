import React,
{
  useState,
} from 'react';
//import './Login.css';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

const Login = (props) => {

  const classes = useStyles();

  const [invalid, invalidCredentials] = useState(false);

  const handleSubmit = (e) => {

    e.preventDefault();

    const email = e.target.elements.useremail.value;
    const password = e.target.elements.password.value;

    axios.post('/api/user/login', {
      email: email,
      password: password
    })
      .then((response) => {
        if (response.status === 200) {
          props.handleLogin(
            response.data._id,
            response.data.name,
            response.headers['auth-token'],
            response.status);
        }
      })
      .catch((err) => {
        invalidCredentials(true);
        console.log(err);
      });

    if (invalid === true) {
      e.target.elements.useremail.focus();
    }
    e.target.elements.useremail.value = null;
    e.target.elements.password.value = null;
  }

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Grid>
        <Typography align="center" color="primary" component="h1" variant="h5">
          Login
        </Typography>
      </Grid>
      <form
        className={classes.form}
        onSubmit={handleSubmit}>
        <div>
          <label htmlFor="useremail"></label>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            name="useremail"
            type="email" />
        </div>
        <div>
          <label htmlFor="password"></label>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            autoComplete="current-password"
            name="password"
            type="password" />
        </div>
        <div className="errorMsg">
          {invalid ? 'try again' : null}
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}>Login</Button>
      </form>
    </Container>
  );
};

export default Login;