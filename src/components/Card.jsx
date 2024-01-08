import { useState } from "react";
import Button from "./Button";

export default function Card({ blog, deleteBlog }) {
  const [showDetails, setShowDetails] = useState(false);
  const toggleShow = () => {
    setShowDetails(!showDetails)
  };
  
  return (
    <div className="card flex col">
      <h3>{blog.title}</h3>
      {showDetails && <div className="details">
        <p className="author">Author: {blog.author}</p>
        <p className="likes">Likes: {blog.likes}</p>
        <a href={blog.url}>{blog.url}</a>
      </div>}
      <div className="card-buttons flex">
      <Button
          name="show-details"
          label={showDetails ? "Hide Details" : "Show details"}
          onClick={toggleShow}
        />
        <Button name="delete" label="Delete" onClick={() => deleteBlog(blog.id)}/>
      </div>
      
    </div>
  );
}
