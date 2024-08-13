const express = require("express");
const fileUpload = require("express-fileupload"); 
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const database = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const ownerRoutes = require("./routes/Owner");
const bussinessRoutes = require("./routes/Bussiness");
const menuRoutes = require("./routes/Menu");
const itemRoutes = require("./routes/Item");
const customerRoutes = require("./routes/Customer")
const orderRoutes = require("./routes/Order")
const categoryRoutes = require("./routes/Category")


const { cloudinaryConnect } = require("./config/cloudinary");
const PORT = 4000 || process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)


database.connect();
cloudinaryConnect();

app.use("/api/v1/owner", ownerRoutes);
app.use("/api/v1/bussiness", bussinessRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/item", itemRoutes);
app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/category", categoryRoutes);



app.listen(PORT, () => {
    console.log("Server is listening on port ", PORT);
});
