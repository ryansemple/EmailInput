const express = require('express');
const KickboxAPIKey = "test_a0a295517414130d5d1a624ceecc76bedcd17468e8d08d8ae4e13924020c613e";
const kickbox = require('kickbox').client(KickboxAPIKey).kickbox();
const cors = require('cors');

const setupAPIServer = () => {
  const app = express();

  app.listen(3001, () => {});

  app.use(cors());

  app.get('/VerifyEmail', (request, response) => 
  {
    kickbox.verify(request.query.email, (error, kickboxResponse) => 
    {
      response.send(kickboxResponse.body);
    });
  });
}

setupAPIServer();