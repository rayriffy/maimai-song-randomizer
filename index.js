'use strict';

const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');
const { Image, Suggestions, LinkOutSuggestion, BrowseCarousel, BrowseCarouselItem, SimpleResponse } = require('actions-on-google');
const request = require("request")
const rp = require('request-promise');

const app = dialogflow();



app.intent('random-niconico', (conv) => {
  var options = {
    uri: 'https://maimaibot.rayriffy.com/nico.json',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
  };
  return rp(options)
        .then(detail => showCard(detail, conv))
        .then(p => Promise.all(p))
        .catch(p => console.log("error: " + p));

});
app.intent('random-anime', (conv) => {
  var options = {
    uri: 'https://maimaibot.rayriffy.com/pops.json',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
  };
  return rp(options)
        .then(detail => showCard(detail, conv))
        .then(p => Promise.all(p))
        .catch(p => console.log("error: " + p));

});
app.intent('random-original', (conv) => {
  var options = {
    uri: 'https://maimaibot.rayriffy.com/orig.json',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
  };
  return rp(options)
        .then(detail => showCard(detail, conv))
        .then(p => Promise.all(p))
        .catch(p => console.log("error: " + p));

});
app.intent('random-sega', (conv) => {
  var options = {
    uri: 'https://maimaibot.rayriffy.com/sega.json',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
  };
  return rp(options)
        .then(detail => showCard(detail, conv))
        .then(p => Promise.all(p))
        .catch(p => console.log("error: " + p));

});
app.intent('random-game', (conv) => {
  var options = {
    uri: 'https://maimaibot.rayriffy.com/game.json',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
  };
  return rp(options)
        .then(detail => showCard(detail, conv))
        .then(p => Promise.all(p))
        .catch(p => console.log("error: " + p));

});
app.intent('random-touhou', (conv) => {
  var options = {
    uri: 'https://maimaibot.rayriffy.com/toho.json',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
  };
  return rp(options)
        .then(detail => showCard(detail, conv))
        .then(p => Promise.all(p))
        .catch(p => console.log("error: " + p));

});

function showCard(detail,conv) {
  console.log('SAMPLE: '+detail[0].name_en);
  var cards = [];
  var is_regionlocked=null;
  for(var i = 0; i < detail.length; i++) {
    if(detail[i].regionlocked==1) {
      is_regionlocked=1;
    }
    cards.push(new BrowseCarouselItem({
      title: detail[i].name_en,
      url: detail[i].listen_youtube,
      image: new Image({
        url: detail[i].image_url,
        alt: 'Image',
      }),
      description: 'Author: '+detail[i].artist_en+' | Introduced on: '+detail[i].version,
    }));
  }
  var action_rlock_text,action_rlock_speech;
  if(is_regionlocked==1) {
    action_rlock_text="Some of them are region locked.";
    action_rlock_speech="<break time='300ms'/>Some of them are region locked.";
  }
  else {
    action_rlock_text="";
    action_rlock_speech="";
  }
  conv.ask(new SimpleResponse({
    speech: '<speak>Here are the results.'+action_rlock_speech+'</speak>',
    text: "Here're the results."+action_rlock_text,
  }));
  conv.ask(new BrowseCarousel({items: cards}));
  conv.ask(new Suggestions(['Cancel', 'POPS & ANIME', 'niconico & VOCALOID', 'TOUHOU Project','SEGA','GAME & VARIETY','ORIGINAL & JOYPOLIS']));
  return;
}

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);