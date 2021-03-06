import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import { ReCaptcha } from "./Recaptcha";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  startChatForm: {
    flex: "1",
    backgroundColor: "#fff",
    padding: "10px",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  chatFormInput: {
    marginBottom: "10px",
  },
  recaptchaText: {
    fontSize: ".9em",
    color: "#585858",
  },
}));

function StartChatForm(props) {
  const classes = useStyles();
  const [token, setToken] = useState("");
  const { handleSubmit, errors, register, setValue } = useForm({
    mode: "onChange",
  });

  const onSubmit = (values) => {
    props.onStartChatFormSubmit(values);
    setToken("");
  };

  const onVerifyCaptcha = (token) => {
    setValue("captchaToken", token);
  };

  useEffect(() => {
    register({ name: "captchaToken" }, { required: true });
  });

  return (
    <div className={classes.startChatForm}>
      <p>Fill out the form to start chatting!</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          inputProps={{ name: "name", maxLength: 70 }}
          inputRef={register({
            required: "Required",
            minLength: 1,
            maxLength: 70,
          })}
          fullWidth={true}
          className={classes.chatFormInput}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          error={!!errors.name}
          aria-invalid={errors.name ? "true" : "false"}
          helperText={errors.name ? "Please enter your name." : ""}
        />
        <ReCaptcha
          token={token}
          setToken={setToken}
          onVerifyCaptcha={onVerifyCaptcha}
        />

        <Button
          disabled={props.isSubmitting || token === ""}
          type="submit"
          size="large"
          fullWidth={true}
          variant="contained"
          color="primary"
        >
          {props.isSubmitting ? "Loading.." : "Start Chat"}
        </Button>
        {props.formError && (
          <Alert severity="error" style={{ width: "100%", marginTop: "10px" }}>
            {props.formError}
          </Alert>
        )}
        <p className={classes.recaptchaText}>
          This site is protected by reCAPTCHA and the Google
          <Link href="https://policies.google.com/privacy" target="_blank">
            Privacy Policy
          </Link>
          and
          <Link href="https://policies.google.com/terms" target="_blank">
            Terms of Service
          </Link>
          apply.
        </p>
      </form>
    </div>
  );
}

export default StartChatForm;
