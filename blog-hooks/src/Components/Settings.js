import React from "react";
import { api, localStoragekey } from "../utls/apilinks";
import { withRouter } from "react-router";
import { useState } from "react/cjs/react.development";

function Settings(props) {
  console.log(props);
  var [state, setState] = useState({
    isLoading: false,
    username: "",
    email: "",
    password: "",
    image: "",
    bio: "",
    errors: {
      username: "",
      email: "",
      password: "",
      image: "",
      bio: "",
    },
  });

  function UpdateUser() {
    var storagekey = localStorage[localStoragekey];
    var { username, email, password, image, bio } = state;
    if (storagekey) {
      fetch(api + `/user`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${storagekey}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          user: {
            username: username,
            email: email,
            password: password,
            image: image,
            bio: bio,
          },
        }), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((userData) => {
          // console.log(userData.user.user)
          props.onUpdateUser(userData.user);
          props.history.push("/");
        });
    }
  }

  // Validates email address of course.
  var validEmail = (email) => {
    var re =
      /^\s*[\w\-+_]+(\.[\w\-+_]+)*@[\w\-+_]+\.[\w\-+_]+(\.[\w\-+_]+)*\s*$/;
    return re.test(email);
  };

  var handleChange = ({ target }) => {
    var { name, value } = target;
    var errors = state.errors;
    switch (name) {
      case "username":
        errors.username =
          value.length < 5 ? "Username Must not be Less than 5 Characters" : "";
        break;

      case "email":
        errors.email = validEmail(value) ? "" : "Email is Invalid";
        break;

      case "password":
        errors.password =
          value.length < 6 ? "Password Must not be Less than 6 Characters" : "";
        break;
      default:
        break;
    }
    setState({
      ...state,
      [name]: value,
    });
  };
  var handleSubmit = (event) => {
    event.preventDefault();
    UpdateUser();
  };

  var { username, email, password } = state.errors;
  if (state.isLoading) {
    return (
      <img className="m-auto mt-36 w-2/12" src="/images/loading.gif" alt="" />
    );
  }

  return (
    <div className="container flex p-10 py-20 column">
      <div className="w-5/12 border rounded-lg half">
        <lottie-player
          src="https://assets10.lottiefiles.com/private_files/lf30_aiklsxys.json"
          background="transparent"
          speed="1"
          style={{ width: "100%" }}
          loop
          autoplay
        ></lottie-player>
      </div>

      <section className="max-w-4xl p-6 mx-auto bg-white rounded-lg  dark:bg-gray-800 half">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Account settings
        </h2>

        <form onSubmit={handleSubmit}>
          <fieldset className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Username <span className="text-sm text-red-500">*</span>
              </label>
              <input
                name="username"
                value={state.username}
                onChange={handleChange}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <p className="text-red-500 text-sm">{username}</p>
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Email Address <span className="text-sm text-red-500">*</span>
              </label>
              <input
                name="email"
                value={state.email}
                onChange={handleChange}
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <p className="text-red-500 text-sm">{email}</p>
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Password <span className="text-sm text-red-500">*</span>
              </label>
              <input
                name="password"
                value={state.password}
                onChange={handleChange}
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              <p className="text-red-500 text-sm">{password}</p>
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Profile Pic
              </label>
              <input
                type="text"
                name="image"
                value={state.image}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">Bio</label>
              <input
                type="text"
                name="bio"
                value={state.bio}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </fieldset>

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default withRouter(Settings);
