import React, { useState, useEffect } from "react";
import { api, localStoragekey } from "../utls/apilinks";
import { NavLink, withRouter } from "react-router-dom";

function Login(props) {
  // email and password
  var [email, setemail] = useState("");
  var [password, setpassword] = useState("");

  // errors
  var [emailerror, setemailerror] = useState("");
  var [passworderror, setpassworderror] = useState("");

  useEffect(() => {}, []);
  var handleChange = ({ target }) => {
    var { name, value } = target;
    if (name === "email") {
      setemail(value);
    } else if (name === "password") {
      setpassword(value);
    }
  };
  var login = () => {
    fetch(api + `/users/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then((userData) => {
        setemail("");
        setpassword("");
        props.onUpdateUser(userData.user);
        props.history.push("/");
        localStorage.setItem(localStoragekey, userData.user.token);
      })
      .catch((error) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              email: "Email or Password is incorrect",
            },
          };
        });
      });
  };

  var handleSubmit = (event) => {
    event.preventDefault();
    login();
  };
  return (
    <div>
      <section className="container">
        <div className="login flex justify-between items-center my-10 column">
          <div className="w-6/12 half">
            <lottie-player
              src="https://assets2.lottiefiles.com/packages/lf20_mragdxra.json"
              background="transparent"
              speed="1"
              style={{ width: "100%" }}
              loop
              autoplay
            ></lottie-player>
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
                Login With Your Details
              </h2>
              <div className="my-4 ">
                <label className="ml-2" htmlFor="">
                  Login <span className="text-sm text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter Your Eamil"
                  className="border my-2 w-full py-2 px-4 mt-2 rounded-lg"
                  name="email"
                  value={email}
                  onChange={(e) => handleChange(e)}
                />
                {/* <span className="text-red-400">{email}</span> */}
              </div>
              <div className="my-4 ">
                <label className="ml-2" htmlFor="">
                  Password <span className="text-sm text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="border w-full py-2 px-4 mt-2 rounded-lg"
                  name="password"
                  value={password}
                  onChange={(e) => handleChange(e)}
                />
                {/* <span className="text-red-400">{password}</span> */}
              </div>
              <div className="w-full flex items-center mt-4">
                <input
                  type="Submit"
                  className=" py-1 px-3 cursor-pointer rounded-lg bg-black text-white "
                />
                <NavLink to="/register">
                  <h6 className="w-full ml-1 text-center text-pink-700">
                    Register ?
                  </h6>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default withRouter(Login);
