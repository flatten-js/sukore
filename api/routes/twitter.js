const url = require('url')
const express = require('express')
const Twitter = require('twitter')
const router = express.Router()

const client = new Twitter({
  'consumer_key': process.env.TWITTER_CONSUMER_KEY,
  'consumer_secret': process.env.TWITTER_CONSUMER_SECRET,
  'access_token_key': process.env.TWITTER_ACCESS_TOKEN_KEY,
  'access_token_secret': process.env.TWITTER_ACCESS_TOKEN_SECRET
})

let params = null

router.use((req, res, next) => {
  params = url.parse(req.url, true)
  next()
})

router.get('/statuses/user/timeline', async (req, res) => {
  await client.get('statuses/user_timeline', params.query)
  .then(data => res.json(data))
  .catch(err => console.error(err))
})

router.get('/users/show', async (req, res) => {
  await client.get('users/show', params.query)
  .then(data => res.json(data))
  .catch(err => console.error(err))
})

router.get('/search/tweets', async (req, res) => {
  console.log('/search/tweets')
  await client.get('search/tweets', params.query)
  .then(data => res.json(data))
  .catch(err => console.error(err))
})

module.exports = router
