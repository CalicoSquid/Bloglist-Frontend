import Button from "./Button";

export default function Logout({ user, handleLogout, loading }) {
  return (
    <div className="logout flex">
      <p>Welcome {user.name}</p>
      <Button
        name="logout-button"
        label={!loading ? "Logout" : <CircularProgress />}
        onClick={handleLogout}
        loading={loading}
      />
    </div>
  );
}
