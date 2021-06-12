const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const dfff = require("dialogflow-fulfillment");

const app = express();

app.post("/", express.json(), (request, response) => {
  const agent = dfff.WebhookClient({
    request,
    response
  });

  function sendingResponse(agent) {
    agent.add("sending response from webhook server");
  }
  const intentMap = new Map();

  intentMap.set("issues", sendingResponse);

  agent.handleRequest(intentMap);
});

app.get("/", (request, response) => {
  response.send("Hello");
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is up and running!!");
});
