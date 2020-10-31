const express = require('express')
const Twitter = require('twitter')

const client = new Twitter({
  'consumer_key': process.env.TWITTER_CONSUMER_KEY,
  'consumer_secret': process.env.TWITTER_CONSUMER_SECRET,
  'access_token_key': process.env.TWITTER_ACCESS_TOKEN_KEY,
  'access_token_secret': process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const router = express.Router()

router.get('/statuses/user/timeline', async (req, res) => {
  await client.get('statuses/user_timeline', req.query)
  .then(data => res.json(data))
  .catch(err => console.error(err))
})

router.get('/statuses/home/timeline', async (req , res) => {
  await client.get('statuses/home_timeline', req.query)
  .then(data => res.json(data))
  .catch(err => console.error(err))
})

router.get('/statuses/show', async (req , res) => {
  await client.get('statuses/show', req.query)
  .then(data => res.json(data))
  .catch(err => console.error(err))
})

router.get('/users/show', async (req, res) => {
  await client.get('users/show', req.query)
  .then(data => res.json(data))
  .catch(err => console.error(err))
})

router.get('/search/tweets', async (req, res) => {
  await client.get('search/tweets', req.query)
  .then(data => res.json(data))
  .catch(err => console.error(err))
})

module.exports = router
