import User from "../models/userModel.js";
import bcyrpt from "bcrypt"

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({
            succeded: true,
            user,
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        });
    }
}

const loginUser = async (req, res) => {

    try {
        //requstən username və password alırıq
        const { username, password } = req.body

        //bazada bu adda user varmı deyə yoxlayırıq
        const user = await User.findOne({ username })
        let same = false;
        if (user) {
            //əgər user varsa daxil edilmiş parol ilə bazadakı userin parolunu yoxlayırıq
            same = await bcyrpt.compare(password, user.password)
        }
        else {
            //user yoxdursa 401 erroru
            return res.status(401).json({
                succeded: false,
                error: "There is no such user!"
            });
        }
        if (same) {
            res.status(200).send("You are loggend in")
        }
        else {
            //parol səhvdirsə 401 erroru
            res.status(401).json({
                succeded: false,
                error: "Password are not matched!"
            });
        }

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        });
    }

}

export { createUser, loginUser };

