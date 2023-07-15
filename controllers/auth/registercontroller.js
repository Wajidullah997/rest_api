import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { User  } from "../../models";
import bcrypt from 'bcrypt';
import JwtService from "../../services/JwtService";


const registercontroller = {
    async register(req, res, next) {
      

        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        });

        
        console.log(req.body);
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return next(error);
        }
// check if the use in the database already
        try {
    const exist = await User.exists({ email: req.body.email })
            if (exist) {
                return next(CustomErrorHandler.alreadyExist(' this is already exist Token.'));
            } 
            
        
        } catch (err) {
            return next(err )
}
        const { name, email, password } = req.body;
        // haspassward
        const hashPassword = await bcrypt.hash(password, 10);
 
        const user =  new User({
            name,
            email,    
            password: hashPassword
        })
        let acess_token;
        try {
            const result = await user.save();
            console.log(result); 
               // token
           acess_token =  JwtService.sign({ _id: result._id,role: result.role})

        } catch (err) {
            return next(err); 
        }
        res.json({ acess_token: acess_token});
       
    }

};
export default registercontroller;


