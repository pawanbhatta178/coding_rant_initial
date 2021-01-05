const express =require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
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
const { getChallengeByWeek, getTestCasesForChallenge} = require('./models/Challenge');
const toPrimitiveIfPossible = require('./util/toPrimitiveIfPossible');
const port=4000; 
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
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


app.get('/', (req, res) => {
    res.send('this is the server running. It only accepts post request.');
})


//middleware that does authentication business goes here


app.post('/question', async (req, res) => {
    console.log('Got body:', req.body);
    if(!req.body.week){
        return res.status(400).send("Cannot process this request");
    }
    let data = await getChallengeByWeek({ week:req.body.week});
    res.send(data);
});


app.post('/compile',async (req, res) => {
    console.log('Got body:', req.body);
    //sanitize the received data
    if(!req.body.code || req.body.lang!=="js"){
        return res.status(400).send("Cannot process this request");
    }
    let testCases = await getTestCasesForChallenge({ id: req.body.questionId });
    console.log(testCases);
    if (testCases.length== 0) {
        return res.status(400).send("Cannot process this request");
    }

    const tests = testCases.map(testCase => {
        return {
            id: testCase.testId,
            input: toPrimitiveIfPossible(testCase.testInput),
            expectedOutput: toPrimitiveIfPossible(testCase.expectedOutput)
        }
    })

    let data = await runCodeInIsolation(
        {
            code: req.body.code,
            lang: req.body.lang,
            tests
        }
    );
    res.send(data);
});

app.listen(process.env.PORT|| port,()=>{
    console.log(`listening at port ${port}`)
})