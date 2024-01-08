import { useState } from "react";
import Card from "./Card";
import Button from "./Button";

export default function Blogs({ blogs, deleteBlog }) {
  

  const listOfBlogs = blogs.map((blog) => {
    return (
      <div className="">
         <Card
          blog={blog}
          deleteBlog={deleteBlog}
        />
      </div>
    );
  });

  return (
    <div className="blogs flex col">
      <div className="blog-container grid">{listOfBlogs}</div>
    </div>
  );
}
