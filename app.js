const express = require('express');
const connectDB = require('./config/db');
const sUrl = require('./model/Url')



const PORT = 3000;

const app = express();
app.use(express.json({extended: false}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
connectDB();


// Define  routes

// app.use('/', require('./routes/index'));
// app.use('/api/url', require('./routes/url'));

var currFull='';
app.get('/',   (req, res) => {
  // const shortURLs =  await sUrl.find({fullUrl:currFull})
  console.log('This is curr ' + `${currFull}`);


  sUrl.findOne({longUrl:currFull},(err, found)=> {
    if(found)
    {
      console.log('This is found ' + found);
      res.render('index', {
        shortURL: found
      });
    }
    else{
      const temp={
        longUrl:'',
        shortUrl:'',
        clicks: 0
      }
      res.render('index',{
        shortURL: temp
      });
    }
  })


  // if(shortURLs)
  // {
  //   res.render('index', {
  //     shortURL: shortURLs
  //   });
  // }
  // else{
  //   const temp={
  //     longUrl:'',
  //     shortUrl:'',
  //     clicks: 0
  //   }
  //   res.render('index',{
  //     shortURL: temp
  //   });
  // }

});


app.post('/shortUrls',  (req, res)=>{
  currFull = req.body.fullUrl;
  sUrl.findOne({longUrl: currFull}, async (err, found)=>{
    if(found)
    {
      console.log('This is found '+ found);
    }
    else
    {
      await sUrl.create({longUrl: req.body.fullUrl});
    }
  });
  // console.log('this is temp '+ temp);
  // if(!temp)
  // {
  //   await sUrl.create({longUrl: req.body.fullUrl});
  // }

  res.redirect('/');
});

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`);
})
