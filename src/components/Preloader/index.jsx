import React from 'react';
import preloader from '../../assets/image/preloader.gif';
import './preloader.scss'

const Preloader = () => {
    return (
        <div className="preloader">
            <img src={preloader} alt="Загрузка"/>
        </div>
    );
}

export default Preloader;
