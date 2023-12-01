import Login from "./login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../media/BackgroundLanding.jpg";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Landing() {
  const navigate = useNavigate();

  //should I use useCallbacks for these??
  const handleLoginClick = async () => {
    navigate("/login");
  };
  const handleRegisterClick = async () => {
    navigate("/register");
  };

  return (
    <>
      <div
        className="background"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw", // Full width of the viewport
          maxWidth: "1280px",
          height: "100vh", // Full height of the viewport
          display: "flex",
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="landing-content" class="card">
          <div className="landing-text">
            <h1>Your digital climbing logbook</h1>
            <p>
              Bouldering, sport climbing or multipitching, My Mountain Logbook
              is a site to help you record your climbs. Whether you want to keep
              track of your training and progress, or just remember fun days out
              in the mountains, create your own archive of climbs and connect
              with your community.
            </p>
          </div>
          <div className="buttons-container">
            <button onClick={handleLoginClick} size="medium">
              Login
            </button>
            <button onClick={handleRegisterClick} size="medium">
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
// need to get the background image to work here to work on the styling
