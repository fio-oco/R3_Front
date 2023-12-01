import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CepedaRapel from "../media/CepedaRapel.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterClick = async () => {
    navigate("/register");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3007/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      //console.log(data);

      if (response.ok) {
        const { access_token } = data;

        localStorage.setItem("accessToken", access_token);
        navigate("/myclimbs");
      } else {
        console.error("Login failed", response.statusText);
      } 
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <>
      <div
        className="background"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          maxWidth: "1280px",
          height: "100vh",
          backgroundImage: `url(${CepedaRapel})`,
          objectFit: "contain",
        }}
      >
        <div className="login">
            <div>
              {/* <img
                src="https://img.freepik.com/free-vector/flat-design-mountain-range-silhouette_23-2150491868.jpg?w=826&t=st=1701386377~exp=1701386977~hmac=c36978cd31b92f1a78df7e471ec98419ebb6f2905510f77baa8f475ccf4468f6"
                style={{ height: "100px", width: "auto", borderRadius: "100px"}}
              /> */}
            </div>
            <h1>Login </h1>
            <form onSubmit={handleLogin}>
              <label htmlFor="">Username: </label>
              <input
                type="text"
                label="Username"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                label="Password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">
                Login
              </button>
            </form>
            <p>
              Don't have an account yet? 
              <br/>Click{" "}
              <button onClick={handleRegisterClick}>here</button> to register.
            </p>
        </div>
      </div>
    </>
  );
}

// no idea what's happening here
