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
  chat: [{
    messageType: String,
    sender: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    content: String,
    date: String
  }],
  activities: [{content: String, time: Date}]
})

projectSchema.methods.addMember = async function (user) {
  let found = this.members.find(u => u.username === user.username)
  if (found) {
    return false
  }
  this.members.push(user)
  let activity = {
    content: `Member ${user.username} has been added`,
    time: new Date()
  }
  await this.addActivity(activity)
  return this.save()
}

projectSchema.methods.removeMember = async function (username, action) {
  let found = this.members.find(user => user.username === username)
  if (found) {
    this.members.splice(this.members.indexOf(found), 1)
    let activity = {
      content: `Member ${username} ${action}`,
      time: new Date()
    }
    await this.addActivity(activity)
    return this.save()
  }
  return false
}

projectSchema.methods.addList = async function (list) {
  this.lists.push(list)
  let activity = {
    content: `List ${list.title} has been added`,
    time: new Date()
  }
  await this.addActivity(activity)
  return this.save()
}

projectSchema.methods.removeList = async function (listId) {
  let found = this.lists.find(list => list._id.toString() === listId)
  if (found) {
    this.lists.splice(this.lists.indexOf(found), 1)
    let activity = {
      content: `List ${found.title} has been deleted`,
      time: new Date()
    }
    await this.addActivity(activity)
    return this.save()
  }
  return false
}

projectSchema.methods.addTask = async function (listId, task) {
  let list = this.lists.find(list => list._id.toString() === listId)
  if (list) {
    list.tasks.push(task)
    let activity = {
      content: `Task ${task.title} has been added to list ${list.title}`,
      time: new Date()
    }
    await this.addActivity(activity)
    return this.save()
  }
  return false
}

projectSchema.methods.removeTask = async function (listId, taskId) {
  let list = this.lists.find(list => list._id.toString() === listId)
  if (list) {
    let task = list.tasks.find(t => t._id.toString() === taskId)
    if (task) {
      list.tasks.splice(list.tasks.indexOf(task), 1)
      let activity = {
        content: `Task ${task.title} has been removed from list ${list.title}`,
        time: new Date()
      }
      await this.addActivity(activity)
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

projectSchema.methods.markTask = async function (listId, oTask) {
  let list = this.lists.find(list => list._id.toString() === listId)
  if (list) {
    let task = list.tasks.find(t => t._id.toString() === oTask._id.toString())
    if (task) {
      if (task.state === 'completed') {
        task.state = 'active'
      } else {
        let activity = {
          content: `Task ${task.title} in list ${list.title} has been completed`,
          time: new Date()
        }
        await this.addActivity(activity)
        task.state = 'completed'
      }
      return this.save()
    }
    return false
  }
  return false
}

projectSchema.methods.addActivity = function (activity) {
  this.activities.push(activity)
  return this.save()
}

const projectModel = mongoose.model('Project', projectSchema)

module.exports = projectModel
