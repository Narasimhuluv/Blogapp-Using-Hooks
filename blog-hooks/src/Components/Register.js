import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { api } from "../utls/apilinks";

function Register(props) {
  // var [username, setusername] = useState("");
  // var [email, setemail] = useState("");
  // var [password, setpassword] = useState("");
  var [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    errors: {
      username: "",
      email: "",
      password: "",
    },
  });

  var registerfetch = () => {
    let { email, password, username, errors } = state;
    if (username && password && email) {
      fetch(api + "users", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ user: { username, password, email } }),
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((data) => {
              for (let key in data.errors) {
                errors[key] = `${key} ${data.errors[key]}`;
              }
              return Promise.reject(errors);
            });
          }
          return res.json();
        })
        .then(({ user }) => {
          setState({ password: "", email: "", username: "", errors });
          props.history.push("/login");
        })
        .catch((errors) => setState({ ...state, errors: errors }));
    }
  };

  var handleChange = ({ target }) => {
    var { name, value } = target;
    var errors = state.errors;
    setState({ ...state, [name]: value, errors });
  };

  var handleSubmit = (event) => {
    event.preventDefault();
    registerfetch();
  };

  return (
    <section className="container ">
      <div className="login flex justify-between items-center my-10 column">
        <div className="w-6/12 m-auto half">
          <lottie-player
            src="https://assets7.lottiefiles.com/packages/lf20_q5pk6p1k.json"
            background="transparent"
            speed="1"
            style={{ width: "85%" }}
            loop
            autoplay
          ></lottie-player>
          {/* <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_mragdxra.json"  background="transparent"  speed="1"  style={{width : "100%",}}  loop  autoplay></lottie-player> */}
        </div>
        <div className="w-6/12 m-auto half">
          <form
            action=""
            onSubmit={handleSubmit}
            className="border w-8/12 m-auto shadow-md p-6 py-20 rounded-xl"
          >
            {/* <lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_hdiNFs.json"  background="transparent" style={{width : "60%",margin: "auto"}}  speed="1"  loop  autoplay></lottie-player> */}
            <img
              className="w-4/12 h-1/6  m-auto mb-8"
              src="/images/placeholder.png"
              alt=""
            />
            <h2 className="text-lg font-semibold ">
              Register With Your Details
            </h2>
            <div className="mt-4">
              <label className="ml-2" htmlFor="">
                Username <span className="text-sm text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Your username"
                className="border w-full py-2 px-4 rounded-lg"
                value={state.username}
                name="username"
                onChange={(e) => handleChange(e)}
              />
              {/* <span className="text-red-500 text-sm">{username}</span> */}
            </div>
            <div className="mt-4">
              <label className="ml-2" htmlFor="">
                Email <span className="text-sm text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter Your email"
                className="border w-full py-2 px-4 rounded-lg"
                value={state.email}
                name="email"
                onChange={(e) => handleChange(e)}
              />
              {/* <span className="text-red-500 text-sm">{email}</span> */}
            </div>
            <div className="mt-4">
              <label className="ml-2" htmlFor="">
                Password <span className="text-sm text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Password"
                className="border w-full py-2 px-4 rounded-lg"
                value={state.password}
                name="password"
                onChange={(e) => handleChange(e)}
              />
              {/* <span className="text-red-500 text-sm">{password}</span> */}
            </div>

            <div className="w-full flex items-center mt-4">
              <input
                type="Submit"
                className=" py-1 px-3 rounded-lg bg-black text-white "
              />
              <NavLink to="/login">
                <h6 className="w-full ml-1 text-center text-pink-700">
                  Login ?
                </h6>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
