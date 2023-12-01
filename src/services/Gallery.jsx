import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from '@mui/material';

export default function Gallery() {
  const isMobile = useMediaQuery('(max-width: 600px)'); 
  const isTablet = useMediaQuery('(max-width: 960px)');

  const [climbsShown, setClimbsShown] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      apiCall("http://localhost:3007/climbs/public");
    } else {
      console.log("User not logged in.");
      navigate("/login");
    }
  }, []);

  function apiCall(url) {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setClimbsShown(data);
      });
  }
  return (
    <Box sx={{ maxwidth: "cover", height: "auto" }}>
      <div className="colour-band"><p></p></div>
      <div className="top-info-container">
        <h2>Community Climbs Page</h2>
        <p>Check out what other members have been up to</p>
        <div className="colour-band"><p></p></div>
        <ImageList variant="masonry" cols={isMobile ? 1 : isTablet ? 2 : 3} gap={isMobile ? 10 : isTablet ? 15 : 10}>
          {climbsShown.map((climbShown, i) => (
            <ImageListItem key={i}>
              <div className="gallery-item-container"
               style={{
                position: "relative",
                marginTop:'5px',
                padding: "8px",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.13)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.parentNode.style.zIndex = 1;
              }}>
                <div className="gallery-text">
                  <h3>
                    {climbShown.title} - {climbShown.location}
                  </h3>
                </div>
                <div className="gallery-image">
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
                </div>
              </div>
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </Box>
  );
}
