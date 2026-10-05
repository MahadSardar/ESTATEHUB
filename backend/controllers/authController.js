import bcrypt from "bcryptjs"
import User from "../models/User.js"
import VerificationToken from "../models/VerificationToken.js"
import generateToken from "../utils/generateToken.js"
import generateOtp from "../utils/generateOtp.js"
import sendEmail from "../utils/sendEmail.js"

const sendOtp = async (user,type) => {
    const code = generateOtp();

    await VerificationToken.deleteMany({user:user._id,type})

    await VerificationToken.create({
        user:user._id,
        type,
        code,
        expiresAt: new Date(Date.now()+10*60*1000),
    })

    await sendEmail(
        user.email,
        "Your Estatehub code",
        `Your code is ${code}.It expires in 10 minutes`
    )
}

const userData =(user)=>({
    _id:user._id,
    name:user.name,
    email:user.email,
    phone:user.phone,
    role:user.role,
    avatarUrl:user.avatarUrl,
    bio:user.bio,
    isVerified:user.isVerified,
})

export const register = async (req,res) => {
    try {
        const {name,email,phone,password} = req.body;

        if(!name|| !email|| !phone|| !password){
            return res.status(400).json({message:"All fields are required"})
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be atleast 6 characters"})
        }
        const exists = await User.findOne({
            $or: [{email:email.toLowerCase()},{phone}],
    });
    if(exists){
        return res.status(400).json({message:"Email or phone already registered"});
    }
    const passwordHash = await bcrypt.hash(password,10)
    const user = await User.create({name,email,phone,passwordHash});

    await sendOtp(user,"verify");

    res.status(201).json({
        message:"Account created.Check your email for the code",
        email:user.email,
    })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const verifyEmail = async (req,res) => {
    try {
        const {email,code} = req.body;

        const user = await User.findOne({email:email?.toLowerCase()})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const record = await VerificationToken.findOne({
            user:user._id,
            type:"verify",
            code,
        });
        if(!record){
            return res.status(400).json({message:"Invalid Code"})
        }
        if(record.expiresAt < new Date()){
            return res.status(400).json({message:"Code expired"})
        }
        
        user.isVerified = true;
        await user.save();
        await VerificationToken.deleteMany({user:user._id, type:"verify"});

        res.json({
            message:"Email verified",
            token:generateToken(user._id),
            user:userData(user),
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}