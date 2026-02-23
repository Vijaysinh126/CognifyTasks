import bcrypt from "bcrypt";
import User from "../models/auth.model.js";
import jwt from "jsonwebtoken"
export const register = async(req , res) => {
    try {
        
        const { email , fullName , password } = req.body;

        if(!email || !password || !fullName){
            return res.status(400).json({
                error : "All fields are required"
            })
        }

        // creating hashed password
        const hashedPassword = bcrypt.hash(10 , password);

        // existing user
        const ExistingUser = await User.findOne({ email });

        if(ExistingUser){
            return res.status(401).json({
                message : "User Already Exists",
            })
        }

        // create a new user

        const NewUser = await User.create({
            fullName,
            password : hashedPassword,
            email
        })

        // token creation

        const token = jwt.sign({
            id : NewUser._id
        } , process.env.JWT_SECRET)
      return res.status(200).json({
        message : "Accounte created Successfully",
        token,
        fullName : NewUser.fullName,
        email :  NewUser.email
      })  
    } catch (error) {
              console.log("Error While Registering" , error);

        return res.status(500).json({

            error : "Error While Registering",
            success : false

        })
    }
}

export const login = async(req , res) => {

    try {
        
        const { email , password } = req.body;

        if(!email || !password){
            return res.status(400).json({
            message : "Something went Wrong or Need To signin first",
            success : false
           })
        }

        let user = await User.findOne({ email })

        if(!user){
            return res.status(400).json({
            message : "Incorrect Email",
            success : false
          })
        }

        const isMatchedPassword = bcrypt.compare(password , user.password)

        if(!isMatchedPassword){
            return res.status(400).json({
            message : "Icorrect Password",
            success : false
         })
        }

          //Generating token 1.payload

          const payload = {
            id : user._id
          }

          const token = jwt.sign(payload , process.env.JWT_SECRET)

          user = {
            _id : user._id,
            fullName : user.fillName,
            email : user.email
          }

        //   storing token to cookie
        
        return res.status(200)
        .cookie("token" , token , {
            maxAge : 1 * 24 * 60 * 60 * 1000,
            httpOnly : true,
            sameSite : "none",
            secure : true
        })
        .json({
            message : "Login Successfully Done",
            user ,
            success : true
        })
    } catch (error) {
        console.log("Error While Login" , error);

        return res.status(400).json({
            message : "Error while Login",
            
            success : false
        })
    }
}

const logout = async(req , res) => {
    try {
        
        return res.status(200)
        .cookie("token" , {
            maxAge : 0
        })
        .json({
            message : "Logged out Successfully",
        })
    } catch (error) {
        console.log("Error while Logout");

        return res.status(400).json({
            
            message : "Error while Logout",
            success : false
        })
    }
}