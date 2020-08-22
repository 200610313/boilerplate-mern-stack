const express = require("express")
const router = express.Router()
const { User } = require("../models/User")
const 
const { auth } = require("../middleware/auth")
const { body } = require("express-validator")

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
  const { fName, lName, mInit, nickName, email, password, role, _id } = req.user
  res.status(200).json({
    fName,
    isAdmin: role === 0 ? false : true,
    lName,
    mInit,
    nickName,
    email,
    password,
    role,
    _id,
    isAuth: true,
  })
})

router.post("/register",[

body(['fName','lName','mInit','nickName','email','password']).notEmpty()
body(['fName','lName','mInit','nickName','email','password']).notEmpty()


], (req, res) => {
  const user = new User(req.body)

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true,
    })
  })
})
          
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      })

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" })

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err)
        res.cookie("w_authExp", user.tokenExp)
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
          isAuth: true,
        })
      })
    })
  })
})

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err })
      return res.status(200).send({
        success: true,
      })
    }
  )
})

module.exports = router
