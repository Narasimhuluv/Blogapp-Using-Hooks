import React, { useState, useEffect } from "react";
import { tagurl } from "../utls/apilinks";

function AllTags() {
  // tags
  var [tags, setTags] = useState([]);

  var fetchtags = () => {
    fetch(tagurl)
      .then((res) => res.json())
      .then((alltags) => {
        setTags(alltags.tags);
        console.log(tags, "alltags");
      });
  };
  useEffect(() => {
    fetchtags();

    return () => {};
  }, []);

  var filterTags = tags.filter((elem, index) => {
    return tags.indexOf(elem) === index;
  });
  return (
    <>
      <h2 className="m-4  text-xl font-extrabold">Popular Tags</h2>
      <div className=" h-2/6 py-2 rounded-lg overflow-y-scroll Tags">
        <div className=" flex justify-between flex-wrap ">
          {filterTags.map((each) =>
            each === "" ? (
              ""
            ) : (
              <button
                key={each}
                className="border py-1 px-4 m-1 rounded-lg shadow-md text-sm"
                // {
                //   tagName === each
                //     ? "border py-1 px-4 m-1 rounded-lg bg-yellow-400 text-white shadow-md text-sm"
                //     : "border py-1 px-4 m-1 rounded-lg shadow-md text-sm"
                // }
                // onClick={() => this.props.handleTag(each)}
                // data-value={each}
              >
                {each}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default AllTags;
