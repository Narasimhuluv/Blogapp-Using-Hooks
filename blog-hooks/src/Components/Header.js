import React from "react";
import { NavLink } from "react-router-dom";

function Header(props) {
  var { isLogged } = props;
  console.log(isLogged);
  return (
    <div>
      {!isLogged ? (
        <header className="bg-green-100">
          <div className="container flex justify-between items-center">
            <div className="heading text-4xl font-extrabold text-pink-600 flex items-center">
              <lottie-player
                className="lottie"
                src="https://assets10.lottiefiles.com/private_files/lf30_dezgszkb.json"
                background="transparent"
                speed="1"
                style={{ width: "100px", height: "100px", display: "block" }}
                loop
                autoplay
              ></lottie-player>
              <NavLink to="/">
                <h1>Blog App</h1>
              </NavLink>
            </div>

            <div className="flex items-center">
              <NavLink
                to="/users/login"
                activeClassName="bg-green-400 ml-8 text-white font-extrabold text-lg py-1 px-4 rounded-md"
              >
                <h3 className="font-extrabold text-lg">Sign in</h3>
              </NavLink>
              <NavLink to="/users" activeClassName="">
                <h3 className="bg-green-400 ml-8 text-white font-extrabold text-center text-lg py-1 px-4 rounded-md">
                  Sign Up
                </h3>
              </NavLink>
            </div>
          </div>
        </header>
      ) : (
        <header className="bg-green-100 header">
          <div className="container flex justify-between items-center column">
            <div className="heading text-4xl font-extrabold text-pink-600 flex items-center">
              <lottie-player
                className="lottie"
                src="https://assets10.lottiefiles.com/private_files/lf30_dezgszkb.json"
                background="transparent"
                speed="1"
                style={{ width: "100px", height: "100px", display: "block" }}
                loop
                autoplay
              ></lottie-player>
              <NavLink to="/">
                <h1>Blog App</h1>
              </NavLink>
            </div>

            <div className="flex justify-between items-center  w-4/12 header_nav half">
              <NavLink
                to="/"
                activeClassName="text-blue-500 font-extrabold text-sm  rounded-md"
              >
                <h3 className="font-extrabold mt-3 text-sm">Home</h3>
              </NavLink>
              <NavLink
                to="/articles"
                activeClassName="text-blue-500 font-extrabold text-sm  rounded-md"
              >
                <h3 className="font-extrabold mt-3 text-sm">New Article</h3>
                {/* <img className="w-7/12 " src="/images/placeholder.png" alt="" /> */}
              </NavLink>
              <NavLink
                to="/user"
                activeClassName=" text-blue-500 font-extrabold text-sm  rounded-md"
              >
                <h3 className="font-extrabold mt-3 text-sm">Settings</h3>
              </NavLink>
              <NavLink
                to="/profiles"
                activeClassName=" text-blue-500 font-extrabold text-sm  rounded-md"
              >
                <h3 className="font-extrabold mt-3 text-sm">Profile</h3>
              </NavLink>
              <a href="/">
                <h3
                  // onClick={logout}
                  className="font-extrabold mt-3 cursor-pointer text-sm"
                >
                  Logout
                </h3>
              </a>
            </div>
          </div>
        </header>
      )}
    </div>
  );
}

export default Header;
