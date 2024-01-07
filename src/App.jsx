import { useState } from "react";
import Header from "./components/Header";
import { useEffect } from "react";
import Blogs from "./components/Blogs";
import blogService from "../services/blogs";
import loginService from "../services/login";
import Error from "./components/Error";
import Create from "./components/Create";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    error: null,
    success: null
  })
  const [loading, setLoading] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

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
      setErrorMessage(error?.response?.data?.error || "Error logging in");
      setMessage(prev => ({
        ...prev,
        error: error?.response?.data?.error || "Error logging in"
      }))
      setLoading(false);
      setTimeout(() => {
        setMessage({
          error: null,
          success: null
        })
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <div className="main">
      <Header
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        user={user}
        handleLogout={handleLogout}
        loading={loading}
      />
      <Error message={message} />
      {user && (
        <div>
          <Create
            setNewBlog={setNewBlog}
            setMessage={setMessage}
            newBlog={newBlog}
            setBlogs={setBlogs}
          />
          <Blogs blogs={blogs} />
        </div>
      )}
    </div>
  );
}

export default App;
