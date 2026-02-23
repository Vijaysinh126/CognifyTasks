import jwt from "jsonwebtoken"

const isAuthenticated = (req , res , next) => {
    try {
        
        // creating a token
        const token = req?.cookies?.token
        console.log("Token from middleWare" , token);

        if(!token){
            return res.status(400).json({
                message : "User Not Authenticated Well",
            })
        }

        const decode = jwt.verify(token , process.env.JWT_SECRET)
        
        console.log("Decoded Data => " , decode);

        if(!decode){
            return res.status(400).json({

                message : "Token is not valid",
                success : false

            })
        }

        req.id = decode.userId;
        next()
        
    } catch (error) {
        return res.status(500).json({

            message : "Authentication Failed",
            success : false
        })
    }
}
export default isAuthenticated;