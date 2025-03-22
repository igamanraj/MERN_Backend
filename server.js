require("dotenv").config();
const express = require('express');
const app = express();
const authRouter = require("./routes/auth-route")
const contactRouter = require("./routes/contact-route")
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

app.use(express.json());
app.use("/", authRouter);
app.use("/", contactRouter);


app.use(errorMiddleware);
const PORT = 5000

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🌐 Server is running on PORT : ${PORT}`)
    })
})

