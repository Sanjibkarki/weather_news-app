import { useState, useEffect } from 'react';

import ReactLoading from 'react-loading';
import Weather from './weather';
function Currentlocation() {
    const [datas, setDatas] = useState(null)
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
    const [latitude,setlatitude] = useState(undefined)
    const [longitude,setlongitude] = useState(undefined)
    
  useEffect(() => {
    function handleLocation(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setlatitude(lat);
      setlongitude(lon);
      getWeatherData(lat, lon);
    }

    function handleLocationError(error) {
      alert('You blocked access to your location service');
      setError('Geolocation is not supported by your browser.');
      setIsLoading(false);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocation, handleLocationError);
    } 
    else {
      setError('Geolocation is not supported by your browser.');
      setIsLoading(false);
    }
  }, []);
  function getWeatherData(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${'ff6fcb3353243264649306a235b5a2c6'}`)
      .then((response) => response.json())
      .then((data) => {
        setDatas(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Error fetching weather data.');
        setIsLoading(false);
      });
  }

  useEffect(() => {
    const timerID = setInterval(() => {
      if (latitude!==undefined && longitude!==undefined){
        getWeatherData(latitude,longitude)
      }
    }, 20000);
    return () => {
      clearInterval(timerID);
    };
    
  }, [latitude, longitude]);

    return (
        <>
            {loading ?
                (<div className='main-box'>
                    <div className='load'>
                        <div className='index'>
                            <ReactLoading className='s' type={'spokes'} color={'blue'} height={'20%'} width={'20%'} />
                            <h3>please wait while loading</h3>
                        </div>

                    </div>
                </div>)
                : error
                    ? <p>No Access</p>
                    : <Weather data={datas}/>
            }


        </>
    )
}
export default Currentlocation;