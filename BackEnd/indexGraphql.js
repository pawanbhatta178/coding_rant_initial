const express =require('express');
const  { graphqlHTTP } = require('express-graphql');
 const bodyParser = require('body-parser');
const persistToFile=require('./persistToFile');
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
const helmetConfig=require('./helmetConfig');
const PORT=4000; 
const schema=require("./schema/codeSchema");
const { json } = require('body-parser');
const {getChallengeById, getHintsById,addChallenge, addChallengeAndHints}=require("./models/Challenge")
//all the middlewares in use
app.use(helmet(helmetConfig));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieSession({
  maxAge:24*60*60*1000,//a day
  keys:[session.cookieKey]//this key encrypts cookie and therefore becomes a signed cookie
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);


// Testing the pool connection to postgres database
pool.query('SELECT NOW()').then(({rows})=>{
    console.log("Executing SELECT NOW()->",rows);
}).catch(err=>{
    console.log("Pool connection fails with ERROR:\n",err);
});


//serving static files
app.get('/',(req,res)=>{
    res.send('hello world')
})


//graphql starts here. GRAPHQL allows for much easier and manged API than restful API
//therefore, all post request will be directed at graphql endpoints


const root = {
  hello:(args,request)=>{
  return args.name
  }, 
  submit:  async (args, request) =>{
  const {test,perf, err, cons}=await persistToFile(args.input.code, args.input.lang);
     return {
         id:"asdasdsad",
         code:args.input.code,
         lang:args.input.lang,
         performance:perf,
         error:err,
         console:cons,
         result:test
     }
  },
   compile:(args,request)=>{
    return {
        id:"asdasdsad",
        code:args.input.code,
        lang:args.input.lang,
        console:args.input.cons
    }
  },
  challenge: async (args, request) => {
    const challengeObj = await getChallengeById(args.id);
    return challengeObj;
  },
  hint: async(args, request, parent) => {
    const hintArray = await getHintsById(args.id);
    return hintArray;
  },
  addChallenge: async (args, request) => {
    const z = await addChallenge(args.input);
    console.log(z);
    return true
  },
  addChallengeAndHints: async(args, request) => {
    const a = await addChallengeAndHints(args.input);
    console.log(a);
    return true;
  },
  getChallengeAndHints: async (args, request) => {
    const challenge=await getChallengeById(args.id);
    const hints = await getHintsById(args.id);
    console.log(challenge);
    console.log(hints);
    return {
      ...challenge,
      hints:[...hints]
    }
  }
};


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,//This will point at jS Object that has all the resolvers in it
  graphiql: !process.env.NODE_ENV,//process.env.NODE_ENV will have value when in production
}));


app.listen(process.env.PORT||PORT);
console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
