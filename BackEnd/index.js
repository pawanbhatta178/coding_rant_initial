const express =require('express');
const bodyParser = require('body-parser');
const app=express();
const cors = require('cors');
const helmet = require("helmet");
const passport=require('passport');
const passportSetup=require('./config/passport-setup')
const authRoutes=require('./routes/authRoutes');
const profileRoutes=require('./routes/profileRoutes');
const cookieSession=require('cookie-session');
const {session}=require('./config/keys');
const authCheck=require('./authCheck');
const pool=require('./config/database');
const runCodeInIsolation = require('./runCodeInIsolation');
const port=4000; 
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieSession({
  maxAge:24*60*60*1000,//a day
  keys:[session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

//Testing the pool connection
pool.query('SELECT NOW()').then(({rows})=>{
    console.log("Executing SELECT NOW()->",rows);
}).catch(err=>{
    console.log("Pool connection fails with ERROR:\n",err);
});


app.get('/',(req,res)=>{
    res.send('hello world')//static file to homepage will be delivered
})


//middleware that does authentication business goes here

app.post('/compile',async (req, res) => {
    console.log('Got body:', req.body);
    //sanitize the received data
    if(!req.body.code || req.body.lang!=="js"){
        return res.status(400).send("Cannot process this request");
    }
    let data = await runCodeInIsolation({ code:req.body.code, lang:req.body.lang });
    res.send(data);
});

app.listen(process.env.PORT|| port,()=>{
    console.log(`listening at port ${port}`)
})