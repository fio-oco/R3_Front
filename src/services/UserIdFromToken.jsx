import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = (token) => {
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;
            return userId;
        } catch (error){
            console.error('Error decoding token;', error);
        }
    } return null;
}