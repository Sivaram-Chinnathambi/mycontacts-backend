const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//@desc Register the user
//@route POST api/user/register
//access public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!req.body || !username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!")
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("Email address is already registered!");
    }
    
    //Hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username, email, password: hashPassword 
    });

    if(user){
        res.status(201).json({"_id": user._id, "email": user.email});
    }
    else {
        res.status(400);
        throw new Error("User information is not valid");
    }
});

//@desc Login the user
//@route POST api/user/login
//access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1m"}
    );
        res.status(200).json({ accessToken});
    }
    else {
        res.status(401);
        throw new Error("Email or password is incorrect");
    }
});

//@desc Get the current user information
//@route POST api/user/current
//access private
const currentUser = asyncHandler(async (req, res) => {
    res.json({message: "Current user Information from controller"});
});

module.exports = {registerUser, loginUser, currentUser};