import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AttachFile from '@material-ui/icons/AttachFile';
import { green } from '@material-ui/core/colors';
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';
import Description from '@material-ui/icons/Description';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
    },
  },
  input: {
    display: 'none',
  },
  circle: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function UploadButtons(props) {
  const classes = useStyles();
  const [showDone, setShowDone] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [file, setFile] = React.useState(null);
  const [upload, setUpload] = React.useState(null);
  const [loaded, setloaded] = React.useState(0);
  const chooseFile = (e) => {
    // console.warn(e.target.files);
    let file = e.target.files;
    setUpload(file[0]);
    // click();
  };

  const click = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', upload);
    console.log(data);
    axios
      .post('http://localhost:8000/upload', data, {
        // receive two    parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status

        setFile(res.data.filename);
        console.log(res.data.filename);
        props.updateFile(res.data.filename);
        setShowDone(true);
      });
    return false;
  };

  const click2 = () => {
    const data = new FormData();
    data.append('file', upload);
    // console.log(data);
    setFile('dhdjdjh');

    axios
      .post('http://localhost:8000/upload', data, {
        // receive two    parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status

        setFile(res.data.filename);
        console.log(res.data.filename);
        props.updateFile(res.data.filename);
        setShowDone(true);
        // res.send({ result: true });
      });
  };
  return (
    // <Grid item xs={1}>
    //   </Grid>
    <Grid item xs={4}>
      {showDone ? (
        <DoneIcon fontSize='large' style={{ color: green[500] }} />
      ) : (
        ''
      )}

      <input
        accept='image/*'
        className={classes.input}
        id='contained-button-file'
        multiple
        // type='file'
      />
      <label htmlFor='contained-button-file'>
        {/* <CircularProgress
          variant='determinate'
          value={progress}
          color='secondary'
        /> */}
        <Button
          variant='contained'
          color='primary'
          component='span'
          onClick={click2}
        >
          Upload
        </Button>
        {/* <button
          type='button'
          // onClick={e => {
          //   click(e);
          //   return false;
          // }}
          onClick={click2}
        >
          Upload
        </button>
        <input type='button' onClick={click2} value='Click Me'></input> */}
      </label>

      <input
        // accept='*.pdf'
        className={classes.input}
        id='icon-button-file'
        type='file'
        onChange={(e) => {
          chooseFile(e);
        }}
        // accept='image/*'

        accept='application/pdf'
        name='file'
      />
      <label htmlFor='icon-button-file'>
        <IconButton
          color='primary'
          aria-label='upload picture'
          component='span'
        >
          <Description />
        </IconButton>
      </label>
    </Grid>
  );
}
