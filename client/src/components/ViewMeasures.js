//import './ViewMeasures.css';
import React,
{
  useEffect,
  useState
} from 'react';
import Measure from './Measure';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const ViewMeasures = (props) => {

  const classes = useStyles();

  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    axios.get('/api/vote/view-measures')
      .then((response) => {
        try {
          let currentMeasures = [];
          for (let i = response.data.length - 1; i >= 0; --i) {
            currentMeasures.push(response.data[i]);
          }
          setMeasures(currentMeasures);
        } catch (err) {
          console.log(err)
        }
      });
  }, []);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {measures.map((measure, i) => {
          return <Measure
            {...props}
            key={i}
            userId={props.userId}
            data={measure}
            title={measure.name}
            desc={measure.description}
            yeses={measure.votes.yes}
            nos={measure.votes.no}
          />
        })}
      </Grid>
    </Container>
  )
}

export default ViewMeasures;