import { useState } from 'react';
import Places from './Places.jsx';
import { useEffect } from 'react';

export default function AvailablePlaces({ onSelectPlace }) {
  const[availablePlaces , setAvailablePlaces] = useState([])

  useEffect(() => {


    async function fetchPlaces(){
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();
      setAvailablePlaces(resData.places);

    }

    fetchPlaces();

  } , [])

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


  
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
