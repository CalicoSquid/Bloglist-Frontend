import Card from "./Card";
import PropTypes from "prop-types";

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
};

export default function Blogs({ blogs, user, deleteBlog, updateBlog }) {
  const listOfBlogs = blogs
    .sort((a, b) => b.likes - a.likes)
    .map((blog) => {
      return (
        <div className="" key={blog.id}>
          <Card
            blog={blog}
            user={user}
            deleteBlog={deleteBlog}
            updateBlog={updateBlog}
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
