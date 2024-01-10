import Button from "./Button";
import PropTypes from "prop-types";

Logout.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default function Logout({ user, setUser }) {
  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <div className="logout flex">
      <p>Welcome {user.name}</p>
      <Button
        name="logout-button"
        label="Logout"
        onClick={handleLogout}
        type="button"
      />
    </div>
  );
}
