const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
    res.status(200).json({message: "Get all contacts!"})
});

router.route("/:id").get((req, res) => {
    res.status(200).json({message: `Get a contact with id ${req.params.id}`})
});

router.route("/").post((req, res) => {
    res.status(200).json({message: "Crete a contact"})
});

router.route("/:id").put((req, res) => {
    res.status(200).json({message: `Update a contact ${req.params.id}`})
});

router.route("/:id").delete((req, res) => {
    res.status(200).json({message: `Delete a contact ${req.params.id}`})
});

module.exports = router;