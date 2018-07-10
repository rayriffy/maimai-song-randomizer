maimai Song Randomizer
======================

[![Assistant Badge](https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_HOR.png)](https://l.rayriffy.com/gassistant)

![badge](https://forthebadge.com/images/badges/powered-by-electricity.svg)
![badge](https://forthebadge.com/images/badges/built-with-love.svg)
![badge](https://forthebadge.com/images/badges/made-with-javascript.svg)
![badge](https://img.shields.io/circleci/project/github/rayriffy/maimai-song-randomizer.svg?style=for-the-badge)
![badge](https://img.shields.io/github/tag/rayriffy/maimai-song-randomizer.svg?&style=for-the-badge)

**maimai Song Randomizer** is a open source bot on [Google Assistant](https://assistant.google.com). It helps you random 5 songs at the same time on your prefered category while you waiting in line to play *maimai* .

When user trigger request, maimai Song Randomizer will call private API to get random data from [database](https://github.com/rayriffy/maimai-json) and send an output to users.

This bot can serve as an example for developer who making Google Assistant bot on *self-hosted NodeJS* with [DialogFlow](https://api.ai) Fulfillments by using *webhooks*.

You can talk with your Google Assistant on Android and iOS by saying *”Talk to maimai Song Randomizer”*

Requirements
------------

- Node 6.14.2+

Installing
------------


### Clone the git repository
```
$ git clone https://github.com/rayriffy/maimai-song-randomizer.git
```

### Install Package
```
$ npm install
```

### (Optional) Configuration
You can config your application by editing `config` variable in [index.js](https://github.com/rayriffy/maimai-song-randomizer/blob/master/index.js#L19)

### Start express server
```
$ node index.js
```
Your webhook will running on port **3000** by default

Licence
-------

**maimai Song Randomizer** is licensed under AGPL version 3 or later. Please see [the licence file](LICENCE) for more information. [tl;dr](https://tldrlegal.com/license/gnu-affero-general-public-license-v3-(agpl-3.0)) if you want to use any code, design or artwork from this project, attribute it and make your project open source under the same licence.
