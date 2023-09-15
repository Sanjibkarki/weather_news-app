import { useEffect, useState } from "react";
import { WiRaindrop, WiStrongWind, WiCloudy } from 'weather-icons-react';
import ReactAnimatedWeather from 'react-animated-weather';

function Weather({ data }) {
    const [db, setdb] = useState(data)
    const [clouds, setclouds] = useState(db.clouds.all)
    const [main, setmain] = useState(db.main)
    const [name, setname] = useState(db.name)
    const [city_name, setcity] = useState(data.name)
    const [country, setcountry] = useState(db.sys.country)
    const [weather, setweather] = useState(db.weather)
    const [wind, setwind] = useState(db.wind)
    const [icon, setIcon] = useState("CLEAR_DAY")

    useEffect(() => {

        setcountry(db.sys.country)
        setname(db.name)
        setwind(db.wind);
        setclouds(db.clouds.all);
        setmain(db.main);
        setweather(db.weather);
        switch (weather[0].main) {
            case "Haze":
                setIcon("CLEAR_DAY");
                break;
            case "Clouds":
                setIcon("CLOUDY");
                break;
            case "Rain":
                setIcon("RAIN");
                break;
            case "Snow":
                setIcon("SNOW");
                break;
            case "Dust":
                setIcon("WIND");
                break;
            case "Drizzle":
                setIcon("SLEET");
                break;
            case "Fog":
                setIcon("FOG");
                break;
            case "Mist" || "Smoke":
                setIcon("FOG");
                break;
            case "Tornado":
                setIcon("WIND");
                break;
            case "Thunderstorm":
                setIcon("PARTLY_CLOUDY_NIGHT")
                break;
            default:
                setIcon("CLEAR_DAY");
        }
    }, [db, weather]);

    useEffect(() => {

        const api = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${'ff6fcb3353243264649306a235b5a2c6'}`
        fetch(api)
            .then((data) => data.json())
            .then((res) => { setdb(res) })
    }, [data])
    function change() {
        const a = async function () {
            try {

                const api = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${'ff6fcb3353243264649306a235b5a2c6'}`
                const db = await fetch(api)
                if ((!db.ok)) {
                    throw new Error('failed to fetch')
                }
                const c = await db.json()
                setdb(c)
            }
            catch (error) {
                console.log(error)
                alert(`The ${city_name} city does not exist`)
            }
        }
        a()
    }
    return (
        <>
            <div className="window">
                <div className="weather-content">
                    <div className="content-box">
                        <div className="content-I">
                            <div>
                                <input onChange={(e) => { const a = e.target.value; setcity(a) }} type="text" style={{ height: "20px" }} />
                                <i onClick={change} style={{ padding: "5px", margin: "5px", cursor: "pointer", fontSize: "20px" }} className="fa-solid fa-magnifying-glass-location"></i>
                            </div>
                            <div className="item-I">
                                <div className="data-I">
                                    <WiRaindrop size={35} color='#000' />
                                    <p>{main.humidity}</p>

                                </div>
                                <div className="data-I">
                                    <WiStrongWind size={35} color='#000' />
                                    <p>{wind.speed}</p>
                                </div>
                                <div className="data-I">
                                    <WiCloudy size={35} color='#000' />
                                    <p>{clouds}</p>

                                </div>
                            </div>
                        </div>
                        <div className="content-II">
                            <div className="icon">
                                <ReactAnimatedWeather
                                    icon={icon}
                                    color='white'
                                    size={43}
                                    animate={true}
                                />
                                <p>{Math.round(main.feels_like - 273)}°C</p>
                                <p>{weather[0].description}</p>
                                <i style={{ color: "black" }}>{name},{country}</i>
                            </div>


                        </div>
                        <div className="temp">
                            <p>C temp<span>:</span>{Math.round(main.feels_like) - 273}°C</p>
                            <p>M temp<span>:</span>{Math.round(main.temp_max) - 273}°C</p>
                            <p>m temp<span>:</span>{Math.round(main.temp_min) - 273}°C</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Weather;