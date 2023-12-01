import { useState, useEffect } from "react";

export const useTokenValidation = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const validateToken = () => {
      const token = localStorage.getItem('accessToken');
      const isValid = 
      setIsLoggedIn(isValid);
    };

    useEffect(() => {
      validateToken ();
    }, []);
    return isLoggedIn;
};

export default useTokenValidation;
//need to write the logic to check whether the token value saved when a user logs in is valid for the jwt auth guards functions (and also ask whether it makes sense to do this)