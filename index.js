const express = require("express")
const urlRoute = require('./routes/url')
const path = require('path')
const {connectMongoDB}= require('./connect')
const app = express()
app.use(express.json())



const PORT = 8001;
connectMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>{console.log('MongoDB connected')})
app.use('/url',urlRoute)

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`))