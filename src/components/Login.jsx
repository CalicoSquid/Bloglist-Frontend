import { CircularProgress } from "@mui/material";
import Button from "./Button";
import PropTypes from "prop-types";

Login.propTypes = {
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default function Login({
  setPassword,
  setUsername,
  handleLogin,
  loading,
}) {
  return (
    <form action="submit" className="login-form flex" id="login-form">
      <div className="login-fields flex col">
        <input
          type="text"
          id="username"
          className="login-input input"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="password"
          className="login-input input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        loading={loading}
        name="login-button"
        id="login-button"
        label={!loading ? "Login" : <CircularProgress />}
        onClick={handleLogin}
        type="button"
      />
    </form>
  );
}
