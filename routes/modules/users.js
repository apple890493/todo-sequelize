const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const passport = require('passport')

const db = require('../../models')
const User = db.User

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  let errors = []
  passport.authenticate('local', (err, user, cb) => {
    req.logIn(user, err => {
      if (err) {
        if (cb.message === "email") {
          errors.push({ message: '此用戶尚未註冊!' })
        } else if (cb.message === "passwd") {
          errors.push({ message: '帳號或密碼不相符' })
        }
        if (errors.length) {
          return res.render('login', { errors })
        }
      }
      return res.redirect('/')
    })
  })(req, res, next);
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({
      message: '所有欄位都是必填'
    })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        console.log('User already exists!')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Logout Successful!')
  res.redirect('/users/login')
})

module.exports = router