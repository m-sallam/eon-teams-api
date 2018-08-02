const {io} = require('../app')
const Chat = require('../api/models/chat')
const User = require('../api/models/user')
const mongoose = require('mongoose')

io.of('/api').on('connection', socket => {
  console.log('connected')
  socket.on('join', room => {
    socket.join(room)
  })
  socket.on('message', async (data) => {
    let user = await User.findOne({username: data.message.user.username})
    let message = new Chat({
      type: data.message.type,
      time: new Date(data.message.time),
      content: data.message.content,
      user: user,
      project: new mongoose.mongo.ObjectId(data.message.project._id)
    })
    await message.save()
    let populatedMessage = await Chat.findById(message._id).populate('user', '-hash')
    io.of('/api').to(data.room).emit('message', populatedMessage)
  })
})

module.exports = io
