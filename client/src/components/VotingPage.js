//import './VotingPage.css';
import React,
{
} from 'react';
import {
  BrowserRouter,
  Link as Lnk,
  Switch,
  Route,
} from 'react-router-dom';
import About from './About';
import CreateMeasure from './CreateMeasure';
import ViewMeasures from './ViewMeasures';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
// import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://endepointe.com/">
        EndePointe
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  header: {
    backgroundColor: 'rgb(60, 87, 110)',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  linkButton: {
    color: 'white',
    marginLeft: '1rem',
    '&:hover': {
      color: 'white',
      marginLeft: '1rem',
    },
  },
  logout: {
    backgroundColor: 'rgb(60, 87, 110)',
    color: 'white',
    marginLeft: '1rem',
    '&:hover': {
      color: 'white',
      backgroundColor: 'rgba(60, 60, 60, 0.8)',
      marginLeft: '1rem',
    },
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    //backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const VotingPage = (props) => {

  const classes = useStyles();

  const logout = () => {
    props.history.push('/');
  }

  return (
    <React.Fragment>
      <BrowserRouter>
        <CssBaseline />
        <AppBar className={classes.header} position="relative">
          <Box align="center">
            <h1>Vote Demo</h1>
          </Box>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              Welcome, {props.user}
            </Typography>
            <nav>
              <Lnk to="/voting/about" className={classes.linkButton}>About</Lnk>
              <Lnk to="/voting/create-measure" className={classes.linkButton}>Propose a Measure</Lnk>
              <Lnk to="/voting/view-measures" className={classes.linkButton}>View Proposals</Lnk>
              <Button
                color="secondary"
                onClick={logout}
                className={classes.logout}>Logout</Button>
            </nav>
          </Toolbar>
        </AppBar>
        <main>
          <Container className={classes.cardGrid} maxWidth="md">
            <Switch>
              <Route path="/voting/about">
                <About />
              </Route>
              <Route path="/voting/create-measure">
                <CreateMeasure
                  {...props}
                  token={props.token}
                  userId={props.id}
                  user={props.user} />
              </Route>
              <Route path="/voting/view-measures">
                <ViewMeasures
                  {...props}
                  token={props.token}
                  userId={props.id}
                />
              </Route>
            </Switch>
          </Container>
        </main>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Endepointe
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Vote because it matters.
        </Typography>
          <Copyright />
        </footer>
      </BrowserRouter >
    </React.Fragment>
  );
}

export default VotingPage;