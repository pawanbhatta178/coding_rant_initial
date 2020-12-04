const { buildSchema } = require('graphql');


const schema = buildSchema(`

input SubmissionInput {
  code: String!
  lang: Lang!
}

type Submission{
  id: ID
  code: String!
  lang: Lang!
}

type SubmissionResponse{
  id:ID
  code:String!
  lang:Lang!
  test:String!
  error:String
  result:String
  performance:String
  console:String
}

type CompileResponse{
code:String!
lang:Lang!
error:String
console:String
}


enum Lang{
js
c
}

type Query{
  hello(name:String!):String!
}


type Mutation{
  submit(input:SubmissionInput):SubmissionResponse
  compile(input:SubmissionInput):CompileResponse
}


`);

module.exports=schema;