import React from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

const CreateMeasure = (props) => {

  const classes = useStyles();

  let form = {}
  const update = (e) => {
    form[e.target.name] = e.target
  }

  const submitProposal = (e) => {

    e.preventDefault();
    const name = e.target.elements.name.value;
    const desc = e.target.elements.description.value;

    console.log(`id in create: ${props.userId}`);

    const tokenReq = axios.create({
      headers: {
        'auth-token': props.token,
      },
      method: 'post'
    });
    tokenReq.post('/api/vote/create-measure', {
      name: name,
      userId: props.id,
      desc: desc,
      votes: {
        yes: 0,
        no: 0
      },
    })
      .then((response) => {
        console.log(`res in createmeasure: ${response.data.name}`);
        form["name"].value = "";
        form["description"].value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className="topSection">
        <h2 className="formHeader">Propose a Measure</h2>
      </div>
      <div className="bottomSection">
        <p className="formText">To create your own measure, please provide the requested information in the form</p>
        <form
          onSubmit={submitProposal}
          className={classes.form}>
          <div>
            <label htmlFor="name"></label>
            <TextField
              autoFocus
              margin="normal"
              fullWidth
              required
              variant="outlined"
              name="name"
              type="text"
              placeholder="Your measure name..."
              onChange={update} />
          </div>
          <div className="colLeft">
            <label htmlFor="description"></label>
            <TextField
              margin="normal"
              fullWidth
              required
              variant="outlined"
              multiline={true}
              name="description"
              placeholder="Your proposal overview..."
              onChange={update} />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>Submit Measure</Button>
        </form>
      </div>
    </Container >
  );

}

export default CreateMeasure;