import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedHour, setSelectedHour] = React.useState(new Date());
  const [selectedDateChose, setSelectedDateChose] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
    props.updateDateNow(selectedDate);
  };
  const handleHourChange = date => {
    setSelectedHour(date);
    props.updateHour(selectedHour);
  };
  const handleDateChangeChose = date => {
    setSelectedDateChose(date);
    props.updateDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disabled
        disableToolbar
        variant='inline'
        format='MM/dd/yyyy'
        margin='normal'
        id='date-picker-inline'
        label='Date Today'
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
      <KeyboardDatePicker
        margin='normal'
        id='date-picker-dialog'
        label='Date Of Function'
        format='MM/dd/yyyy'
        value={selectedDateChose}
        onChange={handleDateChangeChose}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
      <KeyboardTimePicker
        margin='normal'
        id='time-picker'
        label='Time Of Function'
        value={selectedHour}
        onChange={handleHourChange}
        KeyboardButtonProps={{
          'aria-label': 'change time'
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
