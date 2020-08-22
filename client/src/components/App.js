import React, { Suspense } from "react"
import { Route, Switch } from "react-router-dom"
import Auth from "../hoc/auth"
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js"
import LoginPage from "./views/LoginPage/LoginPage.js"
// import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import Footer from "./views/Footer/Footer"
import SignInPage from "./views/SignInPage/SignInPage"
import SignUpPage from "./views/SignUpPage/SignUpPage"
// import RegisterPage from "./views/RegisterPage/RegisterPage"

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, true)} />
        <Route exact path="/signin" component={Auth(SignInPage, false)} />
        <Route exact path="/signup" component={Auth(SignUpPage, false)} />
        <Route exact component={Auth(LandingPage, true)} />
      </Switch>
    </>
  )
}

export default App
