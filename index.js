const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Item = require('./model/item')

const PORT = 3000
const HOST = '0.0.0.0'

const app = express()
app.listen(PORT,HOST)
app.use(bodyParser.json())
mongoose
  .connect(
    'mongodb://mongo:27017',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/item', (req, res) => {
    Item.find({})
    .then(x=>{
        res.status(200).send(x)
    })
    .catch(e=>{
        res.status(400).send(x)
    })
})
app.post('/item', (req, res) => {
    const newItem = new Item({
      name: req.body.name
    })
    newItem.save()
    .then(
        res.status(201).send(req.body)
    )
    .catch(e=>{
        res.status(400).send(e)
    })
  })
app.put('/item/:id', (req, res) => {
    Item.findByIdAndUpdate(req.params.id,{
        $set: {
            name:req.body.name
        }
    }).then(
        res.status(200).send(req.body)
    )
    .catch(e=>{
        res.status(400).send(e)
    })
  })
app.delete('/item/:id', (req, res) => {
    Item.findOneAndRemove(req.params.id).
    then(
        res.status(200).send(req.body)
    )
    .catch(e=>{
        res.status(400).send(e)
    })
  })