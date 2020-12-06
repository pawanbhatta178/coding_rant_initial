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

type Challenge{
  id:ID!
  questionPrompt:String!
  sampleInput:String!
  sampleOutput:String!
  difficulty:String!
  title:String!
  hints:[Hint]
}
type ChallengeAndHints{
  id:ID!
  questionPrompt:String!
  sampleInput:String!
  sampleOutput:String!
  difficulty:String!
  title:String!
  hints:[Hint]!
}

type Hint{
  challengeId: ID!
  hintId:ID!
  hintDescription:String!
}



input ChallengeInput{
  questionPrompt:String!
  sampleInput:String!
  sampleOutput:String!
  difficulty:Int!
  title:String!
}

input ChallengeAndHintsInput{
  questionPrompt:String!
  sampleInput:String!
  sampleOutput:String!
  difficulty:Int!
  title:String!
  hints:[String!]!
}




type Query{
  hello(name:String!):String!
  challenge(id:ID!):Challenge!
  hint(id:ID!):[Hint]
  getChallengeAndHints(id:ID!):ChallengeAndHints!
}


type Mutation{
  submit(input:SubmissionInput):SubmissionResponse
  compile(input:SubmissionInput):CompileResponse
  addChallenge(input:ChallengeInput):Boolean!
  addChallengeAndHints(input:ChallengeAndHintsInput):Boolean!
}


`);

module.exports=schema;