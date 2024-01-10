import Login from "./Login";
import Logout from "./Logout";
import logo from "../assets/logo-orange.png";
import PropTypes from "prop-types";

Header.propTypes = {
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default function Header({
  setUsername,
  setPassword,
  handleLogin,
  user,
  setUser,
  loading,
}) {
  return (
    <div className="nav flex">
      <div className="header-left flex">
        <img src={logo} alt="logo" style={{ height: "50px", width: "50px" }} />
        <h1 className="header">Bloglist</h1>
      </div>

      {!user ? (
        <Login
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={(e) => handleLogin(e)}
          loading={loading}
        />
      ) : (
        <Logout user={user} setUser={setUser} />
      )}
    </div>
  );
}
