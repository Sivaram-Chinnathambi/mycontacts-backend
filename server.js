const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const dotenv = require("dotenv").config()

const PORT = process.env.PORT || 5000

app.use(express.json());
app.use("/api/contacts/", require("./routes/conactRoutes"));
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})