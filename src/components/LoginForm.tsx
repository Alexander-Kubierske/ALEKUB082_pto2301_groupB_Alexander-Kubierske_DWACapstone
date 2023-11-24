import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface LoginFormState {
  username: string;
  password: string;
  showPassword: boolean;
}

const LoginForm: React.FC = () => {
  const [values, setValues] = useState<LoginFormState>({
    username: "",
    password: "",
    showPassword: false,
  });

  const [emailError, setEmailError] = useState<string>("");

  // <=========== Handle text inputs ===========>

  const handleChange =
    (prop: keyof LoginFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
      // Clear email error when user types
      if (prop === "username") {
        setEmailError("");
      }
    };

  // <=========== Toggle Password visibility ===========>

  const handleTogglePasswordVisibility = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  // <=========== Validation and Error Handling ===========>

  const checkEmailInDatabase = (email: string): boolean => {
    // Replace this with your actual database check logic
    // For simplicity, assuming an array of valid emails
    const validEmails = ["test@example.com", "user@example.com"];
    return validEmails.includes(email);
  };

  // <=========== Login final checks ===========>

  const handleLogin = () => {
    if (values.username.trim() === "" || values.password.trim() === "") {
      setEmailError("Email cannot be empty");
      return;
    }
    // Example: Check if the email is a valid format
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.username);

    if (!isValidEmail) {
      setEmailError("Not a valid Email");
      return;
    }

    // Example: Check if the email exists in the database
    const isEmailInDatabase = checkEmailInDatabase(values.username);

    if (!isEmailInDatabase) {
      setEmailError("Account associated with Email does not exist");
      return;
    }
    // Perform the login logic if everything is valid
    // Your login logic here...
  };

  // <=========== Output ===========>

  return (
    <div>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={values.username}
        onChange={handleChange("username")}
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type={values.showPassword ? "text" : "password"}
        value={values.password}
        onChange={handleChange("password")}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
      >
        Login
      </Button>
    </div>
  );
};

export default LoginForm;
