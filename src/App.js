
import React, {useCallback, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

import AllCountries from "./Pages/AllCountries";
import Authentication from "./Pages/Authentification";
import Details from "./Pages/Details";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";

import Footer from "./Components/footer";
import MainNavigation from "./Components/navigation/mainNavigation";

import {AuthProvider} from "./Components/context/AuthContext";

const App = () => {

  const routes = <Routes>
    <Route path="/all-countries" element={<AllCountries />} />
    <Route path="/details/:name" element={<Details />} /> 
    <Route path="/profile" element={<Profile />} /> 
    <Route path="/auth" element={<Authentication />} /> 
    <Route path="/" element={<Home />}></Route>
    <Route path="*" element={<Home />}></Route>
  </Routes>


  return (

    <AuthProvider >

      <Router>
        <MainNavigation />
        <main>{routes}</main>
        <Footer />
      </Router>

    </AuthProvider>

  );
}

export default App;
