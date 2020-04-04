const express = require("express");
const kickboxAPIKeyProduction = "live_f7a345892a550028cbe5183ade670378340e723662028fc84bbbbd9f139d823c";

//use this if you want to test with sandbox and not use Kickbox credits
const kickboxAPIKeySandbox ="test_a0a295517414130d5d1a624ceecc76bedcd17468e8d08d8ae4e13924020c613e";

const kickbox = require("kickbox").client(kickboxAPIKeyProduction).kickbox();
const cors = require("cors");

const setupAPIServer = () => {
  const app = express();

  app.listen(3001, () => {});

  app.use(cors());

  app.get("/VerifyEmail", (request, response) => 
  {
    kickbox.verify(request.query.email, (error, kickboxResponse) => 
    {
      response.send(kickboxResponse.body);
    });
  });
}

setupAPIServer();