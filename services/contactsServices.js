import fs from 'node:fs/promises';
import { nanoid } from 'nanoid';
import path from 'node:path';

const contactsPath = path.join('db', 'contacts.json');

export async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, { encoding: 'utf-8' });
        return JSON.parse(data);
    } catch (err) {
        throw err;
    }
}

export async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        return contacts.find(contact => contact.id === contactId);
    } catch (err) {
        throw err;
    }
}

export async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const idx = contacts.findIndex(contact => contact.id === contactId);
        if (idx === -1) {
            return null;
        }
        const [removedContact] = contacts.splice(idx, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return removedContact;
    } catch (err) {
        throw err;
    }
}

export async function addContact(data) {
    try {
        const contacts = await listContacts();
        const { name, email, phone } = data;
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (err) {
        throw err;
    }
}

export async function updateContact(id, data) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    contacts[index] = { ...contacts[index], ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}