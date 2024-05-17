import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import auth from "../../Firebase/Firebase.config";
//50-4 Simple Input Field Validation, Error, And Success Message

const Register = () => {
  const [registerErr, setRegisterErr] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(e);
    console.log("form submit");
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email);
    // console.log(password);
    if (password.length) {
      setRegisterErr("password should be 6 charecter or longer");
      return;
    }
    setRegisterErr("");
    setRegisterSuccess("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        console.log(result.user);
        setRegisterSuccess("successfully register done");
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
          <input
            className="w-3/4 mb-5 p-4"
            type="password"
            name="password"
            id=""
            placeholder="password pls"
            required
          />
          <br />
          <input
            className="btn btn-secondary w-3/4 mb-5 text-center mx-auto p-4"
            type="submit"
            value="Register"
          />
        </form>
        {registerErr && <p className="text-red-600">{registerErr}</p>}
        {registerSuccess && <p className="text-green-600">{registerSuccess}</p>}
      </div>
    </div>
  );
};

export default Register;
