import React, { useContext, useState, useEffect } from "react"

import app, { auth, database } from "../../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(null);

  const signup = async(username, email, password) => {

      try {
        const signUpReq = await auth.createUserWithEmailAndPassword(email, password);
        const user = signUpReq.user;
    
        const userRef = database.ref('users/' + user.uid + "/user");
        const newUserRef = userRef.push();
    
        await newUserRef.set({
          username,
          email,
        })
    
        return {status: true, response: user};
    
      } catch (error) {
        return {status: false, response: error};
      }
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const logout = () => {
    return auth.signOut()
  }

  const getCountriesFromFavorites = async() => {


    if(auth.currentUser){

      const favoritesRef = database.ref('users/' + auth.currentUser.uid + "/favorites");

      favoritesRef.on("value", (snapshot) => {
        if(snapshot.exists()){
          setFavorites(Object.values(snapshot.val()))
        }
        else(setFavorites(null))
      })
    }

    else return null;

    
  }

  const doesCountryExistInFavorites = (country) => {
    getCountriesFromFavorites();

    if(currentUser){
      let existingCountry = false;

      if(favorites)existingCountry = favorites.filter(item => item.name === country.name)[0];
      
      return existingCountry;
    }

    else return null;


    
  }

  const addCountryToFavorites = async(country) => {


    if(currentUser){

      const favoritesRef = database.ref('users/' + currentUser.uid + "/favorites");
      const newCountryRef = favoritesRef.push();

      if(!doesCountryExistInFavorites(country)){
        await newCountryRef.set({
          ...country
        })

        getCountriesFromFavorites();

        return true;
      }
      else return false
    }

    else return null;
    

  }


  useEffect(() => {
    getCountriesFromFavorites();

    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        setCurrentUser({email: user.email, uid: user.uid});
        getCountriesFromFavorites();
      }
      else setCurrentUser(null)
      setLoading(false)
    })

    return unsubscribe
  }, [])


  const value = {
    currentUser,
    login,
    signup,
    logout,
    favorites,
    doesCountryExistInFavorites,
    addCountryToFavorites,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}