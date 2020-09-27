const express = require('express')
const app = express()
const port = 3000
const db = require('./db.json')
const fs = require('fs')

const {check, validationResult, checkSchema, body} = require('express-validator/check')
const {sanitizeBody} = require('express-validator/filter')

const Task = require('./models/Task')
const User = require('./models/User')

let taskReady = false
let userReady = false

Task.sync().then(() => {
    userReady = true
})

User.sync().then(() => {
    taskReady = true
})

app.use(express.static('./client/'))
app.use('/api/*', express.json())

app.post('/api/users', [
        body('firstName').isAlpha().withMessage('Must contains only letters')
            .isLength({min: 3}).withMessage("Must be at least 3 chars long"),
        body('lastName').isAlpha().withMessage('Must contains only letters')
            .isLength({min: 3}).withMessage("Must be at least 3 chars long"),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({min: 5}).withMessage('Must be at least 5 chars long')
            .matches(/\d/).withMessage('Must contain a number')
    ],
    (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            if (userReady) createNewUser(req, res)
        } else {
            res.json(errors)
        }
    }
)

app.get('/api/users/:userId', (req, res, next) => {
    User.findByPk(req.params.userId).then(r => {
            res.json(r)
        }
    )
})

app.get('/api/tasks/:id', (req, res, next) => {
    res.json(db[req.params.id])
})

app.post('/api/tasks', (req, res, next) => {
    if (taskReady) createNewTask(req, res)
})

function createNewUser(req, res) {
    User.create(req.body).then(result => {
        console.log(result)
        res.status(201)
        res.json({message: "Successful"})
    }).catch(error => {
        console.error(error)
        res.status(500)
        res.json({message: "Error"})
    })
}

function createNewTask(req, res) {
    Task.create(req.body).then(result => {
        console.log(result)
        res.status(201)
        res.json({message: "Successful"})
    }).catch(error => {
        console.error(error)
        res.status(500)
        res.json({message: "Error"})
    })
}

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port)
})