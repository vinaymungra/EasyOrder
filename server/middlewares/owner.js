const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.owner = async (req, res, next) => {
    try {
        // console.log(req.header("Authorization")) //whatever name you give from frontend services/operations/bussiness/createBussiness that name you have to use
        // console.log(req.header("Authorization"))

        var get1=JSON.parse(req.header("Authorization")?.replace("token=", "")) 
        // var get2=req.header("Cookie")?.replace("token=", "")
        // console.log("Owner ");
        // console.log(get1);
        const token = get1;
        if (!token) {
            return res.status(401).json({ success: false, message: `Token Missing` });
        }
        try {
            req.user = await jwt.verify(token, process.env.JWT_SECRET);


        } catch (error) {
            return res.status(401).json({ success: false, message: "Token is invalid" });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: `Something Went Wrong While Validating the Token`,
        });
    }
};
