const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport  = require('passport');
const db = require('./config/key').mongoUri;
const users = require('./routes/api/users.js');
const path = require('path');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api/users',users);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


mongoose.connect(db,{ useNewUrlParser: true }).then(()=> console.log("mongodb connected")).catch( err => console.log(err));
{ useNewUrlParser: true }
//passport middleware

app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

const port = process.env.PORT || 5000;

app.listen(port,()=> console.log(`Server is running on port ${port}`));