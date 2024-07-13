const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET_KEY);

const { validateEmail } = require("../utils/common");
const database = require("../config/config");
const { sendMail } = require("./mailController");

exports.signUp = async (req, res) => {
    try {
        const { fname, lname, email, phone, password, confirmPassword } = req.body;

        if (!fname || !lname || !email || !phone || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                type: "error",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
                type: "error",
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
                type: "error",
            });
        }

        const addUserQuery = `
            INSERT INTO users (fname, lname, email, phone, password)
            VALUES ('${fname}', '${lname}', '${email}', '${phone}', '${cryptr.encrypt(password)}')
        `

        database.query(addUserQuery, (err, results, fields) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({
                        success: false,
                        "message": 'Email already exists',
                        type: "error",
                    });
                }
                console.error('Error creating user:', err.message);
                return res.status(500).json({
                    success: false,
                    "message": err.message,
                    type: "error",
                });
            }
            sendMail(email, 'Signup Successfull', `Dear ${fname},\n\nYou have successfully created your account on our platform.\n\nBest regards,\nPCRM`);
            res.status(200).json({
                "message": "User Created Successfully!",
                "success": true,
                type: "success",
            });
        });

    } catch (err) {
        console.log("catch err", err);
        res.status(500).json({
            success: false,
            message: "something went wrong",
            type: "error",
        });
    }
};

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                type: "error",
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
                type: "error",
            });
        }

        const getUserQuery = `SELECT * FROM users WHERE email = '${email}'`;

        database.query(getUserQuery, (err, results, fields) => {
            if (err) {
                console.error('Error fetching user:', err.message);
                return res.status(500).json({
                    success: false,
                    "message": err.message,
                    type: "error",
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    success: false,
                    "message": 'User not found',
                    type: "error",
                });
            }
            console.log(results)

            const decryptedPassword = cryptr.decrypt(results[0].password);

            if (password !== decryptedPassword) {
                return res.status(400).json({
                    success: false,
                    "message": 'Wrong password',
                    type: "error",
                });
            }

            sendMail(email, 'Signin Successfull', `Dear ${results[0].fname} ${results[0].lname},\n\nYou have successfully logged in to your account.\n\nBest regards,\nPCRM`);
            res.status(200).json({
                "message": "User Logged In Successfully!",
                "success": true,
                type: "success",
            });
        });

    } catch (err) {
        console.log("catch err", err);
        res.status(500).json({
            success: false,
            message: "something went wrong",
            type: "error",
        });
    }
}
