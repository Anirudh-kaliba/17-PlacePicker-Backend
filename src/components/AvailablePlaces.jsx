import { useState } from 'react';
import Places from './Places.jsx';
import { useEffect } from 'react';
import Error from './Error.jsx';
import sortPlacesByDistance from '../loc.js';
import fetchAvailablePlaces from './http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);


  // creating a state to manage the loading Phase
  const [isFetching, setIsFetching] = useState(false);

  //creating state to manage the http error and updating the ui
  const [error, setError] = useState();


  useEffect(() => {


    async function fetchPlaces() {
      setIsFetching(true);
      try {
        
       const places = await fetchAvailablePlaces()

        // using to fetch the current location of the users and sorted places according to the location

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance( places, position.coords.latitude, position.coords.longitude);

          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        })


       
      } catch (error) {
        setError({
          message: error.message || 'Could not fetch places, try again '
        });
      }


      setIsFetching(false);

    }

    fetchPlaces();    // function calling

  }, [])

  if (error) {
    return <Error title="An error occurred!" message={error.message} />
  }

  // anather way but convinent

  // fetch is a browser funality uused to connect backend to frontend which take url of a backend . these fetch method send get request to backend. but now we are using use effect so we can avoid infinite loop

  // const response = await fetch('http://localhost:3000/places');
  // .then((resopnse) => {
  //   return resopnse.json();
  // })

  // .then((resData)=>{
  //   setAvailablePlaces(resData.places)
  // });

  // but these is a big flaw it fall code into infinite loop
  // but we use useeffect to stop from infinite loop




  // Another Way  to store data in localstorage . it fetch data synchroniusly

  // const places = localStorage.getItem('places')
  // const[availablePlaces , setAvailablePlaces] = useState([places])



  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText='Fetching Places Data..'
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
