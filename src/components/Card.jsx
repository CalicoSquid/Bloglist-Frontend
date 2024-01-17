import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import PropTypes from "prop-types";

Card.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
};

export default function Card({ blog, user, deleteBlog, updateBlog }) {
  const [showDetails, setShowDetails] = useState(false);
  const [likesCount, setLikesCount] = useState(blog.likes);
  const [open, setOpen] = useState(false);

  const handleCloseAndDelete = () => {
    setOpen(false);
    deleteBlog(blog.id);
  };

  const toggleShow = () => {
    setShowDetails(!showDetails);
  };

  const handleUpVote = (blog) => {
    setLikesCount((prevLikes) => {
      const newLikes = prevLikes + 1;
      updateBlog(blog, newLikes);
      return newLikes;
    });
  };

  const handleDownVote = (blog) => {
    setLikesCount((prevLikes) => {
      const newLikes = prevLikes - 1;
      updateBlog(blog, newLikes);
      return newLikes;
    });
  };

  return (
    <div className="card flex">
      <div className=" likes flex col">
        {showDetails && (
          <>
            <Button
              name="vote up"
              label="▲"
              onClick={() => handleUpVote(blog)}
              type="button"
            />

            <p>{likesCount}</p>
            <small>Likes</small>

            <Button
              name="vote down"
              label="▼"
              onClick={() => handleDownVote(blog)}
              type="button"
            />
          </>
        )}
      </div>

      <div className=" blog flex col">
        <h3 className="blog-title">{blog.title}</h3>
        <p>{blog.author}</p>
        {showDetails && (
          <div className="details flex">
            <div className="text">
              <a href={blog.url}>{blog.url}</a>
            </div>

            <div className="user">{blog.user.username}</div>
          </div>
        )}

        <div className="card-buttons flex">
          <Button
            name="show-details"
            label={showDetails ? "Hide Details" : "Show details"}
            onClick={toggleShow}
            type="button"
          />
          {user.id === blog.user.id && (
            <Button
              name="delete"
              label="Delete"
              onClick={() => setOpen(true)}
              type="button"
            />
          )}
        </div>
      </div>
      <Modal
        deleteBlog={handleCloseAndDelete}
        open={open}
        setOpen={setOpen}
        name={blog.title}
        message={`Are you sure you want to delete ${blog.title}?`}
        action={true}
      />
    </div>
  );
}
