import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import './logIn.scss';
import {findUser} from '../api/api';

const LogIn = () => {
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");
    async function authorize(login, password) {
        await findUser(login, password).then(({data}) => {
            if (data.length > 0) {
                localStorage.setItem("id", JSON.stringify(data[0].id));
                window.location.href = "/";
            } else {
                alert('Неправильный логин или пароль');
            }
        }) 
    }

    return (
        <>
            <div className="log-in">            
                <h1>Авторизация</h1>
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
                <button onClick={() => authorize(login, password)}>Войти</button>
                <br/>
                <hr/>
                <NavLink to="/registration">Создать аккаунт</NavLink>
                </div>

        </>

    );
}

export default LogIn;
