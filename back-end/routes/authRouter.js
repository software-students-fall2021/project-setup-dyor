const router = require("express").Router();
const data = require('../data')
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "foo";

function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
  };
  const options = {
    expiresIn: "3600s",
  };
  return jwt.sign(payload, jwtSecret, options);
}

router.post('/login', (req, res) => {
    const { email, password } = req.body

    data.Users.map(user => {
        if (user.id == email) {
            if (user.data.password == password) {
                const token = generateToken(user)
                res.status(200).json({ email: email, token: token })
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
