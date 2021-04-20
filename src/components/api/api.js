import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5000/',
})

export function findUser(login, password) {
  return instance.get(`users?login=${login}&password=${password}`);
}

export function findUserRegisration(login) {
  return instance.get(`users?login=${login}`);
}
export async function registrationUser(login, password) {
  let id = await instance.get('/users').then(({data}) => data.length + 1);
  localStorage.setItem("id", JSON.stringify(id));
  await instance.post('users/', { 
    id,
    login,
    password,
    contacts: [] 
  });
}

export async function getUser(id) {
  return instance.get('users/' + id);
}

export async function createContact(id, contacts, newContact) {
  const user = await getUser(id);
  console.log(contacts, newContact);
  contacts.unshift(newContact);
  let payload = contacts;
  instance.patch('users/' + user.data.id, {
    contacts: payload
  });
}

export async function editContactsApi(id, contact, contacts) {
  const user = await getUser(id);
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === contact.id) {
      contacts[i] = contact;
    }
  }
  let payload = contacts;
  await instance.patch('users/' + user.data.id, {
    contacts: payload
  });
}

export async function deleteContacts(id, contact, contacts) {
  const user = await getUser(id);
  let payload = contacts.filter(item => item.id !== contact.id);
  return instance.patch('users/' + user.data.id, {
    contacts: payload
  });
}
