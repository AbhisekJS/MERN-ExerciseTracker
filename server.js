//Import Dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

//initialize 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize the Mongoose ORM

const uri = process.env.MONGO_URI;
//connect to db
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Send Response
app.get('/',(req,res)=>{
    res.send('Yoo Hoo!!! API Ready To Serve')
})

//Import routes Files Here
const exerciseRouter = require('./routes/exercises')
const userRouter = require('./routes/users')

app.use('/api/exercises', exerciseRouter);
app.use('/api/users', userRouter);


//Listen To Port
app.listen(port, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port: ${port}`);
});
