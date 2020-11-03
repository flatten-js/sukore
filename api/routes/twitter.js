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

const userTemplate = user => ({
  id: user.id_str,
  head: user.profile_banner_url,
  icon: user.profile_image_url_https.replace('normal', '400x400'),
  name: user.name,
  screenName: user.screen_name,
  description: user.description,
  entities: Object.keys(user.entities).reduce((acc, cur) => {
    const plural = singular => `${singular}s`
    acc[plural(cur)] = user.entities[cur].urls
    return acc
  }, {}),
  status: {
    following: user.friends_count,
    followers: user.followers_count,
  },
  remarks: {
    location: user.location,
    link: user.url
  }
})

router.get('/users/show', async (req, res) => {
  await client.get('users/show', req.query)
  .then(data => res.json(userTemplate(data)))
  .catch(err => console.error(err))
})

router.get('/search/tweets', async (req, res) => {
  await client.get('search/tweets', req.query)
  .then(data => res.json(data))
  .catch(err => console.error(err))
})

module.exports = router
