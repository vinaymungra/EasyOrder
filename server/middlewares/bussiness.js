const jwt = require("jsonwebtoken");
const Bussiness = require("../models/Bussiness");
require("dotenv").config();

exports.bussiness = async (req, res, next) => {
    try {
        const user = req.user;
        // console.log(user);
        if (!user) {
            return res.status(401).json({ success: false, message: `User Not Found` });
        }
        try {
            const bussiness = await Bussiness.findOne({owner:req.user.id})
            // console.log("Bussiness ")
            // console.log(req.user)
            req.user = {
                ...user,
                bussiness
            }   
           
        } catch (error) {
            return res.status(401).json({ success: false, message: " is invalid" });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: `Bussiness not found`,
        });
    }
};
