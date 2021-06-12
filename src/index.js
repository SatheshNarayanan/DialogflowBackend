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
    const payload = {
      messages: [
        {
          payload: {
            messages: [
              {
                speech: 'here are some quick links for your convenience.',
                linkmessage: [{
                  message: 'google',
                  link: 'www.google.com'
                }, {
                  message: 'yahoo',
                  link: 'www.yahoo.co.in'
                }],
                button: [{
                  buttonname: 'more page'
                }]
              }
            ]
          }
        }
      ]
    };
        
      agent.add( new dfff.Payload(agent.UNSPECIFIED, payload, {sendAsMessage : true, rawPayload : false}))
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


