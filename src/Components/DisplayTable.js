import React from 'react';
import { useEffect } from 'react';
import MaterialTable from 'material-table';

const db = require('./DB');

export default function MaterialTableDemo(props) {
  var dataDb = [];
  const [state, setState] = React.useState({
    columns: db.columns,
    data: dataDb,
  });
  let requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  let requestOptionsPost = {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
  };
  useEffect(() => {
    fetch('http://localhost:8000/getData', requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dataDb = data.result;
        setState({ columns: db.columns, data: dataDb.reverse() });
      });
  }, []);

  useEffect(() => {
    console.log('hi i am in useafeect-table you change the props?');
    var arr = [...props.updateArr];
    arr.push(...state.data);
    setState({ columns: db.columns, data: arr });
  }, [props.updateArr]);

  return (
    <MaterialTable
      style={{
        borderRadius: '25px',
        padding: '20px',
        boxShadow: ' 0 4px 90px 0 rgba(0, 0, 0, 0.2)',
      }}
      icons={{
        Add: (props) => {
          return (
            <div>
              <i className='fa fa-plus'></i> add cheack
            </div>
          );
        },
      }}
      localization={{
        pagination: {
          labelDisplayedRows: '{count} of {to}-{from} ',
        },
      }}
      title='Transactions'
      columns={state.columns}
      data={state.data}
      options={{
        actionsColumnIndex: -1,

        rowStyle: (rowData) => {
          if (rowData.type === 'Add') {
            return {
              background:
                ' linear-gradient(90deg, rgba(190,255,224,1) 31%, rgba(250,255,253,0.7987570028011204) 100%)',
            };
          }
          if (rowData.type === 'Minus') {
            return {
              background:
                'linear-gradient( 89.5deg,  rgba(246,114,128,1) 0.2%, rgba(248,177,149,1) 90.6% )',
            };
          }

          return {};
        },
      }}
      actions={[
        {
          icon: 'save_alt',
          tooltip: 'Download File',
          onClick: (event, rowData) => {
            window.open(`http://localhost:8000/downloadFile/${rowData.file}`);
          },
        },
      ]}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  console.log('this is newdata:');
                  console.log(newData);
                  fetch('http://localhost:8000/updateData', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newData),
                  });
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                console.log(oldData);
                fetch(`http://localhost:8000/deleteData/${oldData._id}`, {
                  method: 'Delete',
                  headers: { 'Content-Type': 'application/json' },
                });
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
