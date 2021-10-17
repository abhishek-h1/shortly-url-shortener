const mongoose = require('mongoose');
// const config = require('config');

// const db = config.get('baseUrl');


const connectDB = async ()=> {
  try {
    await mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});
    console.log('MongoDB connected...');
  } catch(err) {
    console.error(err.message);
    process.exit(1);
  }
}


module.exports = connectDB;
