import React from 'react'
import styles from "./home.module.css";
import { useAuth } from '../../Components/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {

  const Auth = useAuth();

  const navigation = useNavigate();

  const clickHandler = () => navigation("/all-countries");

  return (

    <div className={styles.container}>

      <div className={styles.content}>

        <h1 className={styles._header}>REIZ TECH</h1>

        <button onClick={clickHandler} className={styles._button}>Browse countries</button>

      </div>

    </div>
  )
}

export default Home