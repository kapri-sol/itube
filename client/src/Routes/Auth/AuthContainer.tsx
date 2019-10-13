import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import { LOG_IN, CREATE_ACCOUNT, LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const email = useInput("");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const password = useInput("");

  const [localLoginMutation] = useMutation(LOCAL_LOG_IN);

  const [emailSignIn] = useMutation(LOG_IN, {
    update: (_, { data }) => {
      // tslint:disable-next-line:no-shadowed-variable
      const { emailSignIn } = data;
      if (!emailSignIn.ok) {
        toast.error(emailSignIn.error);
      } else {
        const token = emailSignIn.token;
        localLoginMutation({ variables: { token } });
      }
    },
    variables: { email: email.value, password: password.value }
  });

  const [createAccount] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value
    }
  });

  const onSubmit = e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "" && password.value !== "") {
        emailSignIn();
      } else {
        toast.error("field is required");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== "" &&
        password.value !== ""
      ) {
        createAccount();
      } else {
        toast.error("All field are required");
      }
    }
  };

  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      email={email}
      username={username}
      firstName={firstName}
      lastName={lastName}
      password={password}
      onSubmit={onSubmit}
    />
  );
};
