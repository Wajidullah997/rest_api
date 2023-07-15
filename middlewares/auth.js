import CustomErrorHandler from "../services/CustomErrorHandler";

const auth = (req, res, next) =>{
    let authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader) {
        return next(CustomErrorHandler.unAuthorized());
}
 const token = authHeader.split('[1]')
}
export default auth;