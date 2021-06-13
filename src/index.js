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

  function sendingResponse(agent) {
    agent.add("sending response from webhook server");
  }
  function customPayload(agent){
    const errorType = agent.context.get("awaiting_errortypes")
    const error = errorType?.parameters?.errorTypes.toLowerCase();
    console.log("---------------------------------------------------")
    console.log(errorType)
    console.log("---------------------------------------------------")
    let payload = {}
    if (error.includes("supplier") && (error.includes("invalid")|| error.includes("error") )){
      payload = {
      "richContent": [
        [
          {
            "type": "accordion",
            "title": "Supplier group mapping issue",
            "subtitle": "Need to check the Supplier group Mapping",
            "text" : "The Supplier may not be mapped to any Supplier group"
          },
          {
            "type": "divider"
          },
          {
            "type": "accordion",
            "title": "Supplier may not be effective",
            "subtitle": "Need to check if the Supplier is still effective or not",
            "text" : "You can check the effective date of the supplier by traversing down the following path 'Account rule defenition -> Suppleir account defenition'"
          },
          {
            "type": "divider"
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
    } else if (error.includes("invoice") && (error.includes("creation") || error.includes("error")) ){
      payload = {
        "richContent": [
          [
            {
              "type": "accordion",
              "title": "HSN code",
              "subtitle": "Need to check if HSN code is provided for the item",
              "text" : "You can check HSN code against the item in 'Global Tax Solutions -> Edit Tax Group'"
            },
            {
              "type": "divider"
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
    } else if (error.includes("trd") || error.includes("tcal") || error.includes("tds")){
      payload = {
        "richContent": [
          [
            {
              "type": "accordion",
              "title": "Tax Group mapping",
              "subtitle": "Need to check the Tax group Mapping for the item",
              "text" : "You can check the effective date of the supplier by traversing down the following path 'Global Tax Soluitions -> Edit Tax Group'"
            },
            {
              "type": "divider"
            },
            {
              "type": "accordion",
              "title": "Tax category based on Tax Region",
              "subtitle": "Need to check Tax Region provided",
              "text" : "If 'Tax Region' is 'interstate', you should select 'Supplier tax Region' in 'Tax Category' if not you can select 'Own tax Region'"
            },
            {
              "type": "divider"
            },
            {
              "type": "accordion",
              "title": "Tax rule Defenition",
              "subtitle": "Need to check Tax Rule defenition for the item",
              "text" : "You can check the Tax rule defenition in 'Tax rule Defenition ->View Tax Rule Engine/Create Tax Rule Engine'"
            },
            {
              "type": "divider"
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
    } else {
      payload = {
        "richContent": [
          [
            {
              "type": "info",
              "title": "I'm not sure about the issue",
              "subtitle": "Let me get some help from the technical team regarding this. Is it fine??",
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
    }
    
        
      agent.add( new dfff.Payload(agent.UNSPECIFIED, payload, {sendAsMessage : true, rawPayload : true}))
    }

  const intentMap = new Map();

  intentMap.set("issues", customPayload);

  agent.handleRequest(intentMap);
});

app.get("/", (request, response) => {
  response.send("Hello");
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is up and running!!");
});


