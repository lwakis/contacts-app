import React from 'react';
import Contacts from './Contacts';
import './profile.scss';
import exitPng from '../../assets/image/exit.png';

const Profile = ({id}) => {    
    const exit = () => {
        localStorage.removeItem("id");
        window.location.href = "/";
    }
    return (
        <div className="profile">
            <div className="header">
                <a href="/" onClick={() => exit()}>
                    <img src={exitPng} alt="exit"/>
                </a>
            </div>
            <Contacts id={id}/>
        </div>
    )
}

export default Profile