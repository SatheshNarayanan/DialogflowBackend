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
    const error = errorType?.parameters?.errorTypes;
    //if (error.includes("supplier") && error.includes("invalid"))
    const payload = {
      "richContent": [
        [
          {
            "type": "list",
            "title": "It may not be mapped to any supplier group",
            "subtitle": "Check if the Supplier is mapped to any Supplier group or not",
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
            "title": "Effective date of the supplier may be closed",
            "subtitle": "Go to 'Account rule defenition -> Suppleir account defenition' and check if the effective to date is closed",
            "event": {
              "name": "",
              "languageCode": "",
              "parameters": {}
            }
          },
          {
            "type": "info",
            "title": "I hope you find these solutions useful!!",
            "subtitle": "If you do you want me to inform the technical team regarding this issue?",
            "actionLink": "https://cloud.google.com/dialogflow/docs"
          },
          {
            "type": "chips",
            "options": [
              {
                "text": "No",
              },
              {
                "text": "Yes please..",
              }
            ]
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


