const express = require("express")
const app = express();
const dotenv = require("dotenv").config()

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.status(200).json({message: "Get all my contacts"})
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})