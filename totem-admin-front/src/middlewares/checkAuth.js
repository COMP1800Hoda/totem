import jwt from 'jsonwebtoken'
const checkAuth = (req,res,next) => {
    const token = req.cookies.authToken;
    if(!token){
        return res.status(401).json({error: "Unauthorized access, please log in first"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error){
        return res.status(403).json({error: "Invalid or expired token"});
    }
}

export default checkAuth;