import {jwtDecode} from 'jwt-decode';

/**
 * Function to check if the JWT is expired
 * @return {boolean} True if the token is expired, false otherwise
 */

function isTokenExpired(){
    const token = getToken();
    if(!token){
        return true;
    }
    try{
        const {exp} = jwtDecode(token); // decond token to get the expiration time
        console.log("date time now: ", Date.now());
        console.log("expiration time: ", exp );
        const res = Date.now() >= exp*1000; // check if the token is expired
        console.log("res: ", res);
        return res;
    } catch(error){
        console.log("Error checking token expiration: ", error);
        return true;
    }
}

export function checkTokenAndRedirect(){
    // Check if the token is expired
    if(isTokenExpired()){
        console.log("enter checks")
        localStorage.clear();
        // will reload the page and redirect to the login page
        window.location.href = '/';
    }
}
/**
 * Function to get the JWT token from localStorage
 * @return {string | null} The token if it exists, null otherwise
 */
export function getToken(){
    return localStorage.getItem('token');
}