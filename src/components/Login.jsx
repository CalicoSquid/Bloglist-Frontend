import { CircularProgress } from "@mui/material";
import Button from "./Button";

export default function Login({
  setPassword,
  setUsername,
  handleLogin,
  loading,
}) {
  return (
    <form action="submit" className="login-form flex">
      <div className="login-fields flex col">
        <input
          type="text"
          className="login-input input"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="login-input input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        loading={loading}
        name="login-button"
        label={!loading ? "Login" : <CircularProgress />}
        onClick={handleLogin}
       
      />
    </form>
  );
}
