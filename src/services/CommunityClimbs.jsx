import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CommunityClimbs() {
  const [climbsShown, setClimbsShown] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      apiCall("http://localhost:3007/climbs/public");
    } else {
      console.log('User not logged in.')
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
    <>
      <div className="">
        <h2>Community Climbs Page</h2>
        {climbsShown.length > 0 ? (
          <div>
            {climbsShown.map((climbShown, i) => (
              <div key={i}>
                <h3>{climbShown.title}</h3>
                <p>{climbShown.grade}</p>
              </div>
            ))}
          </div>
        ) : (
          "There seems to be a problem, please log into your account to view community climbs."
        )}
      </div>
    </>
  );
}
