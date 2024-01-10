import { useRef, useState, useEffect } from "react";

import blogService from "../services/blogs";
import loginService from "../services/login";
import applyMessage from "../utils/applyMessage";

import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Error from "./components/Error";
import Create from "./components/Create";
import Toggle from "./components/Toggle";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    error: null,
    success: null,
  });
  const [loading, setLoading] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const addBlogRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loggedUser = await loginService.login({ username, password });
      blogService.setToken(loggedUser.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      setUser(loggedUser);
      setUsername("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      applyMessage.error(
        setMessage,
        error?.response?.data?.error || "Error logging in"
      );
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleDeleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      applyMessage.success(setMessage, "Deleted blog");
    } catch (error) {
      applyMessage.error(setMessage, "Error deleting blog");
    }
  };

  const handleUpdateBlog = async (blog, likes) => {
    const blogToUpdate = {
      ...blog,
      likes,
      user: blog.user.id,
    };
    try {
      let x = await blogService.update(blogToUpdate);
      console.log(x.data);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (error) {
      console.log(error);
      applyMessage.error(setMessage, "Error");
    }
  };

  return (
    <div className="main">
      <Header
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        user={user}
        setUser={setUser}
        loading={loading}
      />
      <Error message={message} />
      {user && (
        <div>
          <Toggle ref={addBlogRef}>
            <Create
              setNewBlog={setNewBlog}
              setMessage={setMessage}
              newBlog={newBlog}
              setBlogs={setBlogs}
            />
          </Toggle>
          <Blogs
            blogs={blogs}
            user={user}
            deleteBlog={handleDeleteBlog}
            updateBlog={handleUpdateBlog}
          />
        </div>
      )}
    </div>
  );
}

export default App;
