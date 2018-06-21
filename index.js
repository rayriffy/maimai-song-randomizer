'use strict';

/**
 *  GET NECESSARY LIBRARY
 */

const { dialogflow } = require('actions-on-google');
const { Image, Suggestions, LinkOutSuggestion, BrowseCarousel, BrowseCarouselItem, SimpleResponse } = require('actions-on-google');
const request = require('request')
const bodyParser = require('body-parser');
const express = require('express');
const rp = require('request-promise');
const i18n = require('i18n');
const wanakana = require('wanakana');

/**
 *  CONFIGURATION
 */ 

const config = {
  local: true,
  port: 3000
};

/**
 *  DEFINE ENDPOINT
 */

var endpoint;

if(config.local) {
  endpoint = 'http://maimaibot.local';
} else {
  endpoint = 'https://maimaibot.rayriffy.com';
}

/**
 *  SET LANGUAGE
 */

i18n.configure({
  locales: ['en-US', 'ja-JP'],
  directory: __dirname + '/locales',
  defaultLocale: 'en-US'
});

/**
 *  APPLICATION PROCESS
 */

const app = dialogflow({debug: false});

app.middleware((conv) => {
  i18n.setLocale(conv.user.locale);
});


app.intent('random-niconico', (conv) => {
  console.log('\x1b[33minfo:\x1b[0m Hit niconico & VOCALOID intent');
  var options = {
    uri: endpoint + '/nico.json',
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
    uri: endpoint + '/pops.json',
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
    uri: endpoint + '/orig.json',
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
    uri: endpoint + '/sega.json',
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
    uri: endpoint + '/game.json',
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
    uri: endpoint + '/toho.json',
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
    speech: i18n.__('WELCOME_SSML'),
    text: i18n.__('WELCOME_TEXT'),
  }));
  conv.ask(new Suggestions([i18n.__('SUGGESTION_CARD_CANCEL'), i18n.__('SUGGESTION_CARD_POPS'), i18n.__('SUGGESTION_CARD_NICO'), i18n.__('SUGGESTION_CARD_TOHO'), i18n.__('SUGGESTION_CARD_SEGA'), i18n.__('SUGGESTION_CARD_GAME'), i18n.__('SUGGESTION_CARD_ORIG')]));
});
app.intent('end', (conv) => {
  console.log('\x1b[33minfo:\x1b[0m Hit end intent');
  conv.close(new SimpleResponse({
    speech: i18n.__('END_SSML'),
    text: i18n.__('END_TEXT'),
  }));
});

function showCardorSpeak(detail,conv) {
  var hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
  if (hasScreen) {
    var cards = [];
    var is_regionlocked=null;
    for(var i = 0; i < detail.length; i++) {
      if(detail[i].regionlocked == 1) {
        is_regionlocked = 1;
      }
      if(conv.user.locale == "en-US") {
        detail[i].name = detail[i].name_en;
        detail[i].artist = detail[i].artist_en;
      } else {
        detail[i].name = detail[i].name_jp;
        detail[i].artist = detail[i].artist_jp;
      }
      cards.push(new BrowseCarouselItem({
        title: detail[i].name,
        url: detail[i].listen_youtube,
        image: new Image({
          url: detail[i].image_url,
          alt: 'Image',
        }),
        description: i18n.__('RESULT_CARD_AUTHOR') + ': ' + detail[i].artist + ' | ' + i18n.__('RESULT_CARD_INTRODUCED') + ': ' + detail[i].version,
      }));
    }
    var action_rlock_text,action_rlock_speech;
    if(is_regionlocked == 1 && conv.user.locale != 'ja-JP') {
      action_rlock_text = i18n.__('RESULT_TEXT_REGIONLOCKED');
      action_rlock_speech = i18n.__('RESULT_SPEAK_REGIONLOCKED');
    }
    else {
      action_rlock_text = "";
      action_rlock_speech = "";
    }
    conv.ask(new SimpleResponse({
      speech: '<speak>' + i18n.__('RESULT_SPEAK') + action_rlock_speech + '</speak>',
      text: i18n.__('RESULT_SPEAK') + action_rlock_text,
    }));
    conv.ask(new BrowseCarousel({items: cards}));
    conv.ask(new Suggestions([i18n.__('SUGGESTION_CARD_CANCEL'), i18n.__('SUGGESTION_CARD_POPS'), i18n.__('SUGGESTION_CARD_NICO'), i18n.__('SUGGESTION_CARD_TOHO'), i18n.__('SUGGESTION_CARD_SEGA'), i18n.__('SUGGESTION_CARD_GAME'), i18n.__('SUGGESTION_CARD_ORIG')]));
  } else {
    let speak = "<speak><p>";
    for(var i = 0; i < detail.length; i++) {
      if(conv.user.locale == 'en-US') {
        detail[i].name = wanakana.toRomaji(detail[i].name_jp);
      } else {
        detail[i].name = detail[i].name_jp;
      }
      speak += "<s><say-as interpret-as='ordinal'>" + (i+1) + "</say-as>.<break time='600ms'/>" + detail[i].name + ".</s><break time='500ms'/>";
    }
    speak += "<s>"+i18n.__('SPEAKER_SSML')+"</s></p></speak>";
    conv.ask(speak);
  }
  return;
}

express().use(bodyParser.json(), app).listen(config.port);
