import { CircularProgress } from "@mui/material";
import Button from "./Button";
import { useState } from "react";
import PropTypes from "prop-types";
import blogService from "../../services/blogs";
import applyMessage from "../../utils/applyMessage";

Create.propTypes = {
  newBlog: PropTypes.object.isRequired,
  setNewBlog: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func,
};

export default function Create({
  newBlog,
  setNewBlog,
  setMessage,
  setBlogs,
  toggleVisibility,
}) {
  const [loading, setLoading] = useState(false);

  const handleChangeBlog = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const createdBlog = await blogService.create(newBlog);
      const blogs = await blogService.getAll();

      toggleVisibility();
      setNewBlog({
        title: "",
        author: "",
        url: "",
      });
      setBlogs(blogs);
      setLoading(false);
      applyMessage.success(
        setMessage,
        `${createdBlog.title} was added to the database`
      );
    } catch (error) {
      setLoading(false);
      applyMessage.error(
        setMessage,
        error?.response?.data?.error || "Error creating blog"
      );
    }
  };
  return (
    <form action="submit" className="create-form flex col">
      <div className="form-fields flex col">
        <h2>Create New Blog</h2>
        <div className="input-container">
          <label htmlFor="blog-title">
            Title:
            <input
              name="title"
              value={newBlog.title}
              type="text"
              id="blog-title"
              className="blog-title create-input input"
              placeholder="Blog title"
              onChange={(e) => handleChangeBlog(e)}
            />
          </label>
          <label htmlFor="blog-author">
            Author:
            <input
              name="author"
              value={newBlog.author}
              type="text"
              id="blog-author"
              className="blog-title create-input input"
              placeholder="Blog Author"
              onChange={(e) => handleChangeBlog(e)}
            />
          </label>
          <label htmlFor="blog-url">
            URL:
            <input
              name="url"
              value={newBlog.url}
              type="text"
              id="blog-url"
              className="blog-title create-input input"
              placeholder="Blog Website"
              onChange={(e) => handleChangeBlog(e)}
            />
          </label>
          <Button
            name="close"
            label="✖"
            onClick={toggleVisibility}
            type="button"
          />
        </div>

        <Button
          name="create-button"
          label={
            !loading ? "Create" : <CircularProgress size={28} color="inherit" />
          }
          onClick={(e) => handleCreateBlog(e)}
          disabled={loading}
          type="button"
        />
      </div>
    </form>
  );
}
