const express = require('express');
const connectDB = require('./config/db');



const PORT = 3000

const app = express();
app.use(express.json({extended: false}));

connectDB();


// Define  routes

app.use('/', require('./routes/index'));
app.use('/api/url', require('/routes/url'));

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`);
})
