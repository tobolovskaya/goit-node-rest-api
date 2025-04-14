import * as contactService from "../services/contactsServices.js";

const checkContactExists = async (id, res) => {
    const contact = await contactService.getContactById(id);
    if (!contact) {
        const error = new Error("Not found");
        error.status = 404;
        throw error;
    }
    return contact;
};

export const getAllContacts = async (req, res, next) => {
    // contactService.populateContacts();
    try {
        const contacts = await contactService.listContacts();
        res.status(200).json(contacts);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await contactService.getContactById(id);
        if (!contact) {
            return res.status(404).json({ message: "Not found" });
        }
        res.status(200).json(contact);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await contactService.removeContact(id);
        if (!contact) {
            return res.status(404).json({ message: "Not found" });
        }
        res.status(200).json(contact);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const newContact = await contactService.addContact(req.body);
        res.status(201).json(newContact);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await checkContactExists(id, res);
        if (!contact) return;
        const updatedContact = await contactService.updateContact(id, req.body);
        res.status(200).json(updatedContact);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const updateFavorite = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await checkContactExists(id, res);
        if (!contact) return;
        const updatedContact = await contactService.updateStatusContact(id, req.body);
        res.status(200).json(updatedContact);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
};
