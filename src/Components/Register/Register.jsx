import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import auth from "../../Firebase/Firebase.config";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
//50-4 Simple Input Field Validation, Error, And Success Message
//50-5 Regular Expression Validation And Toggle Show Password
//50-7 Forget Or Reset Password, Toggle Registration And Login----5min

const Register = () => {
  const [registerErr, setRegisterErr] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(e);
    console.log("form submit");
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(accepted);
    // console.log(email);
    // console.log(password);
    if (password.length < 6) {
      setRegisterErr("password should be 6 charecter or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterErr("password should be at least one uppercase letter");
      return;
    } else if (!accepted) {
      setRegisterErr("pls accept our terms and conditions");
      return;
    }
    setRegisterErr("");
    setRegisterSuccess("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        console.log(result.user);
        setRegisterSuccess("successfully register done");
        sendEmailVerification(result.user).then(() => {
          alert("pls check your email & verify your account");
        });
      })
      .catch((err) => {
        console.log(err);
        setRegisterErr(err.message);
      });
  };
  console.log(registerErr);
  return (
    <div className="mx-auto w-3/4 bg-cyan-200">
      <div className="w-1/2 mx-auto ">
        <h2 className="text-3xl text-center mb-5">Pls register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="w-3/4 mb-5 p-4"
            type="text"
            name="email"
            id=""
            placeholder="type your email address"
            required
          />
          <br />
          <div className="relative">
            <input
              className="w-3/4 mb-5 p-4"
              // type="password"
              type={showPassword ? "text" : "password"}
              name="password"
              id=""
              placeholder="password pls"
              required
            />
            <span
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="text-2xl absolute -ml-10 my-4"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <br />
          <div>
            <input type="checkbox" name="terms" id="terms" />
            <lavel htmlFor="terms">
              Accept our <a href="">terms & conditions</a>{" "}
            </lavel>
          </div>
          <input
            className="btn btn-secondary w-3/4 mb-5 text-center mx-auto p-4"
            type="submit"
            value="Register"
          />
        </form>
        {registerErr && <p className="text-red-600">{registerErr}</p>}
        {registerSuccess && <p className="text-green-600">{registerSuccess}</p>}
        <p>
          Already have an account ? <Link to="/login">Go To Login</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
