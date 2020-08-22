import React from "react"
import Avatar from "@material-ui/core/Avatar"
import { TextField } from "mui-rff"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import { Form, Field } from "react-final-form"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import RenderTextField from "../../fields/RenderTextField"
import { useDispatch } from "react-redux"
import { registerUser } from "../../../_actions/user_actions"
import { CircularProgress } from "@material-ui/core"

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
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SignUpPage({ history }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  async function handleSubmit({
    fName,
    lName,
    mInit,
    nickName,
    email,
    password,
  }) {
    const data = {
      fName,
      lName,
      mInit,
      nickName,
      email,
      password,
    }
    try {
      const response = await dispatch(registerUser(data))
      const { success } = response.payload
      if (success) {
        history.push("/signin")
      } else {
        alert(JSON.stringify(response))
      }
    } catch (error) {}
  }

  function handleClick(event) {
    const { id } = event.target
    if (id === "signInLink") history.push("/signin")
  }
  const fields = [
    {
      size: 5,
      field: (
        <Field name="fName">
          {(fieldState) => (
            <RenderTextField
              required
              fullWidth
              label="First Name"
              margin="normal"
              fieldState={fieldState}
            />
          )}
        </Field>
      ),
    },
    {
      size: 2,
      field: (
        <Field name="mInit">
          {(fieldState) => (
            <RenderTextField
              required
              fullWidth
              label="Initial"
              margin="normal"
              fieldState={fieldState}
            />
          )}
        </Field>
      ),
    },
    {
      size: 5,
      field: (
        <Field name="lName">
          {(fieldState) => (
            <RenderTextField
              required
              fullWidth
              label="Last Name"
              margin="normal"
              fieldState={fieldState}
            />
          )}
        </Field>
      ),
    },
    {
      size: 12,
      field: (
        <Field name="nickName">
          {(fieldState) => (
            <RenderTextField
              required
              fullWidth
              label="Nick Name"
              margin="normal"
              fieldState={fieldState}
            />
          )}
        </Field>
      ),
    },
    {
      size: 12,
      field: (
        <Field name="email">
          {(fieldState) => (
            <RenderTextField
              required
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
      size: 12,
      field: (
        <Field name="password">
          {(fieldState) => (
            <RenderTextField
              required
              type="password"
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
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Form
          onSubmit={handleSubmit}
          initialValues={{ stooge: "larry", employed: false }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {fields.map((item, index) => (
                  <Grid item xs={12} sm={item.size}>
                    {item.field}
                  </Grid>
                ))}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {submitting && <CircularProgress />}
                {!submitting && "Sign Up"}
              </Button>
            </form>
          )}
        />
        <Grid container justify="flex-end">
          <Grid item>
            <Link onClick={handleClick} id="signInLink" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}
