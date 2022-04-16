import React from 'react'
import classes from "./profile.module.css";
import { useAuth } from '../../Components/context/AuthContext';
import saved_icon from "../../Assets/heart_saved.jpg";


const Profile = () => {

    const Auth = useAuth();

    const SavedCountries = Auth.currentUser ? Auth.favorites : null;

    const CurrentUser = Auth.currentUser;

    return (
        

        <div className={classes.container}>

            <div className={classes.content}>

                <div className={classes.auth_content}>

                    <ul>
                        <li>Status: </li>
                        <li className={classes.val}>{CurrentUser ? "Active" : "Disconected"}</li>
                    </ul>

                    <ul>
                        <li>Email: </li>
                        <li className={classes.val}>{CurrentUser ? `${CurrentUser.email}` : "Disconected"}</li>
                    </ul>

                </div>

                


                {SavedCountries && SavedCountries.length > 0 ? 
                
                    <ul className={classes.saved_ul}>
                        <img className={classes.icon} src={saved_icon} />
                        {
                            SavedCountries.map(country => <li key={Math.random()}>{country.name}</li>)
                        }

                    </ul>

                    :

                    <h1 className={classes._no_saved_countries}>No selected countries</h1>

                }
                

            </div>

        </div>

    )
}

export default Profile