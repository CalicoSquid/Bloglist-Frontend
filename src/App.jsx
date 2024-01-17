import { useRef, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import blogService from "../services/blogs";
import loginService from "../services/login";
import applyMessage from "../utils/applyMessage";

import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Message from "./components/Message";
import Create from "./components/Create";
import Toggle from "./components/Toggle";
import Modal from "./components/Modal";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
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
      const decodedToken = jwtDecode(user.token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        handleLogout();
        setOpen(true);
      } else {
        setUser(user);
        blogService.setToken(user.token);
        setLogoutTimeout(decodedToken.exp * 1000 - currentTime * 1000);
      }
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
      setLoading(false);
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

  const setLogoutTimeout = (timeout) => {
    const minutes = Math.floor(timeout / 60000); // 1 minute = 60,000 milliseconds
    const seconds = ((timeout % 60000) / 1000).toFixed(0); // Take the remainder and convert to seconds
    setTimeout(() => {
      handleLogout();
      setOpen(true);
    }, timeout);

    console.log(
      `Session will expire in ${minutes} minutes and ${seconds} seconds.`
    );
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
      await blogService.update(blogToUpdate);
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
      <Message message={message} />
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
      <Modal
        open={open}
        setOpen={setOpen}
        message={"Your session has expired, please log in to continue"}
        action={false}
      />
    </div>
  );
}

export default App;
