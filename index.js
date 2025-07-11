require("dotenv").config();
const express = require('express');
const app = express();
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");
const authRouter = require("./routes/auth-route")
const contactRouter = require("./routes/contact-route")
const serviceRouter = require("./routes/service-route");
const adminRouter = require("./routes/admin-route")


// Frontend URL
const FRONTEND_URL = process.env.FRONTEND_URL

// handling CORS policy here
const corsOptions = {
    origin : FRONTEND_URL,
    methods : "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials : true,
}

app.use(cors(corsOptions));


app.use(express.json());
app.use("/", authRouter);
app.use("/", contactRouter);
app.use("/", serviceRouter)


// lets define admin route 
app.use("/admin",adminRouter)


app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🌐 Server is running on PORT : ${PORT}`)
    })
})

