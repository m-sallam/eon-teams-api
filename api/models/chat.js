const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
  type: String,
  user: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
  content: String,
  time: Date,
  project: {type: mongoose.SchemaTypes.ObjectId, ref: 'Project'}
})

const chatModel = mongoose.model('Chat', chatSchema)

module.exports = chatModel
