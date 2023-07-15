import { User } from "../../models";
import user from "../../models/user";

const userController = {
    async me(req, res, next) {
        try {
            const user = await User.findOne({ _id: req.user._id })
            
        } catch (err) {
            
        }
    }
};

export default userController;