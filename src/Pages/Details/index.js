import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classes from "./details.module.css"
import fetchMovies from "../../Components/utils/fetchMovies";
import LoadingSpinner from "../../Components/loadingSpinner";

const Details = (props) => {
  const {name} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const dataURL = `https://restcountries.com/v3.1/name/${name}`;

  
  useEffect(() => {

    const fetchData = async() => {

      try {

        setIsLoading(true)

        const request = await fetchMovies(dataURL);

        if(!request.status) throw new Error(request.error);

        setData(request.data[0]);


        setIsLoading(false);
        
      } catch (error) {

        console.log("Error: ", error);
      }


    }

    fetchData();

  },[])



  const CountryDataSubject = ({subjectKey, subjectValue}) => (
    <div className={classes.subject_container}>
      <h1>{subjectKey}</h1>
      <h3>{subjectValue}</h3>
    </div>
  )
    
  



  return (
    <div className={classes.container}>
      {isLoading && !data && <LoadingSpinner asOverlay/>}
      {data && !isLoading && 

        <div className={classes.content}>

            <img src={data.flags.png} />

            <ul className={classes.data_subjects_ul}>

              <CountryDataSubject subjectKey={"Name"} subjectValue={data.name.official} />
              <CountryDataSubject subjectKey={"Area"} subjectValue={data.area} />
              <CountryDataSubject subjectKey={"Region"} subjectValue={data.region} />
              <CountryDataSubject subjectKey={"SubRegion"} subjectValue={data.subregion} />
              <CountryDataSubject subjectKey={"Population"} subjectValue={data.population} />

            </ul>
          
        </div>

      }

    </div>
  )
}

export default Details