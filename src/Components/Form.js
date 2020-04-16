import React from 'react';

import { makeStyles, withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, Input } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import BasicDatePicker from './FormDate';
import UploadButtons from './FormUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '20ch',
    },
  },
  grid: {
    marginBottom: 8,
  },
  end: { margin: 5 },
}));

const banks = [
  {
    name: 'OsharHyal',
  },
  { name: 'Leomi' },
  { name: 'Hapoalim' },
];
const currencies = [
  {
    value: 'ILS',
    label: '₪',
  },
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export default function Form(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('3900');
  const [bank, setBank] = React.useState('OsharHyal');
  const [currency, setCurrency] = React.useState('ILS');
  const [subject, setSubject] = React.useState('House');
  const [type, setType] = React.useState(props.type);
  const [file, setFile] = React.useState('null');
  const [timeHour, setTimeHour] = React.useState(new Date());
  const [timeDate, setDate] = React.useState(new Date());
  const [timeDateNow, setTimeDateNow] = React.useState(new Date());

  const updateFile = (file) => {
    setFile(file);
    return false;
  };
  const updateHour = (hour) => {
    setTimeHour(hour.getHours());
  };
  const updateDate = (item) => {
    setDate(item);
  };
  const updateDateNow = (date) => {
    setTimeDateNow(date);
  };

  const handleCurrency = (event) => {
    setCurrency(event.target.value);
  };
  const handleBank = (event) => {
    setBank(event.target.value);
  };
  const handleAmount = (event) => {
    setValue(event.target.value);
  };
  const handleSubject = (event) => {
    setSubject(event.target.value);
  };
  const handleType = (event) => {
    setType(event.target.value);
  };

  const send = (event) => {
    const transaction = {
      amount: value,
      currency: currency,
      bank: bank,
      subject: subject,
      type: type,
      timeDate: timeDate,
      timeHour: timeHour,
      timeDateNow: timeDateNow,
      file: file,
    };
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    };
    fetch('http://localhost:8000/saveData', requestOptions).then((res) => {
      // then print response status
      console.log('sucsess');
    });
    props.getTrans(transaction);
  };

  return (
    <Grid container className={classes.grid}>
      <Grid item xs={12}>
        <form
          className={classes.root}
          noValidate
          onSubmit={send}
          autoComplete='off'
        >
          <Grid item xs={12}>
            <div>
              <TextField
                id='standard-multiline-flexible'
                label='Amount'
                multiline
                rowsMax='4'
                value={value}
                onChange={handleAmount}
              />
              <TextField
                id='standard-select-currency'
                select
                label='Select'
                value={currency}
                onChange={handleCurrency}
                helperText='Please select your currency'
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id='standard-select-currency'
                select
                label='Select'
                value={bank}
                onChange={handleBank}
                helperText='Please select your Bank'
              >
                {banks.map((bank) => (
                  <MenuItem key={bank.name} value={bank.name}>
                    {bank.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id='standard-textarea'
                label='Subject of Amount'
                placeholder='Placeholder'
                multiline
                onChange={handleSubject}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <TextField
                disabled
                id='standard-multiline-flexible'
                label='Type'
                multiline
                rowsMax='4'
                value={props.type}
                onChange={handleType}
              />
              {/* <BasicDatePicker /> */}
              <BasicDatePicker
                updateHour={updateHour}
                updateDate={updateDate}
                updateDateNow={updateDateNow}
              />
            </div>
          </Grid>
          <Grid container className={classes.end}>
            <Grid item xs={4}></Grid>
            <UploadButtons updateFile={updateFile} />

            <Grid item xs={4}>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => {
                  send();
                  return false;
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid container></Grid>
        </form>
      </Grid>
    </Grid>

    /* <div>
            <TextField
              id='filled-multiline-flexible'
              label='Multiline'
              multiline
              rowsMax='4'
              value={value}
              onChange={handleChange}
              variant='filled'
            />
            <TextField
              id='filled-textarea'
              label='Multiline Placeholder'
              placeholder='Placeholder'
              multiline
              variant='filled'
            />
            <TextField
              id='filled-multiline-static'
              label='Multiline'
              multiline
              rows='4'
              defaultValue='Default Value'
              variant='filled'
            />
          </div> */
  );
}
