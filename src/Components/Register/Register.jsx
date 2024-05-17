import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import auth from "../../Firebase/Firebase.config";

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(e);
    console.log("form submit");
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email);
    // console.log(password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        console.log(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
          />
          <br />
          <input
            className="w-3/4 mb-5 p-4"
            type="password"
            name="password"
            id=""
            placeholder="password pls"
          />
          <br />
          <input
            className="btn btn-secondary w-3/4 mb-5 text-center mx-auto p-4"
            type="submit"
            value="Register"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
