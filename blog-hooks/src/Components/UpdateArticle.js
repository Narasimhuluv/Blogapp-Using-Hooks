import React, { useState } from "react";
import { withRouter } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { articleapi, localStoragekey } from "../utls/apilinks";

function UpdateArticle(props) {
  var [state, setState] = useState({
    isLoading: true,
    title: "",
    description: "",
    body: "",
    tagList: "",
    errors: {
      title: "",
      description: "",
      body: "",
      tagList: "",
    },
  });

  useEffect(() => {
    fetchsignUserArticles();
    return () => {};
  }, []);

  var fetchsignUserArticles = () => {
    var { slug } = props.match.params;
    fetch(articleapi + `/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setState({
          isLoading: true,
          title: data.article.title,
          description: data.article.description,
          body: data.article.body,
          tagList: data.article.tagList,
        });
      });
  };

  var ArticleUpdate = () => {
    var { slug } = props.match.params;
    var storagekey = localStorage[localStoragekey];
    if (storagekey) {
      fetch(articleapi + `/${slug}`, {
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
          article: {
            title: state.title,
            description: state.description,
            body: state.body,
            // tagList : state.tagList.split(",").map(tag => tag.trim())
            tagList: state.tagList,
          },
        }),
      })
        .then((res) => res.json())
        .then((updatedArticle) => {
          console.log(updatedArticle, "updated article");
          props.onUpdateArticle(updatedArticle);
          props.history.push(`/articles/${slug}`);
        });
    }
  };

  var handleChange = ({ target }) => {
    var { name, value } = target;
    var errors = state.errors;
    // switch (name) {
    //   case "title":
    //     errors.title = value.length === 0 ? "Don't Keep blank filed" : "";
    //     break;
    //   case "description":
    //     errors.description = value.length === 0 ? "Don't Keep blank filed" : "";
    //     break;
    //   case "body":
    //     errors.body = value.length === 0 ? "Don't Keep blank filed" : "";
    //     break;
    //   case "tagList":
    //     errors.body = value.length === 0 ? "Don't Keep blank filed" : "";
    //     break;
    //   default:
    //     break;
    // }
    setState({
      ...state,
      [name]: value,
    });
  };
  var handleSubmit = (event) => {
    event.preventDefault();
    ArticleUpdate();
  };
  if (state.isVerifying) {
    return (
      <img className="m-auto mt-36 w-2/12" src="/images/loading.gif" alt="" />
    );
  }
  console.log(props, "updaate article");
  // var { title, description, body, tagList } = state.errors;
  return (
    <div>
      <div className="container flex p-10 py-20">
        <div className="w-6/12 rounded-lg">
          <lottie-player
            src="https://assets3.lottiefiles.com/packages/lf20_0hrr7pgt.json"
            background="transparent"
            speed="1"
            style={{ width: "100%" }}
            loop
            autoplay
          ></lottie-player>
        </div>

        <section className="max-w-4xl w-6/12  p-6 mx-auto bg-white rounded-lg  dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-2">
            Update Article
          </h2>
          <hr />

          <form onSubmit={handleSubmit}>
            <fieldset className="w-full flex flex-wrap justify-between mt-6">
              <div className="w-6/12 mx-1">
                <label className="text-gray-900 dark:text-gray-200">
                  Title
                </label>
                <input
                  name="title"
                  value={state.title}
                  onChange={handleChange}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {/* <span className="text-red-500 text-sm">{title}</span> */}
              </div>

              <div className="w-5/12 my-2">
                <label className="text-gray-900 dark:text-gray-200">
                  TagLists
                </label>
                <input
                  name="tagList"
                  value={state.tagList}
                  type="text"
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {/* <span className="text-red-500 text-sm">{tagList}</span> */}
              </div>

              <div className="w-full my-2">
                <label className="text-gray-900 dark:text-gray-200">
                  Description
                </label>
                <textarea
                  name="description"
                  value={state.description}
                  onChange={handleChange}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                ></textarea>
                {/* <span className="text-red-500 text-sm">{description}</span> */}
              </div>

              <div className="w-full my-2">
                <label className="text-gray-900 dark:text-gray-200">Body</label>
                <textarea
                  name="body"
                  value={state.body}
                  onChange={handleChange}
                  type="text"
                  rows="5"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                ></textarea>
                {/* <span className="text-red-500 text-sm">{body}</span> */}
              </div>
            </fieldset>
            <div className="flex justify-end mt-6">
              <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default withRouter(UpdateArticle);
