import React, {useState} from 'react';
import './registration.scss';
import {NavLink} from 'react-router-dom';
import {findUserRegisration, registrationUser} from '../api/api';

const Registration = () => {
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");
    const register = (login, password) => {
        if (login.length > 3 && password.length > 3) {
            findUserRegisration(login).then(res => {
                if (res.data.length === 0) {
                    registrationUser(login,password).then(() => {
                        window.location.href = "/profile";
                    });
                } else {
                    alert("Логин уже занят");
                }
            });
        } else {
            alert("Логин или пароль меньше 4-x символов");
        }
    }
    return (
        <div className="registration">
            <h1>Регистрация</h1>
            <hr/>
            <div className="input-block">
                <input 
                    onChange={(e) => setLogin(e.target.value)} 
                    value={login} 
                    placeholder="Логин" type="text"/>
                <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                placeholder="Пароль" type="password"/>
            </div>
            <button onClick={() => register(login, password)}>Зарегистрироваться</button>
            <br/>
            <hr/>
            <NavLink to="/">Авторизация</NavLink>
        </div>
    );
}

export default Registration;
