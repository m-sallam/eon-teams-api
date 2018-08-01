const router = require('express').Router()
const Project = require('../models/project')
const User = require('../models/user')
const mongoose = require('mongoose')
const crypto = require('crypto')
const save = require('save-file')
const cloudinary = require('cloudinary')
const path = require('path')

router.get('/projects', async (req, res) => {
  try {
    let projects = await Project.find({$or: [{ owner: res.locals.user._id }, {members: res.locals.user._id}]})
    res.status(200).send({projects})
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

router.get('/projects/:id', async (req, res) => {
  try {
    let project = await Project.findOne({_id: req.params.id}).populate('owner', '-hash').populate('members', '-hash').populate('lists.tasks.users', '-hash')
    if (project) {
      if (res.locals.user.username === project.owner.username || project.members.find(u => u.username === res.locals.user.username)) {
        let today = new Date()
        for (let list of project.lists) {
          for (let task of list.tasks) {
            if (task.deadline && task.state === 'active') {
              let deadline = new Date(task.deadline)
              if (deadline.getTime() < today.getTime()) {
                let activity = {
                  content: `Task ${task.title} is missed`,
                  time: new Date()
                }
                await project.addActivity(activity)
                task.state = 'missed'
              }
            }
          }
        }
        await project.save()
        res.status(200).send({project})
      } else {
        res.status(403).end()
      }
    } else {
      res.status(404).end()
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

router.delete('/projects/:id', async (req, res) => {
  try {
    let project = await Project.findOne({_id: req.params.id}).populate('owner')
    if (!project) return res.status(422).send({message: 'Project not found'})
    if (res.locals.user.username !== project.owner.username) return res.status(403).end()
    await Project.findOneAndRemove({_id: req.params.id})
    res.status(200).end()
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

router.post('/projects', async (req, res) => {
  try {
    if (req.body.title.length === 0) return res.status(422).send({message: 'Title required'})
    let project = new Project({
      title: req.body.title,
      owner: res.locals.user,
      members: [res.locals.user],
      activites: [{
        content: 'Project has been created',
        time: new Date()
      }]
    })
    await project.save()
    res.status(200).send({id: project._id})
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

router.post('/projects/:id/members', async (req, res) => {
  try {
    if (res.locals.user.username === req.body.username) return res.status(422).send({message: 'Cannot add the project owner'})
    let project = await Project.findOne({_id: req.params.id}).populate('members').populate('owner')
    if (!project) return res.status(422).send({message: 'Project not found'})
    if (res.locals.user.username !== project.owner.username) return res.status(403).end()
    let user = await User.findOne({username: req.body.username})
    if (!user) return res.status(422).send({message: 'User not found'})
    let added = await project.addMember(user)
    if (!added) return res.status(422).send({message: 'User is already a member'})
    res.status(200).end()
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

router.delete('/projects/:id/members', async (req, res) => {
  try {
    if (req.query.action === 'remove') {
      let project = await Project.findOne({_id: req.params.id}).populate('members').populate('owner')
      if (!project) return res.status(422).send({message: 'Project not found'})
      if (res.locals.user.username !== project.owner.username) return res.status(403).end()
      if (req.body.username === res.locals.user.username) return res.status(422).send({message: 'Project owner can not be removed'})
      let removed = await project.removeMember(req.body.username, 'has been removed')
      if (!removed) return res.status(422).send({message: 'User is not a member'})
      res.status(200).end()
    } else {
      let project = await Project.findOne({_id: req.params.id}).populate('members')
      if (!project) return res.status(422).send({message: 'Project not found'})
      let removed = await project.removeMember(res.locals.user.username, 'left')
      if (!removed) return res.status(422).send({message: 'Not a member'})
      res.status(200).end()
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

router.post('/projects/:id/lists', async (req, res) => {
  try {
    let project = await Project.findOne({_id: req.params.id}).populate('members').populate('owner')
    if (!project) return res.status(422).send({message: 'Project not found'})
    if (res.locals.user.username !== project.owner.username) return res.status(403).end()
    if (req.body.title.length === 0) return res.status(422).send({message: 'Title is required'})
    let list = {
      _id: new mongoose.mongo.ObjectId(),
      title: req.body.title,
      tasks: []
    }
    await project.addList(list)
    res.status(200).send({listId: list._id})
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

router.delete('/projects/:id/lists/:listId', async (req, res) => {
  try {
    let project = await Project.findOne({_id: req.params.id}).populate('members').populate('owner')
    if (!project) return res.status(422).send({message: 'Project not found'})
    if (res.locals.user.username !== project.owner.username) return res.status(403).end()
    let removed = await project.removeList(req.params.listId)
    if (!removed) return res.status(422).send({message: 'List not found'})
    res.status(200).end()
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

router.post('/projects/:id/lists/:listId/tasks', async (req, res) => {
  try {
    let project = await Project.findOne({_id: req.params.id}).populate('members').populate('owner')
    if (!project) return res.status(422).send({message: 'Prpject not found'})
    if (res.locals.user.username !== project.owner.username) return res.status(403).end()
    let users = []
    for (let username of req.body.users) {
      let user = await User.findOne({username})
      if (!user) return res.status(422).send({message: `${username} not found`})
      users.push(user)
    }
    let task = {
      _id: new mongoose.mongo.ObjectId(),
      title: req.body.title,
      state: 'active',
      deadline: req.body.deadline,
      users: users,
      description: req.body.description,
      attachments: []
    }
    let added = await project.addTask(req.params.listId, task)
    if (!added) return res.status(422).send({message: 'List not found'})
    res.status(200).send({taskId: task._id})
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

router.delete('/projects/:id/lists/:listId/tasks/:taskId', async (req, res) => {
  try {
    let project = await Project.findOne({_id: req.params.id}).populate('members').populate('owner')
    if (!project) return res.status(422).send({message: 'Prpject not found'})
    if (res.locals.user.username !== project.owner.username) return res.status(403).end()
    console.log(req.params.listId, req.params.taskId)
    let removed = await project.removeTask(req.params.listId, req.params.taskId)
    if (!removed) return res.status(422).send({message: 'List not found'})
    res.status(200).end()
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

router.post('/projects/:id/lists/:listId/tasks/files', async (req, res) => {
  try {
    let project = await Project.findOne({_id: req.params.id}).populate('members').populate('owner')
    if (!project) return res.status(422).send({message: 'Prpject not found'})
    if (res.locals.user.username !== project.owner.username) return res.status(403).end()
    let fileName = crypto.randomBytes(10).toString('hex') + '.' + req.files.file.name.split('.')[req.files.file.name.split('.').length - 1]
    await save(req.files.file, fileName)
    let cRes = await cloudinary.v2.uploader.upload(path.join(__dirname, fileName), {resource_type: 'raw'})
    let attachment = {
      name: req.files.file.name,
      url: cRes.secure_url
    }
    let added = await project.addAttachment(req.params.listId, req.body.taskId, attachment)
    if (!added) return res.status(422).send({message: 'List not found'})
    res.status(200).end()
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

router.post('/projects/:id/lists/:listId/tasks/:taskId/mark', async (req, res) => {
  try {
    let project = await Project.findOne({_id: req.params.id}).populate('members').populate('owner')
    if (!project) return res.status(422).send({message: 'Prpject not found'})
    if (res.locals.user.username !== project.owner.username) return res.status(403).end()
    let marked = await project.markTask(req.params.listId, req.body.task)
    if (!marked) return res.status(422).send({message: 'Task not found'})
    res.status(200).end()
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

module.exports = router
