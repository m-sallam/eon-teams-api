const router = require('express').Router()
const User = require('../models/user')
const save = require('save-file')
const cloudinary = require('cloudinary')
const path = require('path')

// router.get('/users/:username', async (req, res) => {
//   try {
//     let user = await User.findOne({username: req.params.username})
//     if (user) {
//       res.send(user)
//     } else {
//       res.status(404).end()
//     }
//   } catch (err) {
//     console.log(err)
//     res.status(500).send(err.message)
//   }
// })

router.put('/profile', async (req, res) => {
  try {
    let update = {}
    if (req.body.src) {
      await save(req.body.src, `temp.${req.body.ext}`)
      let cRes = await cloudinary.v2.uploader.upload(path.join(__dirname, `temp.${req.body.ext}`))
      update = {
        name: req.body.user.name,
        email: req.body.user.email,
        picture: cRes.secure_url
      }
    } else {
      if (req.body.user.name.length === 0) return res.status(422).send({message: 'Name is required'})
      if (req.body.user.email.length === 0) return res.status(422).send({message: 'Email is required'})
      update = {
        name: req.body.user.name,
        email: req.body.user.email
      }
    }
    let user = await User.findOneAndUpdate({username: res.locals.user.username}, update, {new: true})
    if (!user) return res.status(404).end()
    let sentUser = {
      username: user.username,
      name: user.name,
      email: user.email,
      picture: user.picture
    }
    res.status(200).send({user: sentUser})
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

module.exports = router
