const twilio = require('twilio')
require("dotenv").config()
exports.sendSMS=async (number,otp) => {
    try {
        const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
        var num="+91"+number
        var otpStatement="Your Otp is "+otp
        // console.log(num)
        const message = await client.messages.create({
            body: otpStatement,
            from: '+12564881667',
            to: num
        });
        return {success:true,message}
        // console.log(message, "Message Sent");
        // res.status(200).json({ success: true, message: 'Message sent successfully', data: message });
    } catch (error) {
        // console.log('err.................', error);
        return {success:false,error}
        // res.status(500).json({ success: false, message: 'Message not sent', error: error.message });
    }
}