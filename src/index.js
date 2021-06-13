const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const dfff = require("dialogflow-fulfillment");
const { platform } = require("os");

const app = express();

app.post("/", express.json(), (request, response) => {
  const agent = new dfff.WebhookClient({
    request: request,
    response: response
  });
  // console.log("---------------------------------------------")
  // console.log(request?.body?.queryResult, request?.body?.originalDetectIntentRequest)
  // console.log("---------------------------------------------")

  function sendingResponse(agent) {
    agent.add("sending response from webhook server");
  }
  function customPayload(agent){

    const errorType = agent.context.get("awaiting_errortypes")
    console.log("---------------------------------------------")
    console.log(errorType)
    console.log("---------------------------------------------")
    const payload = {
      "richContent": [
        [
          {
            "type": "list",
            "title": "List item 1 title",
            "subtitle": "List item 1 subtitle",
            "event": {
              "name": "",
              "languageCode": "",
              "parameters": {}
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "list",
            "title": "List item 2 title",
            "subtitle": "List item 2 subtitle",
            "event": {
              "name": "",
              "languageCode": "",
              "parameters": {}
            }
          }
        ]
      ]
    }
        
      agent.add( new dfff.Payload(agent.UNSPECIFIED, payload, {sendAsMessage : true, rawPayload : true}))
    }

  const intentMap = new Map();

  intentMap.set("issues", customPayload);

  // console.log("---------------------------------------------")
  // console.log(response)
  // console.log("---------------------------------------------")

  agent.handleRequest(intentMap);
});

app.get("/", (request, response) => {
  response.send("Hello");
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is up and running!!");
});


