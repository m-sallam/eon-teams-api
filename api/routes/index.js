const router = require('express').Router()
const User = require('../models/user')
const auth = require('../../middleware//auth')

router.post('/register', async (req, res) => {
  try {
    if (req.body.password.length < 6) return res.status(422).send({message: 'Password must be at least 6 chars long'})
    let user = new User({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      picture: 'none'
    })
    await auth.register(user, req.body.password)
    let {token} = await auth.authenticate(req.body.username, req.body.password)
    res.status(200).send({
      success: true,
      token,
      user: {
        username: user.username,
        name: user.name,
        email: user.email,
        picture: user.picture
      }
    })
  } catch (err) {
    console.log(err)
    if (err.code === 11000) {
      let type = err.message.split('$')[1].split('_')[0]
      if (type === 'username') {
        res.status(422).send({message: 'Username already exists'})
      } else {
        res.status(422).send({message: 'Email already exists'})
      }
    } else if (err.name === 'ValidationError') {
      console.log(err.errors)
      res.status(422).send({message: `${Object.keys(err.errors)[0]} is required`})
    } else {
      res.status(500).send({message: err.message})
    }
  }
})

router.post('/login', async (req, res) => {
  try {
    let {token, user} = await auth.authenticate(req.body.username, req.body.password)
    res.status(200).send({
      token,
      user: {
        username: user.username,
        name: user.name,
        email: user.email,
        picture: user.picture
      }
    })
  } catch (err) {
    console.log(err)
    if (err.code === 'AUTHERROR') {
      res.status(422).send({message: err.message})
    } else {
      res.status(500).send(err.message)
    }
  }
})

router.post('/token/refresh', async (req, res) => {
  try {
    let {token} = await auth.refreshToken(req.body.token)
    res.status(200).send({token})
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

module.exports = router
