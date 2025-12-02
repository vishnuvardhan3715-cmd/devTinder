const checkAuth = (req, res, next) =>{
    const pass = "xyz";
    const isAuthorized = (pass === "xyz");
    if(isAuthorized) {
        console.log("Authorized");
        next();
    }
    else{
        res.status(401).send("UnAuthorized Access");
    }
};
module.exports = {checkAuth};