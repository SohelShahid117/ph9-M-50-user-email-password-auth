import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import auth from "../../Firebase/Firebase.config";
import { Link } from "react-router-dom";
//50-6 Login User And Accept Terms And Conditions

const Login = () => {
  const [registerErr, setRegisterErr] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const emailRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e);
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    if (password.length < 6) {
      setRegisterErr("password should be 6 charecter or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterErr("password should be at least one uppercase letter");
      return;
    }

    setRegisterErr("");
    setRegisterSuccess("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setRegisterSuccess("successfully register done");
      })
      .catch((error) => {
        console.error(error);
        setRegisterErr(error.message);
      });
  };
  const handleForgetPassword = (e) => {
    const email = emailRef.current.value;
    // console.log("reset password", emailRef.current.value);
    const emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!email) {
      console.log("send reset email", email);
      return;
    } else if (!emailRegex.test(email)) {
      console.log("type a valid email address", email);
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("pls check your email");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a
                  onClick={handleForgetPassword}
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <p>
            Go to this website <Link to="/register">New Register</Link>{" "}
          </p>
          {registerErr && <p className="text-red-600">{registerErr}</p>}
          {registerSuccess && (
            <p className="text-green-600">{registerSuccess}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
