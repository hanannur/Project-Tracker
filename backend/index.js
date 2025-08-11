//require('dotenv').config();

const express=require('express');
const cors = require('cors');
const app=express();
const {port , appName} = require("./config/env");

// const PORT=process.env.PORT ;
// const APP_NAME=process.env.APP_NAME;

const projectRoutes=require ('./routes/projectRoutes')


//middleware
app.use(cors());
app.use(express.json());


app.use('/api/projects' , projectRoutes);


app.get('/' , (req,res)=>{
    res.send(`${appName} is running`);
});


app.listen(port ,()=>{
    console.log(`${appName} is running at http://localhost:${port}`)
});