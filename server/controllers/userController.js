// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OTPVerification = require('../models/OTPVerification');
const nodemailer = require('nodemailer');
const Profile = require("../models/Profile")
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);


}

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(" hi ",email)

        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already Exists"
            })
        }


        const otp = generateOTP();


        // Save OTP verification record
        const otpVerification = new OTPVerification({
            email,
            otp
        });
        await otpVerification.save();

        // Send OTP via email
        await transporter.sendMail({
            from: 'projectera678@gmail.com',
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}`
        });

        console.log(otpVerification)

        return res.status(200).json({
            success: true,
            message: "Otp sent",
            otp
        })
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: "Otp not sent"
        })
    }
}

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, otp } = req.body;
        console.log(otp)
        console.log(firstName)
        console.log(req.body)
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if user or email already exists
        const existingUser = await User.findOne({ $or: [{ firstName }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // const response = await OTPVerification.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        const resp=await OTPVerification.find({email}).sort({createdAt:-1}).limit(1)
        console.log("respo ",resp)
        // console.log(`response ye rha ${response}`);
        console.log(otp);
        console.log(resp[0]?.otp);


        if (otp !== resp[0]?.otp) {
            return res.status(400).json({
                success: false,
                message: "Otp is not valid"
            })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            additionalDetails:profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
            followers: []

        });
        await newUser.save();


        res.status(200).json({ message: 'User Signup Successfully' });

    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.login = async (req, res) => {
    try {
        //get data from req body
        const { email, password } = req.body;

        //validate data
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fielda are require "
            })
        }
        //user check exist or not 
        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered"
            })
        }
        //generate JWT token
        if (await bcrypt.compare(password, user.password)) {

            const payload = {
                email: user.email,
                id: user._id,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            })
            user.token = token;
            user.password = undefined;

            //create cookie

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in"
            })
        }



        else {
            return res.status(401).json({
                success: false,
                message: 'Password is incorrect'
            })
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Login Failure, plz try again',
        })
    }
};




exports.verifyOtp = async (req, res) => {
    const { firstName, lastName, password, email, otp } = req.body;

    try {
        // Check if OTP is valid
        const otpVerification = await OTPVerification.findOne({ email, otp,password, verified: false }).populate('user');
        if (otpVerification) {
            // Update OTP verification status
            otpVerification.verified = true;
            await otpVerification.save();

            // Save user to database if not already associated
            if (!otpVerification.user) {
                const user = await User.create({ firstName, lastName, email, password });
                otpVerification.user = user;
                await otpVerification.save();
            }

            return res.status(200).json({ message: 'OTP verified and user registered successfully' });
        } else {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// Controller function to fetch all users
exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find({}, { password: 0, __v: 0 });

        // Send the response with the users data
        res.status(200).json(users);
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.updateProfile = async (req, res) => {
	try {
		const { dateOfBirth = "", about = "", contactNumber } = req.body;
		const id = req.user.id;

		// Find the profile by id
		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);

		// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;

		// Save the updated profile
		await profile.save();

		return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};