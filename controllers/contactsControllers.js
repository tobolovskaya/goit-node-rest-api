import * as contactService from "../services/contactsServices.js";

const checkContactExists = async (id, userId, res) => {
    const contact = await contactService.getContact(id, userId);
    if (!contact) {
        res.status(404).json({ message: "Not found" });
        return null;
    }
    return contact;
};

export const getAllContacts = async (req, res, next) => {
    try {
        const user = req.user;
        const contacts = await contactService.listContacts(user.id);
        res.status(200).json(contacts);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const user = req.user;
        const contact = await checkContactExists(id, user.id, res);
        if (!contact) return;
        res.status(200).json(contact);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const contact = await checkContactExists(id, user.id, res);
        if (!contact) return;
        await contactService.removeContact(id, user.id);
        res.status(200).json(contact);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const user = req.user;
        const newContact = await contactService.addContact(req.body, user.id);
        res.status(201).json(newContact);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const contact = await checkContactExists(id, user.id, res);
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
        const user = req.user;
        const contact = await checkContactExists(id, user.id, res);
        if (!contact) return;
        const updatedContact = await contactService.updateStatusContact(id, user.id, req.body);
        res.status(200).json(updatedContact);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
};
