import React, { useState } from 'react'
import classes from "./authentication.module.css"
import { useNavigate } from 'react-router-dom'
import {useAuth} from "../../Components/context/AuthContext";
import LoadingSpinner from "../../Components/loadingSpinner";

const Authentication = () => {

  const { signup, login, currentUser} = useAuth();
  const navigate = useNavigate();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isValid, setIsValid] = useState(false);


  const validationHandler = (value) => {
    if(value.length > 3){
      if(isLoginMode){
        if(emailValue.length > 4 && passwordValue.length > 4){
          setIsValid(true)
        }
        else setIsValid(false)
      }
      else if(!isLoginMode){
        if(nameValue.length > 3 && emailValue.length > 4 && passwordValue.length > 4){
          setIsValid(true)
        }
        else setIsValid(false)
      }
    }else setIsValid(false)
  }


  const nameHandler = (event) => {
    const name = event.target.value;
    setNameValue(name)
    validationHandler(name);
  }


  const emailHandler = (event) => {
    const email = event.target.value;
    setEmailValue(email)
    validationHandler(email);
  }


  const passwordHandler = (event) => {
    const password = event.target.value;
    setPasswordValue(password)
    validationHandler(password);
  }


  const changeformHandler = () => {
    setIsLoginMode(!isLoginMode);
  }


  const resetInputs = () => {
    setEmailValue("");
    setNameValue("");
    setPasswordValue("");
  }


  const FormSubmitHandler = async(event) => {
    event.preventDefault();
    
    let values;
    if(isLoginMode) values = {email: emailValue, password: passwordValue};
    if(!isLoginMode) values = {name: nameValue, email: emailValue, password: passwordValue};

    let user;
    if(!isLoginMode){
      try {
        setIsError(null);
        setIsLoading(true);
        const signUpReq  = await signup(values.name, values.email, values.password);
        user = JSON.stringify(signUpReq);

        if(!user)throw new Error("Unexpected error in signup process");
        setIsLoading(false);
        navigate('/');       
      } catch (error) {
        setIsLoading(false);
        setIsError(error.message || "Failed to sign in")
      }
    }

    if(isLoginMode){

      try {
        setIsLoading(true);
        const loginReq = await login(values.email, values.password)
        user = JSON.stringify(loginReq)
        setIsLoading(false);
        navigate('/');
      } catch (error) {
        setIsLoading(false);
        setIsError(error.message || "Failed to login in")
      }
    }

    resetInputs();

  }

  return (

    <div className={classes.container}>
        
        {isLoading && !isError && <LoadingSpinner asOverlay />}


        {!isError && !isLoading && 
        
            <div className={classes.content}>
            
                <form onSubmit={FormSubmitHandler} className={classes.form_container}>

                { !isLoginMode && <input value={nameValue} onChange={nameHandler} className={`${classes.form_input} ${nameValue.length > 3 ? "" : classes.invalid}`} placeholder="Name" />}
                <input value={emailValue} onChange={emailHandler} className={`${classes.form_input} ${emailValue.length > 4 ? "" : classes.invalid}`} placeholder="Email" />
                <input value={passwordValue} onChange={passwordHandler} className={`${classes.form_input} ${passwordValue.length > 5 ? "" : classes.invalid}`} placeholder="Password"/>

                {isValid && <button className={classes.submit_btn}>Submit</button>}
                
                </form>

                <button className={classes.switch_btn} onClick={changeformHandler}>Switch to {isLoginMode? "Sign-Up" : "Login"}</button>

            </div>
        }

    </div>
  )
}

export default Authentication