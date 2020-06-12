//import './VotingPage.css';
import React,
{
} from 'react';
import {
  BrowserRouter,
  Link,
  Switch,
  Route,
} from 'react-router-dom';
import About from './About';
import CreateMeasure from './CreateMeasure';
import ViewMeasures from './ViewMeasures';

const VotingPage = (props) => {

  console.log(`all props: ${props}`);

  const logout = () => {
    props.history.push('/');
  }

  return (
    <BrowserRouter>
      <div className="wrapper">
        <div className="header">
          <h1 className="headerTitle">CLOUDVOTE</h1>
        </div>
        <div className="nav">
          <div className="navItem userWelcome">
            <img src="https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png" alt="userIcon" className="userIcon"></img>
            <p className="userName">Welcome, {props.user}</p>
          </div>
          <Link to="/voting/about" className="navItem linkButton">About</Link>
          <Link to="/voting/create-measure" className="navItem linkButton">Propose a Measure</Link>
          <Link to="/voting/view-measures" className="navItem linkButton">View Proposals</Link>
          {/* {insert dropdown menu} */}
        </div>
        <div className="votingSection">
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
        </div>
      </div>
    </BrowserRouter >
  );
}

export default VotingPage;