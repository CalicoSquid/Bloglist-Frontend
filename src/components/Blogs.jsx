import Button from "./Button";

export default function Blogs({ blogs }) {
  const listOfBlogs = blogs.map((blog) => {
    return (
      <div className="card">
        <p className="title">Title: {blog.title}</p>
        <p className="author">Author: {blog.author}</p>
        <p className="url" href={blog.url}>
          Url: <a href={blog.url}>{blog.url}</a>
        </p>
        <p className="likes">Likes: {blog.likes}</p>
        <div className="buttons flex">
          <Button name="card-button" label="Update" />
          <Button name="card-button" label="Delete" />
        </div>
      </div>
    );
  });

  return (
    <div className="blogs flex col">
      <div className="blog-container grid">{listOfBlogs}</div>
    </div>
  );
}
