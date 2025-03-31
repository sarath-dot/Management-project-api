//importing modules
const bcrypt = require("bcrypt");
const db = require("../model/index");
const jwt = require("jsonwebtoken");

// Assigning users to the variable User
const User = db.users;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        const data = {
            username: username,
            group_id: group_id,
            last_login: new Date(),
            password: password,
        };
        //saving the user
        const user = await User.create(data);

        //if user details is captured
        //generate token with the user's id and the secretKey in the env file
        // set cookie with the token generated
        if (user) {
            let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            //send users details
            return res.status(200).json({ success: true, user: user });
        } else {
            return res.status(200).json({ success: false, errorMsg: "Details are not correct" })
        };
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};


//login authentication

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!req.body || !req.body.username || !req.body.password) {
            return res.status(400).send('Parameters are missing or invalid');
        }
        //find a user by their email
        const user = await User.findOne({
            where: {
                username: username
            }
        });
        console.log(user)
        //if user email is found, compare password with bcrypt
        if (user) {
            const isSame = password === user.password ? true : false;

            //if password is the same
            //generate token with the user's id and the secretKey in the env file

            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                //if password matches wit the one in the database
                //go ahead and generate a cookie for the user
                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                //send user data
                return res.status(200).json({ success: true, user: user });
            } else {
                return res.status(200).json({ success: false, errorMsg: "Authentication failed" });
            }
        } else {
            return res.status(200).json({ success: false, errorMsg: "Authentication failed" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

module.exports = {
    signup,
    login,
};