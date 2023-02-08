import User from "../models/userModel.js";
import bcyrpt from "bcrypt"
import jwt from "jsonwebtoken";

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
            const token = createToken(user._id);
            //tokenin cookieyə əlavə edilməsi
            res.cookie("jsonwebtoken",token,{
                httpOnly:true,
                maxAge: 1000*60*6*24, //cookienin silinmə müddəti

            });
            res.redirect("/users/dashboard") // əməliyyat düzdürsə yönləndiriləcəyi yer
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

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  };

const getDashboardPage = (req,res)=>{
    res.render("dashboard",{
        link: 'dashboard'
    })
}

export { createUser, loginUser,getDashboardPage };

