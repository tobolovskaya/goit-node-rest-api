import fs from 'fs/promises';
import path from 'path';

const contactsPath = path.join(process.cwd(), 'db', 'contacts.json');

export async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}
