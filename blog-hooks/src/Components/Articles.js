import React from "react";
import { NavLink } from "react-router-dom";

function Articles(props) {
  var { article } = props;
  // console.log(article, "allARticles");
  return (
    <>
      <article
        key={article.slug}
        className="border my-3 w-5/12 space-y-4 m-5 rounded-xl shadow-md h-72 relative overflow-hidden article"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <img src={"/images/articles_images/" + article.slug + ".png"} alt="" />
        <div className="px-4">
          <h2 className="font-bold">{article.title}</h2>
          <p className="text-sm">{article.description.slice(0, 120)} . . . .</p>
          <NavLink to={`/articles/${article.slug}`}>
            <button className="py-1 rounded-lg px-4 my-6 bg-black text-white">
              Read More
            </button>
          </NavLink>
          <NavLink to={`/profiles/${article.author.username}`}>
            <div className="w-3/12 flex justify-center items-center absolute right-3 bottom-2">
              <small className="font-bold">{article.author.username}</small>
              <img
                src={article.author.image}
                alt=""
                className="w-3/12 rounded-full ml-4"
              />
            </div>
          </NavLink>
        </div>
      </article>
    </>
  );
}

export default Articles;
