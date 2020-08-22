const express = require("express")
const router = express.Router()
const { User } = require("../models/User")
const { auth } = require("../middleware/auth")
const { body, validationResult } = require("express-validator")

// ERROR FORMATTER
function errorFormatter({ location, msg, param, value, nestedErrors }) {
  return `${msg}`
}
const getFormattedErrors = (req) =>
  validationResult(req).formatWith(errorFormatter)

const getErrors = (req) => validationResult(req)

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

router.post(
  "/register",
  [
    body([
      "fName",
      "lName",
      "mInit",
      "nickName",
      "email",
      "password",
    ]).notEmpty(),
    body(["fName", "lName", "mInit"]).isAlpha(),
    body(["email"])
      .custom(async (value) => {
        console.log("HEYEYY")
        const emailExists = await User.emailExists(value)
        if (emailExists) return Promise.reject()
      })
      .withMessage("Email is taken"),
    body(["email"]).isEmail(),
  ],
  (req, res) => {
    const result = getFormattedErrors(req)
    const errors = getErrors(req)

    if (!errors.isEmpty()) {
      console.log("errors")
      return res.status(400).json({ errors: result.mapped() })
    }
    console.log("i was ehere")

    const user = new User(req.body)
    user.save((err, doc) => {
      if (err) return res.json({ success: false, err })
      return res.status(200).json({
        success: true,
      })
    })
  }
)

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
