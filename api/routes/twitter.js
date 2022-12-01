const express = require('express')
const { TwitterClient } = require('twitter-api-client')

const client = new TwitterClient({
  apiKey: process.env.TWITTER_CONSUMER_KEY,
  apiSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN_KEY,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const router = express.Router()

router.get('/statuses/user/timeline', async (req, res) => {
  client.tweets.statusesUserTimeline(req.query)
  .then(data => res.json(data))
  .catch(err => console.error(err))
})

router.get('/statuses/home/timeline', async (req , res) => {
  client.tweets.statusesHomeTimeline(req.query)
  .then(data => res.json(data))
  .catch(err => console.error(err))
})

router.get('/statuses/show', async (req , res) => {
  client.tweets.statusesShow(req.query)
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
  client.accountsAndUsers.usersShow(req.query)
  .then(data => res.json(userTemplate(data)))
  .catch(err => console.error(err))
})

router.get('/search/tweets', async (req, res) => {
  client.tweets.search(req.query)
  .then(data => res.json(data))
  .catch(err => console.error(err))
})

module.exports = router
