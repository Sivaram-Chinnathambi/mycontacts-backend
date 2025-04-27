const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact not found!")
    }
    res.status(200).json(contact);
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

    const contact = await Contact.create({
        name: Name, email: Email, phone: Phone
    });

    res.status(201).json(contact);
});

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    const {Name, Email, Phone} = req.body

    if(!contact){
        res.status(404);
        throw new Error("Contact not found!")
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        {
            name: Name, email: Email, phone: Phone
        },
        {new: true}
    )
    res.status(200).json(updatedContact);
});

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact not found!")
    }

    await Contact.deleteOne(contact);
    res.status(200).json(contact)
});

module.exports = {getContacts, getContact, createContact, updateContact, deleteContact};