import React, { useEffect, useState } from 'react'
import classes from "./countriesListItem.module.css";
import icon_saved from "../Assets/heart_saved.jpg"
import icon_unsaved from "../Assets/heart_unsaved.png"

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/context/AuthContext';

const ListItem = (props) => {

    const {country} = props;
    const navigation = useNavigate();
    const Auth = useAuth();

    const AuthFavorites = Auth.currentUser ? Auth.favorites : null;

    const doesCountrySaved = AuthFavorites ? AuthFavorites.filter(saved => saved.name === country.name)[0] : false;



    const onLikeHandler = async() => {

        if(Auth.currentUser && country){

            try {
                const request = await Auth.addCountryToFavorites(country);

            } catch (error) {
                console.log("err: ", error)
            }

        }
    }

    const onDetailsHandler = () => {
        navigation(`/details/${country.name}`);
    }


    return (

        <div className={classes.container}>

            <ul className={classes.list_ul}>
                <li>{country.name}</li>
                <li>{country.region}</li>
                <li>{country.area}</li>
            </ul>

            <div className={classes.controlls}>
                <button onClick={onDetailsHandler}>Details</button>
                <img onClick={onLikeHandler} className={classes.love_icon} src={doesCountrySaved ? icon_saved : icon_unsaved} />
            </div>

        </div>
    )
}

export default ListItem