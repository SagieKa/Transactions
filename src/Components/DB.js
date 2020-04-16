const data = [
  {
    amount: 3000,
    currency: 'ILS',
    bank: '2017',
    subject: '34',
    type: 'Add',
    timeDate: new Date('Sat Apr 04 2020 15:49:32 GMT+0300 (שעון ישראל (קיץ))'),
    timeHour: new Date('Sat Apr 04 2020 15:49:32 GMT+0300 (שעון ישראל (קיץ))'),
    timeDateNow: new Date(
      'Sat Apr 04 2020 15:49:32 GMT+0300 (שעון ישראל (קיץ))'
    ),
    file: '1586004697455-הנחיות להגשת עבודה.pdf',
  },
  {
    amount: 5555,
    currency: 'ILS',
    bank: 'Leomi',
    subject: 'MOTEK',
    type: 'Add',
    timeDate: new Date('Sat Apr 04 2020 15:49:32 GMT+0300 (שעון ישראל (קיץ))'),
    timeHour: new Date('Sat Apr 04 2020 15:49:32 GMT+0300 (שעון ישראל (קיץ))'),
    timeDateNow: new Date(
      'Sat Apr 04 2020 15:49:32 GMT+0300 (שעון ישראל (קיץ))'
    ),
    file: '1586004697455.pdf',
  },
];

const columns = [
  { title: 'Type', field: 'type' },
  { title: 'Subject', field: 'subject' },
  { title: 'Amount', field: 'amount' },
  { title: 'Currency', field: 'currency' },
  { title: 'Time of Transaction', field: 'timeDate', type: 'date' },
  { title: 'Time of Hour Transaction', field: 'timeHour', type: 'date' },
  { title: 'Date', field: 'timeDateNow', type: 'date' },
  { title: 'File', field: 'file' },
];
const result = [data, columns];

// export default result;
module.exports = {
  data: data,
  columns: columns,
};
