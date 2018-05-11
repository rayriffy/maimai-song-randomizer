'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
const { SimpleResponse,BrowseCarousel,BrowseCarouselItem,Image } = require('actions-on-google');
process.env.DEBUG = 'dialogflow:debug';

var result=["Here's the result","There it is.","Here you go","I got it!","Gotcha!"];

var admin = require("firebase-admin");
admin.initializeApp({
  databaseURL: "https://maimai-bot.firebaseio.com/"
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function randomnico(agent) {
    return admin.firestore().doc('nicovocaloid/'+ Math.floor(Math.random()*134)).get().then(doc => {
      if(!doc.exists) {
        console.log('ERR: No Document!');
      }
      else {
        console.log('Document Found! >> ',doc.data().name.en);
        if(doc.data().regionlocked==true) {
          agent.add(result[Math.floor(Math.random()*result.length)]+` This is a region locked content`);
        } else {
          agent.add(result[Math.floor(Math.random()*result.length)]);
        }
        agent.add(new Card({
          title: doc.data().name.en,
          imageUrl: doc.data().image_url,
          text: 'Author: ' + doc.data().artist.en + '\nIntroduced on: '+ doc.data().version,
          buttonText: 'Listen on YouTube',
          buttonUrl: doc.data().listen.youtube
        }));
        agent.add(new Suggestion(`Cancel`));
        agent.add(new Suggestion(`POPS & ANIME`));
        agent.add(new Suggestion(`niconico & VOCALOID`));
        agent.add(new Suggestion(`TOUHOU Project`));
        agent.add(new Suggestion(`SEGA`));
        agent.add(new Suggestion(`GAME & VARIETY`));
        agent.add(new Suggestion(`ORIGINAL & JOYPOLIS`));
      }
    }).catch(err => {
      console.log('Error getting document ',err);
    });
  }

  function randomtouhou(agent) {
    return admin.firestore().doc('touhou/'+ Math.floor(Math.random()*62)).get().then(doc => {
      if(!doc.exists) {
        console.log('ERR: No Document!');
      }
      else {
        console.log('Document Found! >> ',doc.data().name.en);
        if(doc.data().regionlocked==true) {
          agent.add(result[Math.floor(Math.random()*result.length)]+` This is a region locked content`);
        } else {
          agent.add(result[Math.floor(Math.random()*result.length)]);
        }
        agent.add(new Card({
          title: doc.data().name.en,
          imageUrl: doc.data().image_url,
          text: 'Author: ' + doc.data().artist.en + '\nIntroduced on: '+ doc.data().version,
          buttonText: 'Listen on YouTube',
          buttonUrl: doc.data().listen.youtube
        }));
        agent.add(new Suggestion(`Cancel`));
        agent.add(new Suggestion(`POPS & ANIME`));
        agent.add(new Suggestion(`niconico & VOCALOID`));
        agent.add(new Suggestion(`TOUHOU Project`));
        agent.add(new Suggestion(`SEGA`));
        agent.add(new Suggestion(`GAME & VARIETY`));
        agent.add(new Suggestion(`ORIGINAL & JOYPOLIS`));
      }
    }).catch(err => {
      console.log('Error getting document ',err);
    });
  }

  function randomgame(agent) {
    return admin.firestore().doc('game/'+ Math.floor(Math.random()*36)).get().then(doc => {
      if(!doc.exists) {
        console.log('ERR: No Document!');
      }
      else {
        console.log('Document Found! >> ',doc.data().name.en);
        if(doc.data().regionlocked==true) {
          agent.add(result[Math.floor(Math.random()*result.length)]+` This is a region locked content`);
        } else {
          agent.add(result[Math.floor(Math.random()*result.length)]);
        }
        agent.add(new Card({
          title: doc.data().name.en,
          imageUrl: doc.data().image_url,
          text: 'Author: ' + doc.data().artist.en + '\nIntroduced on: '+ doc.data().version,
          buttonText: 'Listen on YouTube',
          buttonUrl: doc.data().listen.youtube
        }));
        agent.add(new Suggestion(`Cancel`));
        agent.add(new Suggestion(`POPS & ANIME`));
        agent.add(new Suggestion(`niconico & VOCALOID`));
        agent.add(new Suggestion(`TOUHOU Project`));
        agent.add(new Suggestion(`SEGA`));
        agent.add(new Suggestion(`GAME & VARIETY`));
        agent.add(new Suggestion(`ORIGINAL & JOYPOLIS`));
      }
    }).catch(err => {
      console.log('Error getting document ',err);
    });
  }

  function randomsega(agent) {
    return admin.firestore().doc('sega/'+ Math.floor(Math.random()*61)).get().then(doc => {
      if(!doc.exists) {
        console.log('ERR: No Document!');
      }
      else {
        console.log('Document Found! >> ',doc.data().name.en);
        if(doc.data().regionlocked==true) {
          agent.add(result[Math.floor(Math.random()*result.length)]+` This is a region locked content`);
        } else {
          agent.add(result[Math.floor(Math.random()*result.length)]);
        }
        agent.add(new Card({
          title: doc.data().name.en,
          imageUrl: doc.data().image_url,
          text: 'Author: ' + doc.data().artist.en + '\nIntroduced on: '+ doc.data().version,
          buttonText: 'Listen on YouTube',
          buttonUrl: doc.data().listen.youtube
        }));
        agent.add(new Suggestion(`Cancel`));
        agent.add(new Suggestion(`POPS & ANIME`));
        agent.add(new Suggestion(`niconico & VOCALOID`));
        agent.add(new Suggestion(`TOUHOU Project`));
        agent.add(new Suggestion(`SEGA`));
        agent.add(new Suggestion(`GAME & VARIETY`));
        agent.add(new Suggestion(`ORIGINAL & JOYPOLIS`));
      }
    }).catch(err => {
      console.log('Error getting document ',err);
    });
  }

  function randomoriginal(agent) {
    return admin.firestore().doc('original/'+ Math.floor(Math.random()*0)).get().then(doc => {
      if(!doc.exists) {
        console.log('ERR: No Document!');
      }
      else {
        console.log('Document Found! >> ',doc.data().name.en);
        if(doc.data().regionlocked==true) {
          agent.add(result[Math.floor(Math.random()*result.length)]+` This is a region locked content`);
        } else {
          agent.add(result[Math.floor(Math.random()*result.length)]);
        }
        agent.add(new Card({
          title: doc.data().name.en,
          imageUrl: doc.data().image_url,
          text: 'Author: ' + doc.data().artist.en + '\nIntroduced on: '+ doc.data().version,
          buttonText: 'Listen on YouTube',
          buttonUrl: doc.data().listen.youtube
        }));
        agent.add(new Suggestion(`Cancel`));
        agent.add(new Suggestion(`POPS & ANIME`));
        agent.add(new Suggestion(`niconico & VOCALOID`));
        agent.add(new Suggestion(`TOUHOU Project`));
        agent.add(new Suggestion(`SEGA`));
        agent.add(new Suggestion(`GAME & VARIETY`));
        agent.add(new Suggestion(`ORIGINAL & JOYPOLIS`));
      }
    }).catch(err => {
      console.log('Error getting document ',err);
    });
  }

  function randomanime(agent) {
    return admin.firestore().doc('popanime/'+ Math.floor(Math.random()*0)).get().then(doc => {
      if(!doc.exists) {
        console.log('ERR: No Document!');
      }
      else {
        console.log('Document Found! >> ',doc.data().name.en);
        if(doc.data().regionlocked==true) {
          agent.add(result[Math.floor(Math.random()*result.length)]+` This is a region locked content`);
        } else {
          agent.add(result[Math.floor(Math.random()*result.length)]);
        }
        agent.add(new Card({
          title: doc.data().name.en,
          imageUrl: doc.data().image_url,
          text: 'Author: ' + doc.data().artist.en + '\nIntroduced on: '+ doc.data().version,
          buttonText: 'Listen on YouTube',
          buttonUrl: doc.data().listen.youtube
        }));
        agent.add(new Suggestion(`Cancel`));
        agent.add(new Suggestion(`POPS & ANIME`));
        agent.add(new Suggestion(`niconico & VOCALOID`));
        agent.add(new Suggestion(`TOUHOU Project`));
        agent.add(new Suggestion(`SEGA`));
        agent.add(new Suggestion(`GAME & VARIETY`));
        agent.add(new Suggestion(`ORIGINAL & JOYPOLIS`));
      }
    }).catch(err => {
      console.log('Error getting document ',err);
    });
  }

  function notavail(agent) {
      agent.add(`Sorry, but your request category is temporarily unavailable.`);
      agent.add(new Suggestion(`Cancel`));
      agent.add(new Suggestion(`POPS & ANIME`));
      agent.add(new Suggestion(`niconico & VOCALOID`));
      agent.add(new Suggestion(`TOUHOU Project`));
      agent.add(new Suggestion(`SEGA`));
      agent.add(new Suggestion(`GAME & VARIETY`));
      agent.add(new Suggestion(`ORIGINAL & JOYPOLIS`));
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('random-niconico', randomnico);
  intentMap.set('random-touhou', randomtouhou);
  intentMap.set('random-game', randomgame);
  intentMap.set('random-sega', randomsega);
  intentMap.set('random-original', randomoriginal);
  intentMap.set('random-anime', randomanime);
  // intentMap.set('<INTENT_NAME_HERE>', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
