import React from "react";
import { useNavigate } from "react-router-dom";
import CommunityClimbs from "./CommunityClimbs";
import MyClimbs from "./MyClimbs";

const UserPage = () => {

    const navigate = useNavigate();

    const handleMyClimbs = async () => {
        navigate('/myclimbs');
        }
    
    const handleCommunityClimbs = async () => {
        navigate('/communityclimbs');
    }
    return(
        <>
        <div>
            <button onClick={handleMyClimbs}>My Climbs</button>
            <CommunityClimbs />
            <MyClimbs/>
        </div>
        </>

    );
};

export default UserPage;