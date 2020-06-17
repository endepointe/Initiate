import React, {
  useEffect,
  useState
} from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  voteForm: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  measureInfo: {
  },
  title: {

  },
  desc: {

  },
  votingArea: {
    marginBottom: '1rem',
  },
  bottomInfo: {
    justifySelf: 'flex-end',
    marginTop: '1.2rem',
  },
  radios: {
    flex: 2,
  },
  castVote: {
    flex: 1,
    fontWeight: 400,
    color: 'white',
    '&:hover': {
      color: 'white',
      fontWeight: 600,
      backgroundColor: 'rgb(37, 87, 196, 0.9)',
    },
  }
}))

const Measure = (props) => {

  const classes = useStyles();

  const currDate = new Date().getTime();
  const endDate = new Date(props.data.endDate).getTime();
  const [counter, setCounter] = useState(currDate);
  const [votingOver, endVoting] = useState(false);
  const [yays, setYays] = useState(props.yeses);
  const [nays, setNays] = useState(props.nos);
  const myDate = new Date(props.data.endDate);
  var m = myDate.getMonth();
  var d = myDate.getDay();
  var y = myDate.getFullYear();
  var h = myDate.getUTCHours();
  var mi = myDate.getMinutes();

  h = h % 12;
  if (h === 0) {
    h = 12;
  }

  if (mi < 10) {
    mi = "0" + mi;
  }

  const getDayTime = (hour) => {
    if (hour > 12) {
      return "PM";
    }
    else {
      return "AM";
    }
  }

  var fulldate = m + '/' + d + "/" + y + "  " + h + ":" + mi + " " + getDayTime(h)

  var userHasVoted = props.data.voters.includes(props.userId);
  const [voting, checkVote] = useState(false)
  const measureId = props.data._id;

  useEffect(() => {
    let time = setInterval(() => setCounter(currDate + 1000), 1000);
    if (currDate >= endDate) {
      endVoting(true);
    }
    return () => clearTimeout(time);
  }, [currDate, endDate]);


  const retTime = (seconds) => {
    if (seconds > 60) {
      if (seconds > 3600) {
        return (Math.round(seconds / 3600) + " Hours");
      }
      else {
        return (Math.round(seconds / 60) + " Minutes");
      }
    }
    else {
      return (Math.round(seconds) + " Seconds");
    }
  }

  const castVote = (e) => {
    e.preventDefault();
    console.log(e.target.elements.choice.value);

    if (e.target.elements.choice.value !== '') {
      console.log('choice is not null');
      axios.post('/api/vote/cast-vote', ({
        decision: e.target.elements.choice.value,
        userId: props.userId,
        measureId: measureId
      })
      ).then((response) => {
        console.log(response);
      });
      checkVote(true);
      if (e.target.elements.choice.value === "yes") {
        setYays(yays + 1);
      }
      else {
        setNays(nays + 1);
      }
    }
    else {
      console.log('choice is null');
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardContent
          className={classes.measureInfo}>
          <h3 className={classes.title}>{props.title}</h3>
          <p className={classes.desc}>{props.desc}</p>
        </CardContent>
        <div className={classes.votingArea}>
          {votingOver || userHasVoted || voting ? '' :
            <form onSubmit={castVote} className={classes.voteForm}>
              <RadioGroup className={classes.radios}>
                <div className="voteChoice">
                  <Radio name="choice" value="yes" id="yes" />
                  <label htmlFor="yes">Yay</label>
                </div>
                <div className="voteChoice">
                  <Radio name="choice" value="no" id="no" />
                  <label htmlFor="no" className="voteLabel">Nay</label>
                </div>
              </RadioGroup>
              <Button
                type="submit"
                color='primary'
                fullWidth
                variant="contained"
                className={classes.castVote}>Cast Vote</Button>
            </form>
          }


          <div className={classes.bottomInfo}>
            {votingOver ?
              <CardContent>
                <p>The voting period for this measure has ended</p>
                <p>Expired on: {fulldate}</p>
                <p>Votes in favor: {props.yeses}</p>
                <p>Votes against: {props.nos}</p>
              </CardContent> :
              userHasVoted ?
                <CardContent>
                  <p>Time left: {retTime((endDate - counter) / 864)}</p>
                  <p>Votes in favor: {props.yeses}</p>
                  <p>Votes against: {props.nos}</p>
                </CardContent> :
                voting ?
                  <CardContent>
                    <p>Time left: {retTime((endDate - counter) / 864)}</p>
                    <p>Votes in favor: {yays}</p>
                    <p>Votes against: {nays}</p>
                  </CardContent> :
                  <CardContent>
                    <p>Time left: {retTime((endDate - counter) / 864)}</p>
                    <p>Cast your vote to see the results</p>
                  </CardContent>}
          </div>
        </div>
      </Card>
    </Grid>
  );
}

export default Measure;