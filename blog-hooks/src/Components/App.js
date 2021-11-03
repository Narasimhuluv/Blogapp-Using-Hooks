import React, { useState, useEffect } from "react";
import Header from "./Header";
import Hero from "./Hero";
import { Switch, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import { localStoragekey, userVerify } from "../utls/apilinks";
import NewArticle from "./NewArticle";
import Settings from "./Settings";
import Profile from "./Profile";
import UpdateArticle from "./UpdateArticle";
import IndividualArticle from "./IndividualArticle";

function App() {
  var [signInuser, setsignInuser] = useState(null);
  var [isLogged, setisLogged] = useState(false);
  var [isverifying, setisverifying] = useState(true);

  var onUpdateUser = (userData) => {
    setsignInuser(userData);
    setisLogged(true);
    localStorage.getItem(localStoragekey, userData.token);
  };

  var getuser = () => {
    var storagekey = localStorage[localStoragekey];
    console.log(storagekey);
    if (storagekey) {
      fetch(userVerify, {
        method: "GET",
        headers: {
          authorization: `Token ${storagekey}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then((user) => {
          onUpdateUser(user);
          setisverifying(false);
          console.log(user.user.username, "hello user");
        })
        .catch((errors) => console.log(errors));
    }
  };

  useEffect(() => {
    getuser();
    return () => {};
  }, []);

  if (isverifying) {
    return <h2>Loading . . . . .</h2>;
  }
  // var [signInuser, setsignInuser] = useState(null);
  console.log(signInuser);
  return (
    <div>
      <Header isLogged={isLogged} />
      {isLogged ? (
        <AuthenticatedApp
          isLogged={isLogged}
          signInuser={signInuser}
          onUpdateUser={onUpdateUser}
        />
      ) : (
        <UnAuthenticatedApp isLogged={isLogged} onUpdateUser={onUpdateUser} />
      )}
    </div>
  );
}
function AuthenticatedApp(props) {
  var { isLogged, onUpdateUser, signInuser } = props;
  return (
    <>
      <div>
        <Switch>
          <Route path="/" exact>
            <Hero isLogged={isLogged} />
            <Home />
          </Route>

          <Route path="/articles" exact>
            <NewArticle />
          </Route>

          <Route exact path="/articles/:slug/update">
            <UpdateArticle />
          </Route>
          <Route exact path="/articles/:slug">
            <IndividualArticle
              isLogged={isLogged}
              {...props}
              signInuser={signInuser}
            />
            {/* <Comments {...props}/> */}
          </Route>

          <Route path="/user">
            <Settings onUpdateUser={onUpdateUser} />
          </Route>

          <Route path="/profiles" exact>
            <Profile signInuser={signInuser} />
          </Route>
        </Switch>
      </div>
    </>
  );
}

function UnAuthenticatedApp(props) {
  var { onUpdateUser, isLogged } = props;
  return (
    <>
      <div>
        <Switch>
          <Route path="/" exact>
            <Hero isLogged={isLogged} />
            <Home />
          </Route>
          <Route path="/users" exact>
            <Register />
          </Route>
          <Route path="/users/login">
            <Login onUpdateUser={onUpdateUser} />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
