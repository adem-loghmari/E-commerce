import React, { useState } from "react";

const LoginSignUp = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const login = async () => {
    let responseData;

    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => (responseData = data));

    if (responseData.success === true) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };
  const signup = async () => {
    console.log(formData);
    let responseData;

    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => (responseData = data));

    if (responseData.success === true) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 py-16 pt-28">
      <div className="max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl px-6 py-10 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6">{state}</h1>
        <form
          className="w-full flex flex-col gap-4 mb-6"
          onSubmit={(e) => {
            e.preventDefault();
            state === "Login" ? login() : signup();
          }}
        >
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formData.username}
              type="text"
              placeholder="Your Name"
              onChange={changeHandler}
              className="px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow w-full"
            />
          ) : null}
          <input
            name="email"
            value={formData.email}
            type="email"
            placeholder="Email Address"
            onChange={changeHandler}
            className="px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow w-full"
          />
          <input
            name="password"
            value={formData.password}
            type="password"
            placeholder="Password"
            onChange={changeHandler}
            className="px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow w-full"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white text-lg font-bold rounded-xl shadow hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="text-gray-700 text-sm mb-2">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-600 font-bold cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-700 text-sm mb-2">
            Create an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-600 font-bold cursor-pointer hover:underline"
            >
              Click here
            </span>
          </p>
        )}
        <div className="flex items-center gap-2 mt-2 w-full">
          <input type="checkbox" className="accent-blue-600 scale-110" />
          <p className="text-xs text-gray-600">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginSignUp;
