var mongoose = require('mongoose');

const URI =
  'mongodb+srv://sagieka:Aa5561212@devconnector-wfz6a.mongodb.net/test?retryWrites=true&w=majority';

const connectDB = async () => {
  await mongoose.connect(
    URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    function (err, client) {
      //   var collection = client.db('test').collection('transactions');
    }
  );

  console.log('db connect');
};

module.exports = connectDB;
