
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token format is invalid"
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.SECRET_TOKEN
        )

        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid and expired token",
            message: error.message
        })
    }
}




exports.authorizeRole = (allowedRole) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    message: "User not authenticated"
                });
            }

            if (!allowedRole.includes(req.user.role)) {
                res.status(403).json({
                    message: "Access denied"
                })
            }

            next();
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}


exports.validateRegister = (req, res, next) => {

    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password || !phone) {
            res.json({
                message: "All fields are required"
            });
        }

        next();

    } catch (error) {
        res.json({
            message: error.message
        });
    }


}

