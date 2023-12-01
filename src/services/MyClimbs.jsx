import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditClimb from "./EditClimb";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import { useMediaQuery } from "@mui/material";

export default function MyClimbs() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 960px)");

  const [climbsShown, setClimbsShown] = useState([]);
  const [climbId, setClimbId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = (id /* , i */) => {
    setClimbId(id);
    //setIndex(i);
    console.log(id);
    setIsModalOpen(true);
    console.log(isModalOpen);
    //return climbId;
  };

  const handleDelete = (id) => {
    setClimbId(id);
    console.log(id);
    try {
      fetch(`http://localhost:3007/climbs/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((response) => response.json()) // getting an error here for unexpected end to json input ??
        .then(() => {
          console.log(response);
          setClimbsShown((climbsShown) => {
            const alert = "Climb successfully deleted!";
            return (
              alert, climbsShown.filter((climbShown) => climbShown.id !== id)
            );
          });
        });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      apiCall(`http://localhost:3007/climbs/user`);
    } else {
      navigate("/login");
    }
  }, [climbsShown]);

  function apiCall(url) {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClimbsShown(data);
      });
  }

  const handleNewClimbClick = async () => {
    navigate("/newClimb");
  };

  const handleCommClimbs = () => {
    navigate("/gallery");
  }

  const handlePrivacyToggle = (_id, currentPrivacyStatus) => {
    const updatedPrivacyStatus = !currentPrivacyStatus;

    try {
      fetch(`http://localhost:3007/climbs/privacy/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ isPublic: updatedPrivacyStatus }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Updated climb:", data);
          setClimbsShown((prevClimbs) =>
            prevClimbs.map((climb) =>
              climb._id === _id
                ? { ...climb, isPublic: updatedPrivacyStatus }
                : climb
            )
          );
        })
        .catch((error) => {
          console.error("Error updating privacy:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="colour-band">
        <p></p>
      </div>
      <div className="top-info-container">
        <h1>My Climbs</h1>
        <p>
          Welcome to your personal climbs gallery. View and adjust your saved
          climbs below or head to community climbs to view content collective content.
        </p>
        <div className="top-buttons">
        <button onClick={handleNewClimbClick}>Add Climb</button>
        <button onClick={handleCommClimbs}>Community Climbs</button>
        </div>
      </div>
      <div className="colour-band">
        <p></p>
      </div>
      {climbsShown.length > 0 ? (
        <Box sx={{ width: "auto", height: "auto", margin: "30px" }}>
          <ImageList
            variant="masonry"
            cols={isMobile ? 1 : isTablet ? 2 : 3}
            gap={isMobile ? 10 : isTablet ? 15 : 10}
          >
            {climbsShown.map((climbShown, i) => (
              <div
                className="gallery-item-container"
                style={{
                  position: "relative",
                  marginLeft: "20px",
                  marginTop: "15px",
                  padding: "8px",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.parentNode.style.zIndex = 1;
                }}
              >
                <ImageListItem key={i}>
                  <div className="gallery-text-box">
                    <h3>
                      {climbShown.title}, {climbShown.location}
                    </h3>
                    <p>{climbShown.type}</p>
                    <p>{climbShown.date}</p>
                    <p>{climbShown.description}</p>
                    <ul>
                      {climbShown.routes.map((route, index) => (
                        <li key={index}>
                          {route.routeName}: {route.routeGrade}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="gallery-image">
                    {climbShown.imgUrl !== undefined ||
                    climbShown.imgUrl !== null ? (
                      <img
                        srcSet={`${climbShown.imgUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${climbShown.imgUrl}?w=248&fit=crop&auto=format`}
                        alt={climbShown.title}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          transition: "transform 0.3s ease-in-out",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </ImageListItem>
                <button
                  onClick={() => handleEditClick(climbShown._id)}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(climbShown._id)}>
                  Delete
                </button>
                {climbShown.isPublic ? (
                  <PublicIcon
                    className="icon"
                    onClick={() => handlePrivacyToggle(climbShown._id, true)}
                  />
                ) : (
                  <LockIcon
                    className="icon"
                    onClick={() => handlePrivacyToggle(climbShown._id, false)}
                  />
                )}
              </div>
            ))}
          </ImageList>
        </Box>
      ) : (
        <p>No climbs saved yet! Click on add climbs to get started!</p>
      )}
    </>
  );
}
