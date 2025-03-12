const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");
const fs = require('fs');
const path = require('path');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

const logFilePath = path.join(__dirname, 'auth.logs');

const logEvent = (message) => {
    const logEntry = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(logFilePath, logEntry, 'utf8');
};

const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await UserModel.findOne({ name });
        const errorMsg = 'Auth failed name or password is wrong';
        
        if (!user) {
            console.log(`[${new Date().toISOString()}] Failed login attempt for ${name} from IP: ${req.ip}`);
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            console.log(`[${new Date().toISOString()}] Failed login attempt for ${name} from IP: ${req.ip}`);
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const jwtToken = jwt.sign(
            { name: user.name, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log(`[${new Date().toISOString()}] User ${name} logged in from IP: ${req.ip}`);
        
        res.status(200).json({
            message: "Login Success",
            success: true,
            jwtToken,
            name
        });
    } catch (err) {
        console.log(`[${new Date().toISOString()}] Error during login attempt: ${err.message}`);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


module.exports = {
    signup,
    login
}