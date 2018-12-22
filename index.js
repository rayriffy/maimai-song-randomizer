'use strict';

/**
 *  GET NECESSARY LIBRARY
 */

import {dialogflow, Image, Suggestions, BrowseCarousel, BrowseCarouselItem, SimpleResponse} from 'actions-on-google';
import bodyParser from 'body-parser';
import express from 'express';
import basicAuth from 'basic-auth-connect';
import rp from 'request-promise';
import i18n from 'i18n';
import wanakana from 'wanakana';
import dotenv from 'dotenv';
import selfPing from 'heroku-self-ping';

dotenv.config();

selfPing('https://maimai-actions.herokuapp.com/');

/**
 *  DEFINE ENDPOINT
 */

let endpoint;

if(process.env.LOCAL === true) {
  endpoint = 'http://web-maimaibot-rayriffy-com/api';
} else {
  endpoint = 'https://maimai-json-api.herokuapp.com/api';
}

/**
 *  SET LANGUAGE
 */

i18n.configure({
  locales: ['en-US', 'ja-JP', 'th-TH'],
  directory: `${__dirname}/locales`,
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
  const options = {
    method: 'POST',
    uri: endpoint,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    body: {
      req: 'nico'
    },
    json: true
  };
  return rp(options)
        .then((detail) => showCardorSpeak(detail, conv))
        .then((p) => Promise.all(p))
        .catch((err) => console.log(`\x1b[31merror:\x1b[0m ${err}`));
});

app.intent('random-anime', (conv) => {
  console.log('\x1b[33minfo:\x1b[0m Hit POPS & ANIME intent');
  const options = {
    method: 'POST',
    uri: endpoint,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    body: {
      req: 'pops'
    },
    json: true
  };
  return rp(options)
        .then((detail) => showCardorSpeak(detail, conv))
        .then((p) => Promise.all(p))
        .catch((err) => console.log(`\x1b[31merror:\x1b[0m ${err}`));
});

app.intent('random-original', (conv) => {
  console.log('\x1b[33minfo:\x1b[0m Hit ORIGINAL & JOYPOLIS intent');
  const options = {
    method: 'POST',
    uri: endpoint,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    body: {
      req: 'orig'
    },
    json: true
  };
  return rp(options)
        .then((detail) => showCardorSpeak(detail, conv))
        .then((p) => Promise.all(p))
        .catch((err) => console.log(`\x1b[31merror:\x1b[0m ${err}`));
});

app.intent('random-sega', (conv) => {
  console.log('\x1b[33minfo:\x1b[0m Hit SEGA intent');
  const options = {
    method: 'POST',
    uri: endpoint,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    body: {
      req: 'sega'
    },
    json: true
  };
  return rp(options)
        .then((detail) => showCardorSpeak(detail, conv))
        .then((p) => Promise.all(p))
        .catch((err) => console.log(`\x1b[31merror:\x1b[0m ${err}`));
});

app.intent('random-game', (conv) => {
  console.log('\x1b[33minfo:\x1b[0m Hit GAMES & VARIETY intent');
  const options = {
    method: 'POST',
    uri: endpoint,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    body: {
      req: 'game'
    },
    json: true
  };
  return rp(options)
        .then((detail) => showCardorSpeak(detail, conv))
        .then((p) => Promise.all(p))
        .catch((err) => console.log(`\x1b[31merror:\x1b[0m ${err}`));
});

app.intent('random-touhou', (conv) => {
  console.log('\x1b[33minfo:\x1b[0m Hit TOUHOU Project intent');
  const options = {
    method: 'POST',
    uri: endpoint,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    body: {
      req: 'toho'
    },
    json: true
  };
  return rp(options)
        .then((detail) => showCardorSpeak(detail, conv))
        .then((p) => Promise.all(p))
        .catch((err) => console.log(`\x1b[31merror:\x1b[0m ${err}`));
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
  const hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
  if (hasScreen) {
    const cards = [];
    let is_regionlocked=null;
    for(let i = 0; i < detail.length; i++) {
      if(detail[i].regionlocked == 1) {
        is_regionlocked = 1;
      }
      if(conv.user.locale == "ja-JP") {
        detail[i].name = detail[i].name.jp;
        detail[i].artist = detail[i].artist.jp;
      } else {
        detail[i].name = detail[i].name.en;
        detail[i].artist = detail[i].artist.en;
      }
      cards.push(new BrowseCarouselItem({
        title: detail[i].name,
        url: detail[i].listen.youtube,
        image: new Image({
          url: detail[i].image_url,
          alt: 'Image',
        }),
        description: `${i18n.__('RESULT_CARD_AUTHOR')}: ${detail[i].artist} | ${i18n.__('RESULT_CARD_INTRODUCED')}: ${detail[i].version}`,
      }));
    }
    let action_rlock_text;
    let action_rlock_speech;
    if(is_regionlocked == 1 && conv.user.locale != 'ja-JP') {
      action_rlock_text = i18n.__('RESULT_TEXT_REGIONLOCKED');
      action_rlock_speech = i18n.__('RESULT_SPEAK_REGIONLOCKED');
    }
    else {
      action_rlock_text = "";
      action_rlock_speech = "";
    }
    conv.ask(new SimpleResponse({
      speech: `<speak>${i18n.__('RESULT_SPEAK')}${action_rlock_speech}</speak>`,
      text: i18n.__('RESULT_SPEAK') + action_rlock_text,
    }));
    conv.ask(new BrowseCarousel({items: cards}));
    conv.ask(new Suggestions([i18n.__('SUGGESTION_CARD_CANCEL'), i18n.__('SUGGESTION_CARD_POPS'), i18n.__('SUGGESTION_CARD_NICO'), i18n.__('SUGGESTION_CARD_TOHO'), i18n.__('SUGGESTION_CARD_SEGA'), i18n.__('SUGGESTION_CARD_GAME'), i18n.__('SUGGESTION_CARD_ORIG')]));
  } else {
    let speak = "<speak><p>";
    for(let j = 0; j < detail.length; j++) {
      if(conv.user.locale == 'en-US') {
        detail[j].name = wanakana.toRomaji(detail[j].name.jp);
      } else {
        detail[j].name = detail[j].name.jp;
      }
      speak += `<s><say-as interpret-as='ordinal'>${j+1}</say-as>.<break time='600ms'/>${detail[j].name}.</s><break time='500ms'/>`;
    }
    speak += `<s>${i18n.__('SPEAKER_SSML')}</s></p></speak>`;
    conv.ask(speak);
  }
  return;
}

express()
  .use(basicAuth(process.env.HTTP_USER, process.env.HTTP_PASS))
  .use(bodyParser.json(), app)
  .listen(process.env.PORT);
