const express =require('express');
const  { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
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


//all the middlewares in use
app.use(helmet(helmetConfig));
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
const schema = buildSchema(`
  type Query {
    currentUser: User
  }
  type User{
      id:String
      displayName:String
      name:String
      country:String
  }
`);
 


const root = {
  currentUser: function (args, request) {
      if(request.user) return request.user;
      else return;
  }
};


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: !process.env.NODE_ENV,//process.env.NODE_ENV will have value when in production
}));


app.listen(process.env.PORT||PORT);
console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
