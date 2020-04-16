import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Divider, Button } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TrendingUp from '@material-ui/icons/TrendingUp';
import TrendingDown from '@material-ui/icons/TrendingDown';
import BuildIcon from '@material-ui/icons/Build';
import Form from './Form';

import { makeMaskFromFormat } from '@material-ui/pickers/_helpers/text-field-helper';

// background-color: #deebdd;
// background-image: linear-gradient(315deg, #deebdd 0%, #bbdbbe 74%);
// background-color: #3bb78f;
// background-image: linear-gradient(315deg, #3bb78f 0%, #0bab64 74%);
// background-color: #63a4ff;
// background-image: linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%);
// const useStyles = makeStyles(theme => ({
//   button: {
//     width: '500px',
//     height: '100px',
//     backgroundColor: 'white',
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     whiteSpace: 'nowrap',
//     marginBottom: theme.spacing(1)
//   },
//   paper: {
//     width: '500px',
//     height: '500px',
//     backgroundColor: 'white',
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     whiteSpace: 'nowrap',
//     marginBottom: theme.spacing(1)
//   },
//   divider: {
//     margin: theme.spacing(2, 0)
//   }
// }));
const useStyles = makeStyles({
  root: {
    padding: '20px',
    borderRadius: '25px',
    marginBottom: 10,
    marginTop: 20,
  },
});

function Functions(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [showMEPlus, setshowMEPlus] = React.useState(false);
  const [showMEMinus, setshowMEMinus] = React.useState(false);
  const [transaction, setTransaction] = React.useState('');

  function handelPlus(e) {
    if (!showMEPlus) {
      setshowMEMinus(false);
      setshowMEPlus(true);
    } else {
      setshowMEPlus(false);
    }
  }
  function handelMinus(e) {
    if (!showMEMinus) {
      setshowMEPlus(false);
      setshowMEMinus(true);
    } else {
      setshowMEMinus(false);
    }
  }
  const getTrans = (trans) => {
    setTransaction(trans);
    props.getTransBody(trans);
  };

  return (
    <Grid container>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          // onClick={alert('hi')}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            onClick={handelPlus}
            label='Add'
            icon={<TrendingUp />}
          />

          <BottomNavigationAction
            label='Minus'
            onClick={handelMinus}
            icon={<TrendingDown />}
          />

          <BottomNavigationAction
            label='Another'
            onClick={handelPlus}
            icon={<BuildIcon />}
          />
        </BottomNavigation>
      </Grid>
      <Grid item xs={2}></Grid>
      {showMEPlus ? (
        <Grid item xs={12}>
          <Form getTrans={getTrans} type={'Add'} />
        </Grid>
      ) : (
        ''
      )}
      {showMEMinus ? (
        <Grid item xs={12}>
          <Form getTrans={getTrans} type={'Minus'} />
        </Grid>
      ) : (
        ''
      )}
    </Grid>
  );
}

export default Functions;
