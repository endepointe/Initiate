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

const Register = (props) => {

  const classes = useStyles();

  const [invalid, invalidCredentials] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.elements.username.value;
    const email = e.target.elements.useremail.value;
    const password = e.target.elements.password.value;
    const vpassword = e.target.elements.verifypassword.value;

    console.log(password, vpassword);

    if (password !== vpassword) {
      e.target.elements.username.value = name;
      e.target.elements.useremail.value = email;
      e.target.elements.password.value = null;
      e.target.elements.verifypassword.value = null;
      e.target.elements.password.focus();
      invalidCredentials(true);
    }

    if (password === vpassword) {
      axios.post('/api/user/register', {
        name: name,
        email: email,
        password: password
      })
        .then((response) => {
          if (response.status === 200) {
            invalidCredentials(false);
            props.handleLogin(
              response.data._id,
              response.data.name,
              response.headers['auth-token'],
              response.status);
          }
          console.log("res: " + response.data);
        })
        .catch((err) => {
          console.log("err: " + err);
        });
      e.target.elements.username.value = null;
      e.target.elements.useremail.value = null;
      e.target.elements.password.value = null;
      e.target.elements.verifypassword.value = null;
    }
  }

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Grid>
        <Typography align="center" color="primary" component="h1" variant="h5">
          Register
        </Typography>
      </Grid>
      <form
        className={classes.form}
        onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username"></label>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Your Name"
            autoFocus
            name="username"
            type="text" />
        </div>
        <div>
          <label htmlFor="useremail"></label>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
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
        <div>
          <label htmlFor="verifypassword"></label>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Verify Password"
            name="verifypassword"
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
          className={classes.submit}>Register</Button>
      </form>
    </Container>
  );
}

export default Register;