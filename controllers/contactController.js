const asyncHandler = require("express-async-handler");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Get all contacts from a Controller!"})
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Get the contact with id ${req.params.id}`})
});

//@desc Create a contact
//@route POST /api/contact
//@access public
const createContact = asyncHandler( async (req, res) => {
    console.log("Request body is: ", req.body)
    const {Name, Email, Phone} = req.body

    if(!Name || !Email || !Phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    res.status(200).json({message: "Create a contact"})
});

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update the contact with id ${req.params.id}`})
});

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete the contact with id ${req.params.id}`})
});

module.exports = {getContacts, getContact, createContact, updateContact, deleteContact};