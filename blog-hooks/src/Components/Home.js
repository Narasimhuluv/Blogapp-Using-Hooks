import React, { useState, useEffect } from "react";
import { articleapi } from "../utls/apilinks";
import AllTags from "./AllTags";
import Articles from "./Articles";

function Home() {
  // allarticles
  var [articles, setArticles] = useState([]);
  // tagname
  var [tagname, setTagname] = useState("");
  var [isLoading, setisLoading] = useState(true);

  // filters
  var [articlesperpage, setarticlesperpage] = useState(10);
  var [activeindexpage, setactiveindexpage] = useState(1);
  var [articlescount, setarticlescount] = useState(0);

  var fetcharticles = () => {
    var offset = (activeindexpage - 1) * 10;
    var limit = articlesperpage;
    var tag = tagname;
    fetch(
      articleapi + `/?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`)
    )
      .then((res) => res.json())
      .then((allarticles) => {
        setArticles(allarticles.articles);
      });
  };
  useEffect(() => {
    fetcharticles();
    return () => {};
  }, []);

  return (
    <div className="articlesContainer">
      <div className="w-full flex mt-10 justify-between">
        <div className="w-8/12 flex justify-start flex-wrap ">
          {articles.map((each) => (
            <Articles article={each} key={each.slug} />
          ))}
        </div>

        <div className="w-4/12">
          <AllTags />
        </div>
      </div>
    </div>
  );
}
export default Home;
