import { Jwt_SECRET } from "../config";

import  jwt  from "jsonwebtoken";
class JwtService{
    static sign(payload, expiry = '60', secret = Jwt_SECRET) {
        return jwt.sign(payload, secret, { expiresIn: expiry });
    }
}

export default JwtService;  