import React, { useState } from 'react'
import classes from "./countriesList.module.css";
import ListItem from './countriesListItem';

const CountriesList = ({data}) => {

  const [searchTerm, setSearchTerm] = useState("");


  let content_element = (
    data && data.length > 0 
    ? 
    data.map(country => <ListItem key={Math.random()} country={country} />) 
    : 
    <h1 className={classes.list_title}>No countries fetched</h1>
  )


  return (
    <div className={classes.container}>

      {content_element}
        
    </div>
  )
}

export default CountriesList