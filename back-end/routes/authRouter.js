const router = require("express").Router();
const data = require('../data')
const fs = require('fs')

router.post('/login', (req, res) => {
    const {email, password} = req.body

    data.Users.map(user => {
        if (user.id == email) {
            if (user.data.password == password) {
                console.log('login success')
            } else {
                console.log('password incorrect')
            }
        }
    })
})

router.post('/signup', (req, res) => {
    const { email, password } = req.body;

    const newUser = {
        id: email,
        data: {
            email: email,
            assets: [],
            password: password
        }
    }

    data.Users.push(newUser)

    res.send('signup success')
})

module.exports = router
