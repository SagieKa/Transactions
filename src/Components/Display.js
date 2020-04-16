import React from 'react';
import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import DisplayTable from './DisplayTable';
import Form from './Form';
import Functions from './Functions';
import { Button, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  try: {
    background: 'linear-gradient(315deg, #63d471 0%, #233329 74%)',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    width: '400',
    height: '250px',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    // marginBottom: theme.spacing(50),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  alerts: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(3),
    borderRadius: '25px',
    textAlign: 'center',
    // width: '200px',
    height: '200px',
  },
}));

const Display = forwardRef((props, ref) => {
  const classes = useStyles();
  const [updateArr, setUpdateArr] = useState([]);

  useImperativeHandle(ref, () => ({
    setDisplay(trans) {
      setUpdateArr([...trans]);
    },
  }));

  useEffect(() => {
    console.log('hi i am a user effect in display');
  }, [props.transactionBody]);

  return (
    <Grid container>
      <Grid item xs={2}>
        <Alert severity='info' className={classes.alerts}>
          <AlertTitle>Your acoount</AlertTitle>
          <strong>1000$</strong>
        </Alert>
        <Alert severity='error' className={classes.alerts}>
          <AlertTitle>All Minus</AlertTitle>
          <strong>5000$</strong>
        </Alert>
        <Alert severity='success' className={classes.alerts}>
          <AlertTitle>All Plus</AlertTitle>
          <strong>6000$</strong>
          <strong>{updateArr.map((x) => x.type)}</strong>
        </Alert>
      </Grid>
      <Grid item xs={8} className={classes.table}>
        <DisplayTable trans={props.transactionBody} updateArr={updateArr} />
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
});

export default Display;
