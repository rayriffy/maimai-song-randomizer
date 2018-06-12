'use strict';

const { dialogflow } = require('actions-on-google');
const { Image, Suggestions, LinkOutSuggestion, BrowseCarousel, BrowseCarouselItem, SimpleResponse } = require('actions-on-google');
const request = require('request')
const bodyParser = require('body-parser');
const express = require('express');
const rp = require('request-promise');

const app = dialogflow({debug: false});

app.intent('random-niconico', (conv) => {
  console.log('\x1b[33minfo:\x1b[0m Hit niconico & VOCALOID intent');
  var options = {
    uri: 'http://maimaibot.local/nico.json',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
  };
  return rp(options)
        .then(detail => showCardorSpeak(detail, conv))
        .then(p => Promise.all(p))
        .catch(p => console.log('\x1b[31merror:\x1b[0m '+ p));

});
app.intent('random-anime', (conv) => {
  console.log('\x1b[33minfo:\x1b[0m Hit POPS & ANIME intent');
  var options = {
    uri: 'http://maimaibot.local/pops.json',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
  };
  return rp(options)
        .then(detail => showCardorSpeak(detail, conv))
        .then(p => Promise.all(p))
        .catch(p => console.log('\x1b[31merror:\x1b[0m '+ p));

});
app.intent('random-original', (conv) => {
  console.log('\x1b[33minfo:\x1b[0m Hit ORIGINAL & JOYPOLIS intent');
  var options = {
    uri: 'http://maimaibot.local/orig.json',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
  };
  return rp(options)
        .then(detail => showCardorSpeak(detail, conv))
        .then(p => Promise.all(p))
        .catch(p => console.log('\x1b[31merror:\x1b[0m '+ p));

});
app.intent('random-sega', (conv) => {
  console.log('\x1b[33minfo:\x1b[0m Hit SEGA intent');
  var options = {
    uri: 'http://maimaibot.local/sega.json',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
  };
  return rp(options)
        .then(detail => showCardorSpeak(detail, conv))
        .then(p => Promise.all(p))
        .catch(p => console.log('\x1b[31merror:\x1b[0m '+ p));

});
app.intent('random-game', (conv) => {
  console.log('\x1b[33minfo:\x1b[0m Hit GAMES & VARIETY intent');
  var options = {
    uri: 'http://maimaibot.local/game.json',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
  };
  return rp(options)
        .then(detail => showCardorSpeak(detail, conv))
        .then(p => Promise.all(p))
        .catch(err => console.log('\x1b[31merror:\x1b[0m '+ err));

});
app.intent('random-touhou', (conv) => {
  console.log('\x1b[33minfo:\x1b[0m Hit TOUHOU Project intent');
  var options = {
    uri: 'http://maimaibot.local/toho.json',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
  };
  return rp(options)
        .then(detail => showCardorSpeak(detail, conv))
        .then(p => Promise.all(p))
        .catch(p => console.log('\x1b[31merror:\x1b[0m '+ p));

});
app.intent('Welcome', (conv) => {
  console.log('\x1b[33minfo:\x1b[0m Hit welcome intent');
  conv.ask(new SimpleResponse({
    speech: "<speak><s>Hello</s><break time='400ms'/><s>I will help you to choose a perfect song to play<break time='600ms'/>Tell me<break time='200ms'/>what category do you want to play</s></speak>",
    text: "Hello, I'm your assistant to help you choosing song to play. Just tell me what category do you want to play.",
  }));
  conv.ask(new Suggestions(['Cancel', 'POPS & ANIME', 'niconico & VOCALOID', 'TOUHOU Project','SEGA','GAME & VARIETY','ORIGINAL & JOYPOLIS']));
});
app.intent('end', (conv) => {
  console.log('\x1b[33minfo:\x1b[0m Hit end intent');
  conv.close(new SimpleResponse({
    speech: "<speak><s>Okay!</s><break time='150ms' /><s>I hope you can find a good song to play there.</s><break time='300ms' /><s>Happy gaming!</s></speak>",
    text: "Okay! I hope you can find a good song to play there... Happy gaming!",
  }));
});

function showCardorSpeak(detail,conv) {
  var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
  if (hasScreen) {
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
      action_rlock_text=" Some of them are region locked.";
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
  } else {
    let speak = "<speak><p>";
    for(var i = 0; i < detail.length; i++) {
      speak += "<s><say-as interpret-as='ordinal'>" + (i+1) + "</say-as>.<break time='600ms'/>" + detail[i].name_en + ".</s><break time='500ms'/>";
    }
    speak += "<s>Which category do you want to random again?</s></p></speak>";
    conv.ask(speak);
  }
  return;
}

express().use(bodyParser.json(), app).listen(3000);
