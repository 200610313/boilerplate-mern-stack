import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Alert from "@material-ui/lab/Alert"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import { FORM_ERROR } from "final-form"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { Form, Field } from "react-final-form"
import { useDispatch } from "react-redux"
import { loginUser } from "../../../_actions/user_actions"
import { TextField, CircularProgress } from "@material-ui/core"
import RenderTextField from "../../fields/RenderTextField"
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))
const fields = [
  {
    field: (
      <Field name="email">
        {(fieldState) => (
          <RenderTextField
            fullWidth
            label="Email"
            margin="normal"
            fieldState={fieldState}
          />
        )}
      </Field>
    ),
  },
  {
    field: (
      <Field name="password" type="password" margin="normal">
        {(fieldState) => (
          <RenderTextField
            fullWidth
            label="Password"
            margin="normal"
            fieldState={fieldState}
          />
        )}
      </Field>
    ),
  },
]
export default function SignInPage({ history }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [rememberMe, setRememberMe] = useState(false)
  // Handle click
  function handleClick(event) {
    event.preventDefault()
    const { id } = event.target
    if (id === "checkbox") setRememberMe(!rememberMe)
    if (id === "signUpLink") history.push("/signup")
  }
  const handleSubmit = async ({ email, password }) => {
    let data = {
      email,
      password,
    }
    try {
      const response = await dispatch(loginUser(data))
      const { loginSuccess, message } = response.payload
      if (loginSuccess === true) {
        window.localStorage.setItem("userId", response.payload.userId)
        if (rememberMe) {
          window.localStorage.setItem("rememberMe", email)
        } else {
          localStorage.removeItem("rememberMe")
        }
        history.push("/")
      } else {
        return { [FORM_ERROR]: message }
      }
    } catch (error) {
      return { [FORM_ERROR]: "Login Failed" }
    }
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Form
            onSubmit={handleSubmit}
            render={({
              handleSubmit,
              submitError,
              submitting,
              pristine,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                {fields.map((item, index) => item.field)}
                {submitError ? (
                  <Alert severity="error">{submitError}</Alert>
                ) : (
                  <></>
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      id="checkbox"
                      value="remember"
                      color="primary"
                      checked={rememberMe}
                      onClick={handleClick}
                    />
                  }
                  label="Remember me"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={submitting}
                >
                  {submitting && <CircularProgress />}
                  {!submitting && "Sign In"}
                </Button>
              </form>
            )}
          />
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link id="signUpLink" variant="body2" onClick={handleClick}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  )
}
