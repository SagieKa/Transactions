const mongoose = require('mongoose');

const transaction = new mongoose.Schema({
  type: { type: String },
  subject: { type: String },
  amount: { type: Number },
  currency: { type: String },
  timeDate: { type: Date },
  timeHour: { type: Date },
  timeDateNow: { type: Date },
  file: { type: String },
});

module.exports = Transaction = mongoose.model('transactions', transaction);
