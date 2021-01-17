const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const cors = require("cors");

const schema = require("./schema.js");
//app init
const app = express();

//graphql
app.use(cors())
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

//server running
app.listen(4000, () => console.log(`Example app listening on port port!`));
