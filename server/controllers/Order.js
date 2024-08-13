const order = require("../models/Order")

exports.create=async(req,res)=>{
    try{
        
        return res.status(200).json({ 
			success:true,
            message:"Order created successfully",
            data:customer
		});

    } catch(error)
    {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message,
        });
    }
}