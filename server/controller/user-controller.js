import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import User from '../model/user.js';
import Token from '../model/token.js'

dotenv.config()

export const  signupUser=async (req,res)=>{

    try{
        
        // const salt=await bcrypt.genSalt()
        const hashedPassword=await bcrypt.hash(req.body.password,10) // second argument is salt and the process is asynchronous because it takes time for hashing 
        const user={name:req.body.name,username:req.body.username,password:hashedPassword};
        const newUser=new User(user);
        await newUser.save();
        return res.status(200).json({msg:'signup successful'});
    }catch(error){
        return res.status(500).json({msg:'error while signup the user'});
    }  
}

export const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if(!user){
        return response.status(400).json({ msg: "Username doesnot match." })
    }

    try {
        let match = bcrypt.compare(request.body.password, user.password)
        if(match){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' })
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)

            const newToken = new Token({ token: refreshToken })
            await newToken.save();
            return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username })
        } else {
            return response.status(400).json(request.body.password, user.password)
        }
    } catch (error) {
        return response.status(500).json({ msg: 'Error while logging in the user.' })
    }
}



































