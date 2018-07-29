const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  title: {type: String, required: true},
  owner: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
  members: [{type: mongoose.SchemaTypes.ObjectId, ref: 'User'}],
  lists: [{
    _id: mongoose.SchemaTypes.ObjectId,
    title: String,
    tasks: [{
      _id: mongoose.SchemaTypes.ObjectId,
      title: String,
      state: String, // [ongoing, completed, missed]
      deadline: Date,
      users: [{type: mongoose.SchemaTypes.ObjectId, ref: 'User'}],
      description: String,
      attachments: [{name: String, url: String}]
    }]
  }],
  activity: [String],
  chat: [{
    messageType: String,
    sender: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    content: String,
    date: String
  }],
  activities: [String]
})

projectSchema.methods.addMember = function (user) {
  let found = this.members.find(u => u.username === user.username)
  if (found) {
    return false
  }
  this.members.push(user)
  return this.save()
}

projectSchema.methods.removeMember = function (username) {
  let found = this.members.find(user => user.username === username)
  if (found) {
    this.members.splice(this.members.indexOf(found), 1)
    return this.save()
  }
  return false
}

projectSchema.methods.addList = function (list) {
  this.lists.push(list)
  return this.save()
}

projectSchema.methods.removeList = function (listId) {
  let found = this.lists.find(list => list._id.toString() === listId)
  if (found) {
    this.lists.splice(this.lists.indexOf(found), 1)
    return this.save()
  }
  return false
}

projectSchema.methods.addTask = function (listId, task) {
  let list = this.lists.find(list => list._id.toString() === listId)
  if (list) {
    list.tasks.push(task)
    return this.save()
  }
  return false
}

projectSchema.methods.removeTask = function (listId, taskId) {
  let list = this.lists.find(list => list._id.toString() === listId)
  if (list) {
    let task = list.tasks.find(t => t._id.toString() === taskId)
    if (task) {
      list.tasks.splice(list.tasks.indexOf(task), 1)
      return this.save()
    }
  }
  return false
}

projectSchema.methods.addAttachment = function (listId, taskId, attachment) {
  let list = this.lists.find(list => list._id.toString() === listId)
  if (list) {
    let task = list.tasks.find(t => t._id.toString() === taskId)
    if (task) {
      task.attachments.push(attachment)
      return this.save()
    }
    return false
  }
  return false
}

projectSchema.methods.markTask = function (listId, oTask) {
  let list = this.lists.find(list => list._id.toString() === listId)
  if (list) {
    let task = list.tasks.find(t => t._id.toString() === oTask._id.toString())
    if (task) {
      if (task.state === 'completed') {
        task.state = 'active'
      } else {
        task.state = 'completed'
      }
      return this.save()
    }
    return false
  }
  return false
}

const projectModel = mongoose.model('Project', projectSchema)

module.exports = projectModel
