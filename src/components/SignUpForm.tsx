import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createClient } from "@supabase/supabase-js";

interface SignUpValues {
  username: string;
  email: string;
  password: string;
  verifyPassword: string;
  showPassword: boolean;
}

interface SignUpErrors {
  passwordMatch: boolean;
  passwordStrength: boolean;
}
const supabase = createClient(
  "https://hfembhazsufruiznyfwu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmZW1iaGF6c3VmcnVpem55Znd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4MzQ0MTYsImV4cCI6MjAxNjQxMDQxNn0.KA6PK_on128h0LIbocODeQEEYMBStw4mVx1CNENpsTU"
);

const signUpNewUser = async (
  userEmail: string,
  userPassword: string,
  passUserName: object
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
      options: {
        data: passUserName,
      },
    });

    if (error) {
      console.error("Sign-up error:", error);
    } else {
      console.log("Sign-up successful:", data);
    }
  } catch (e) {
    console.error("An unexpected error occurred:", e);
  }
};

const SignUpForm = () => {
  const [values, setValues] = useState<SignUpValues>({
    username: "",
    email: "",
    password: "",
    verifyPassword: "",
    showPassword: false,
  });

  const [emailError, setEmailError] = useState<string>("");

  const [errors, setErrors] = useState<SignUpErrors>({
    passwordMatch: false,
    passwordStrength: false,
  });

  // <=========== Handle text inputs ===========>
  const handleChange =
    (prop: keyof SignUpValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });

      setErrors({
        passwordMatch: false,
        passwordStrength: false,
      });
    };

  // <=========== Toggle Password visibility ===========>

  const handleShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  // <=========== Validation and Error Handling ===========>

  const handleVerifyPassword = () => {
    if (values.password !== values.verifyPassword) {
      setErrors({ ...errors, passwordMatch: true });
    } else {
      setErrors({ ...errors, passwordMatch: false });
    }
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(values.password)) {
      setErrors({ ...errors, passwordStrength: true });
    } else {
      setErrors({ ...errors, passwordStrength: false });
    }
  };

  const checkEmailInDatabase = (email: string): boolean => {
    // Replace this with your actual database check logic
    // For simplicity, assuming an array of valid emails
    const validEmails = ["test@example.com", "user@example.com"];
    return validEmails.includes(email);
  };

  // <=========== Sign up final checks ===========>

  const handleSignUp = () => {
    console.log("errors\n\n", errors, "\n\n email errors \n\n", emailError);
    if (
      values.username.trim() === "" ||
      values.email.trim() === "" ||
      values.password === "" ||
      values.verifyPassword === ""
    ) {
      setEmailError("All fields are required");
      return;
    } else {
      setEmailError("");
    }
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);

    if (!isValidEmail) {
      setEmailError("Not a valid Email");
      return;
    }

    const isEmailInDatabase = checkEmailInDatabase(values.username);

    if (isEmailInDatabase) {
      setEmailError("Account already exists with this Email");
      return;
    }

    if (errors.passwordMatch === true || errors.passwordStrength === true) {
      return;
    }

    console.log("signed up");

    const passUserName = {
      username: values.username,
    };

    signUpNewUser(values.email, values.password, passUserName);
  };

  // <=========== Output ===========>

  return (
    <div>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={values.username}
        onChange={handleChange("username")}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={values.email}
        onChange={handleChange("email")}
        error={!!emailError}
        helperText={emailError}
      />
      <div>
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={(e) => {
            handleChange("password")(e);
            validatePassword();
          }}
          onBlur={handleVerifyPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {errors.passwordStrength && (
          <div style={{ color: "red" }}>
            Password must be at least 8 characters long and include a symbol and
            a number.
          </div>
        )}
      </div>
      <TextField
        label="Verify Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type={values.showPassword ? "text" : "password"}
        value={values.verifyPassword}
        onChange={(e) => {
          handleChange("verifyPassword")(e);
          handleVerifyPassword();
        }}
        onBlur={handleVerifyPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {errors.passwordMatch && (
        <div style={{ color: "red" }}>Passwords do not match.</div>
      )}
      <Button variant="contained" color="primary" onClick={handleSignUp}>
        Sign Up
      </Button>
    </div>
  );
};

export default SignUpForm;
