import React, { useState } from "react";
import { articleapi, localStoragekey } from "../utls/apilinks";
import { withRouter } from "react-router";

function NewArticle(props) {
  var [state, setState] = useState({
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
  var postArticle = () => {
    var storagekey = localStorage[localStoragekey];
    if (storagekey) {
      fetch(articleapi, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${storagekey}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          article: {
            title: state.title,
            description: state.description,
            body: state.body,
            tagList: state.tagList.split(",").map((tag) => tag.trim()),
          },
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Can not create new article!");
          } else {
            return res.json();
          }
        })
        .then((newArticleData) => {
          console.log(newArticleData);
          props.history.push("/");
          setState({
            title: "",
            description: "",
            body: "",
            tagList: "",
          });
        })
        .catch((errors) => {
          setState({ errors });
        });
    }
  };
  var handleChange = ({ target }) => {
    var { name, value } = target;
    var errors = state.errors;
    switch (name) {
      case "title":
        errors.title = value.length === 0 ? "Can't be leave Empty" : "";
        break;
      case "description":
        errors.description = value.length === 0 ? "Can't be leave Empty" : "";
        break;
      case "body":
        errors.body = value.length === 0 ? "Can't be leave Empty" : "";
        break;
      case "tagList":
        errors.tagList = value.length === 0 ? "Can't be leave Empty" : "";
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
    postArticle();
  };
  var { title, description, body, tagList } = state.errors;
  return (
    <div className="container">
      <form
        action=""
        onSubmit={handleSubmit}
        className="border w-9/12 m-auto p-5 mt-10 rounded-lg"
      >
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-700">
            Add Article
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </p>
        </div>
        <fieldset>
          <div className="flex w-full justify-between">
            <div className="w-6/12 mx-2">
              <label
                htmlFor="Title"
                className="block leading-7 text-sm text-gray-600"
              >
                Title <span className="text-sm text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={state.title}
                onChange={handleChange}
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              <span className="text-sm text-red-500">{title}</span>
            </div>
            <div className="w-6/12 mx-2">
              <label
                htmlFor="Description"
                className="block leading-7 text-sm text-gray-600"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                value={state.description}
                onChange={handleChange}
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              <span className="text-sm text-red-500">{description}</span>
            </div>
          </div>

          <div className="mx-2">
            <label
              htmlFor="Content"
              className="block leading-7 text-sm text-gray-600"
            >
              Content
            </label>
            <textarea
              id="message"
              name="body"
              value={state.body}
              onChange={handleChange}
              className="w-full bg-gray-100 bg-opacity-50  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-60 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
            <span className="text-sm text-red-500">{body}</span>
          </div>

          <div className="flex items-end">
            <div className="w-6/12  mx-2">
              <label
                htmlFor="tagList"
                className="block leading-7 text-sm text-gray-600"
              >
                tagList
              </label>
              <input
                type="text"
                name="tagList"
                value={state.tagList}
                onChange={handleChange}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              <span className="text-sm text-red-500">{tagList}</span>
            </div>
            <input
              type="submit"
              className="cursor-pointer text-white h-10 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default withRouter(NewArticle);
