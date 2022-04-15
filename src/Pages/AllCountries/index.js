import React, { useEffect, useState } from 'react'
import styles from "./allCountries.module.css";
import fetchCountryData from '../../Components/utils/fetchMovies';
import CountriesList from '../../Countries/countriesList';
import LoadingSpinner from "../../Components/loadingSpinner";

const AllCountires = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [data, setData] = useState(null);

  const countriesURL = `https://restcountries.com/v2/all?fields=name,region,area`;


  useEffect(() => {

    const getCountriesData = async() => {

      try {

        setIsLoading(true);

        const request = await fetchCountryData(countriesURL);

        if(!request.status) throw new Error(request.error || "fetching countries data failed");

        setData(request.data);

        setIsLoading(false);


      } catch (error) {


        setIsError(error);

        console.log("Erorrs: ", error);
      }

    }

    getCountriesData();



  },[]);

  return (
    <div className={styles.container}>

      {isLoading && !data && <LoadingSpinner asOverlay/>}

      { data && !isLoading && <div className={styles.content}>

        <div className={styles.search_bar}>...</div>

        <CountriesList data={data} />

      </div>}

    </div>
  )
}

export default AllCountires