import Login from "./Login";
import Logout from "./Logout";
import logo from "../assets/logo-orange.png"

export default function Header({
  setUsername,
  setPassword,
  handleLogin,
  user,
  handleLogout,
  loading
}) {
  return (
    <div className="nav flex">
      <div className="header-left flex">
        <img src={logo} alt="logo" style={{height: "50px", width: "50px"}} />
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
        <Logout 
        user={user} 
        handleLogout={handleLogout} 
        loading={loading} 
        />
      )}
    </div>
  );
}
