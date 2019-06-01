import {dialogflow, Image, Suggestions, BrowseCarousel, BrowseCarouselItem, SimpleResponse} from 'actions-on-google'
import axios from 'axios'
import basicAuth from 'basic-auth-connect'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
import selfPing from 'heroku-self-ping'
import i18n from 'i18n'
import wanakana from 'wanakana'

dotenv.config()

const {LOCAL, HTTP_USER, HTTP_PASS, PORT} = process.env

selfPing('https://maimai-actions.herokuapp.com/')

const endpoint = LOCAL ? 'http://web-maimaibot-rayriffy-com/api' : 'https://maimai-json-api.herokuapp.com/api'

/**
 * Set language
 */

i18n.configure({
  locales: ['en-US', 'ja-JP', 'th-TH'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en-US',
})

/**
 * Functions
 */

const getRaw = async type => {
  const payload = {
    req: type,
  }

  const out = await axios.post(endpoint, payload)

  return out
}

const showCardorSpeak = async (details, conv) => {
  const hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')
  if (hasScreen) {
    const cards = []

    let isRegionlocked = false

    // Fetch cards
    details.map(detail => {
      if (detail.regionlocked === 1) {
        isRegionlocked = true
      }

      cards.push(
        new BrowseCarouselItem({
          title: conv.user.locale === 'ja-JP' ? detail.name.jp : detail.name.en,
          url: detail.listen.youtube,
          image: new Image({
            url: detail.image_url,
            alt: 'Image',
          }),
          description: `${i18n.__('RESULT_CARD_AUTHOR')}: ${
            conv.user.locale === 'ja-JP' ? detail.artist.jp : detail.artist.en
          } | ${i18n.__('RESULT_CARD_INTRODUCED')}: ${detail.version}`,
        }),
      )
    })

    // Send conversation
    conv.ask(
      new SimpleResponse({
        speech: `<speak>${i18n.__('RESULT_SPEAK')}${
          isRegionlocked === 1 && conv.user.locale !== 'ja-JP' ? i18n.__('RESULT_SPEAK_REGIONLOCKED') : ''
        }</speak>`,
        text:
          i18n.__('RESULT_SPEAK') +
          (isRegionlocked === 1 && conv.user.locale !== 'ja-JP' ? i18n.__('RESULT_TEXT_REGIONLOCKED') : ''),
      }),
    )
    conv.ask(new BrowseCarousel({items: cards}))
    conv.ask(
      new Suggestions([
        i18n.__('SUGGESTION_CARD_CANCEL'),
        i18n.__('SUGGESTION_CARD_POPS'),
        i18n.__('SUGGESTION_CARD_NICO'),
        i18n.__('SUGGESTION_CARD_TOHO'),
        i18n.__('SUGGESTION_CARD_SEGA'),
        i18n.__('SUGGESTION_CARD_GAME'),
        i18n.__('SUGGESTION_CARD_ORIG'),
      ]),
    )
  } else {
    let speak = '<speak><p>'

    details.map((detail, i) => {
      speak.concat(
        `<s><say-as interpret-as='ordinal'>${i + 1}</say-as>.<break time='600ms'/>${
          conv.user.locale === 'en-US' ? wanakana.toRomaji(detail.name.jp) : detail.name.jp
        }.</s><break time='500ms'/>`,
      )
    })

    speak.concat(`<s>${i18n.__('SPEAKER_SSML')}</s></p></speak>`)

    conv.ask(speak)
  }
}

/**
 * Application
 */

const app = dialogflow({debug: false})

app.middleware(conv => {
  i18n.setLocale(conv.user.locale)
})

app.intent('random-niconico', async conv => {
  console.log('\x1b[33minfo:\x1b[0m Hit niconico & VOCALOID intent')

  try {
    const res = await getRaw('nico')

    return showCardorSpeak(res.data, conv)
  } catch (err) {
    console.log(`\x1b[31merror:\x1b[0m ${err}`)

    return err
  }
})

app.intent('random-anime', async conv => {
  console.log('\x1b[33minfo:\x1b[0m Hit POPS & ANIME intent')

  try {
    const res = await getRaw('pops')

    return showCardorSpeak(res.data, conv)
  } catch (err) {
    console.log(`\x1b[31merror:\x1b[0m ${err}`)

    return err
  }
})

app.intent('random-original', async conv => {
  console.log('\x1b[33minfo:\x1b[0m Hit ORIGINAL & JOYPOLIS intent')

  try {
    const res = await getRaw('orig')

    return showCardorSpeak(res.data, conv)
  } catch (err) {
    console.log(`\x1b[31merror:\x1b[0m ${err}`)

    return err
  }
})

app.intent('random-sega', async conv => {
  console.log('\x1b[33minfo:\x1b[0m Hit SEGA intent')

  try {
    const res = await getRaw('sega')

    return showCardorSpeak(res.data, conv)
  } catch (err) {
    console.log(`\x1b[31merror:\x1b[0m ${err}`)

    return err
  }
})

app.intent('random-game', async conv => {
  console.log('\x1b[33minfo:\x1b[0m Hit GAMES & VARIETY intent')

  try {
    const res = await getRaw('game')

    return showCardorSpeak(res.data, conv)
  } catch (err) {
    console.log(`\x1b[31merror:\x1b[0m ${err}`)

    return err
  }
})

app.intent('random-touhou', async conv => {
  console.log('\x1b[33minfo:\x1b[0m Hit TOUHOU Project intent')

  try {
    const res = await getRaw('toho')

    return showCardorSpeak(res.data, conv)
  } catch (err) {
    console.log(`\x1b[31merror:\x1b[0m ${err}`)

    return err
  }
})

app.intent('Welcome', conv => {
  console.log('\x1b[33minfo:\x1b[0m Hit welcome intent')

  conv.ask(
    new SimpleResponse({
      speech: i18n.__('WELCOME_SSML'),
      text: i18n.__('WELCOME_TEXT'),
    }),
  )

  conv.ask(
    new Suggestions([
      i18n.__('SUGGESTION_CARD_CANCEL'),
      i18n.__('SUGGESTION_CARD_POPS'),
      i18n.__('SUGGESTION_CARD_NICO'),
      i18n.__('SUGGESTION_CARD_TOHO'),
      i18n.__('SUGGESTION_CARD_SEGA'),
      i18n.__('SUGGESTION_CARD_GAME'),
      i18n.__('SUGGESTION_CARD_ORIG'),
    ]),
  )
})

app.intent('end', conv => {
  console.log('\x1b[33minfo:\x1b[0m Hit end intent')

  conv.close(
    new SimpleResponse({
      speech: i18n.__('END_SSML'),
      text: i18n.__('END_TEXT'),
    }),
  )
})

/**
 * Server
 */

const server = express()

server.use(basicAuth(HTTP_USER, HTTP_PASS))

server.use(bodyParser.json(), app)

server.listen(PORT)
