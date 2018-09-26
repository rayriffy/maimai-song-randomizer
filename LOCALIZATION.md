Localization
============

Language and Locale support
---------------------------

Currently we have **3** locales support

  - en-US
  - ja-JP
  - th-TH

for full list of supported locales please see in [Google Developers Documentation](https://developers.google.com/actions/localization/languages-locales)

Assistant Locales
-----------------

We use [i18n](https://www.npmjs.com/package/i18n) to switch between languages. All locales file are stored in `/locales` directory. Simply copy `en-US.json` as the template and translating from it.

Also don't forget to add your locales in `index.js` [here](https://github.com/rayriffy/maimai-song-randomizer/blob/master/index.js#L40)

**NOTE:** File naming MUST be your contributing locale.

Assistant Directory information
-------------------------------

To submit your locale to production release, we also need your help to translating [directory information](https://assistant.google.com/services/a/uid/00000072b48cd3d6?hl=en). Everything is prepared in [GitHub Gist](https://gist.github.com/rayriffy/897af3199c91e250732b238f35511834). PLEASE send your translated directory information via [GitHub Gist](https://gist.github.com) and create gist as `Secret Gist`

Creating Pull Request
---------------------

Opening pull request to `master` branch by using our [template](https://github.com/rayriffy/maimai-song-randomizer/blob/master/.github/PULL_REQUEST_TEMPLATE/localization.md)