require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const userRouter = require('./routes/users')
app.use('/users', userRouter)

app.set('port', process.env.port || 3050) 

app.listen(app.get('port'), server =>{
    console.info(`Server listen on port ${app.get('port')}`);
})