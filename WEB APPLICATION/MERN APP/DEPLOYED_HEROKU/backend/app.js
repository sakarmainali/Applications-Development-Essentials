const fs = require('fs');
const path = require('path');
const cookieSession=require('cookie-session');
const passport= require('passport');
const express = require('express');
const mongoose = require('mongoose');


const summaryRoutes=require('./routes/summary-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');



require('./utils/passport');
require('./models/user');

//

mongoose
  .connect(
    `${process.env.MONGO_URI}`,
     {useNewUrlParser:true}
  )


const app = express();

//app.set('trust proxy', 1);

// Configure App

app.use(
  cookieSession({
    maxAge: 25 * 3600 * 1000, // 25 hours of milliseconds
    keys: [process.env.COOKIE_KEY],
    proxy: true
  })
);

app.use(express.json()); // body-parser is no longer required

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use(express.static(path.join('public')));



app.use(passport.initialize());
app.use(passport.session());

require('./routes/authroutes')(app);





/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});
 */


app.use('/api/summary',summaryRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname,'public','index.html'));
});



/* 
//handing unknown request
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});
 */

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});




const PORT = process.env.PORT || 5000;
app.listen(PORT);
