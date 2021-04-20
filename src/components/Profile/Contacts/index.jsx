import React, {useEffect, useState} from 'react';
import {getUser, deleteContacts, createContact, editContactsApi} from '../../api/api';
import penPng from '../../../assets/image/pen.png';
import addPng from '../../../assets/image/add.png';
import deletePng from '../../../assets/image/delete.png';

import './contacts.scss';
import Preloader from '../../Preloader';
const Contacts = ({id}) => {
    const [contacts, setContacts] = useState(null);

    const [popupEditContact, setPopupEditContact] = useState(false);
    const [editContactInfo, setEditContactInfo] = useState([]);

    const [nameEditContact, setNameEditContact] = useState("");
    const [numberEditContact, setNumberEditContact] = useState("");

    const [nameNewContact, setNameNewContact] = useState("");
    const [numberNewContact, setNumberNewContact] = useState("");

    const [searchText, setSearchText] = useState("");
    const [searchFound, setSearchFound] = useState([]);

    const [popup, setPopup] = useState(false);
    const [deleteItem, setDeleteItem] = useState(false);
    
    useEffect(() => {
        getUser(id).then(({data}) => {
            setContacts(data.contacts);
        });
    }, [id, deleteItem]);

    const searchItem = (contacts, searchText) => {
        if (searchText.length === 1) {
            setSearchFound(contacts);
        } else {
            setSearchFound(contacts.filter(element => element.name.toLowerCase().includes(searchText.toLowerCase())));
        } 

    }

    const addConctact = (userId, contacts) => {
        if (nameNewContact.length <= 100 && numberNewContact.length <= 15 && nameNewContact.length > 0 && numberNewContact.length > 1) {
            function createNumberId(contacts) {
                let allId = [];
                if (contacts.length !== 0) {
                    for(let i = 0;i <= contacts.length - 1; i++){
                        if (contacts[i].id) {
                            allId.push(contacts[i].id);
                        }
                    }
                    for(let j = 1; j <= Math.max.apply(null, allId); j++){
                        if(!allId.includes(j)){
                            return j;
                        } else if (allId.includes(j) && !allId.includes(allId.length + 1)){
                            return allId.length + 1;
                        }
                    }
                } else {
                    return 1;
                }
            }
            
            let id = createNumberId(contacts);
                createContact(userId, contacts, {id, name: nameNewContact, number: Number(numberNewContact)}).then(() => {
                setNameNewContact("");
                setNumberNewContact("");
                setPopup(false);
            });
        } else if (nameNewContact.length > 100 && numberNewContact.length <= 15) {
            alert("Слишком длинное имя контакта");
        } else if (numberNewContact.length > 15 && nameNewContact.length < 100) {
            alert("Слишком длинный номер");
        } else if (nameNewContact.length <= 0 && numberNewContact.length > 1) {
            alert("Укажите имя");
        } else if (numberNewContact.length <= 1 && nameNewContact.length > 0) {
            alert("Укажите номер");
        } else if (nameNewContact.length > 100 && numberNewContact.length > 15) {
            alert("Слишком длинное имя и номер");
        } else if (numberNewContact.length < 1 && nameNewContact.length <= 0) {
            alert("Укажите номер и имя");
        } 
    }

    const deleteCont = (userId, contact, contacts) => {
        if (!popupEditContact && !popup) {
            deleteContacts(userId, contact, contacts).then(({data}) => {
                if (searchText.length > 1) {
                    for (let i = 0; i < searchFound.length; i++) {
                        if (searchFound[i].id === contact.id) {
                            searchFound.splice(i, 1);
                            setSearchText("");
                            setContacts(data.contacts);
                            setSearchFound(data.contacts);
                            setDeleteItem(false);
                        }
                    }
                } else {
                    setSearchText("");
                    setContacts(data.contacts);
                    setSearchFound(data.contacts);
                    setDeleteItem(false);
                }
        })}
    }
    const editContactPopup = (contact) => {
        if (!popup) {
            setPopupEditContact(!popupEditContact);
            setNameEditContact(contact.name);
            setNumberEditContact(contact.number);
            setEditContactInfo(contact);
        }
    }
    const editContact = (userId, contact, contacts) => {
        editContactsApi(userId, 
            {   
                id: contact.id, 
                name: nameEditContact, 
                number: Number(numberEditContact)
            }, contacts).then(() => {
            setPopupEditContact(false);
        });
    }

    return (
        <>
        {!contacts ? 
            <Preloader />
        : <div className="table-contact">
            {popup && 
                <div className="popup">
                    <button onClick={() => setPopup(!popup)}>X</button>
                    <input onChange={(e) => setNameNewContact(e.target.value)}
                        value={nameNewContact} placeholder="Имя" type="text"/>
                    <input onChange={(e) => setNumberNewContact(e.target.value)}
                        value={numberNewContact} placeholder="Номер" type="number"/>
                    <button onClick={() => addConctact(id, contacts)}>Добавить</button>
                </div>}
            {popupEditContact &&
                <div className="popup-edit">
                    <button onClick={() => setPopupEditContact(!popupEditContact)}>X</button>
                    <input onChange={(e) => setNameEditContact(e.target.value)}
                        value={nameEditContact} placeholder="Имя" type="text"/>
                    <input onChange={(e) => setNumberEditContact(e.target.value)}
                        value={numberEditContact} placeholder="Номер" type="number"/>
                    <button onClick={() => editContact(id, editContactInfo, contacts)}>Сохранить</button>
                </div>}
                {!popupEditContact && !popup && 
                <div className="search">
                    <input onChange={(e) => {
                        setSearchText(e.target.value);
                        searchItem(contacts, searchText);
                    }} 
                    value={searchText} type="search"/>
                </div>}
                <table>
                    <thead>
                        <tr>
                            <td>Имя</td>
                            <td>Номер</td>
                            <td>
                                <button onClick={() => !popupEditContact ? setPopup(!popup) : setPopup(false)}>
                                    <img src={addPng} alt="add"/>
                                </button>
                            </td>
                        </tr>
                    </thead>
                {searchFound.length === 0 ? contacts.map((contact, index) => 
                    <tbody key={index}> 
                        <tr>
                             <td>{contact.name}</td>
                             <td>{contact.number}</td>
                            <td className="td-button"> 
                                <button onClick={() => editContactPopup(contact)}>
                                    <img src={penPng} alt="edit"/>
                                </button>
                                <button onClick={() => {  
                                    setDeleteItem(true);
                                    deleteCont(id, contact, contacts)}}>
                                    <img src={deletePng} alt="delete"/>
                                </button>
                            </td>
                        </tr>
                    </tbody>   
                    )
                    : 
                    searchFound.map((contact, index) => 
                    <tbody key={index}> 
                        <tr>
                             <td>{contact.name}</td>
                             <td>{contact.number}</td>
                            <td className="td-button">
                                <button onClick={() => editContactPopup(contact)}>
                                    <img src={penPng} alt="edit"/>
                                </button>
                                <button onClick={() => deleteCont(id, contact, contacts)}>
                                    <img src={deletePng} alt="delete"/>
                                </button>
                            </td>
                        </tr>
                    </tbody>   
                    ) 
                }
                </table>
        </div>}
        </>
    );
}

export default Contacts;
