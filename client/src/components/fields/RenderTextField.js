import React from "react"
import PropTypes from "prop-types"
import { TextField } from "@material-ui/core"

function RenderTextField({ fieldState, ...others }) {
  const {
    input,
    meta: { error, touched, submitError, dirtySinceLastSubmit, submitting },
  } = fieldState

  const displayError =
    touched && (error || (submitError && !dirtySinceLastSubmit)) && !submitting

  return (
    <TextField
      {...input}
      {...others}
      disabled={submitting}
      error={displayError}
      margin="normal"
      helperText={displayError ? submitError || error : ""}
    />
  )
}

RenderTextField.propTypes = {}

export default RenderTextField
