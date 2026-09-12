import React, { useEffect, useState } from 'react';
import "../components/styles.css";
import icons, { iconFor } from '../assets/icons';

function WeatherCard(
    //props
    { temp, humidity, pressure, weather, weatherDesc, name, windspeed, sunset, sunrise, dt, country }
) {
    //   return (
    //     <div>
    //     </div>
    //   )
    //   -----------------same as
    //   return (
    //     <> 
    //     </>
    //   )

    //for changing weather icon
    const [weatherState, setWeatherState] = useState(icons.day)

    let sunsetTime

    // before the first lookup returns, name and country are both undefined -
    // building the string unconditionally used to paint the word "undefined"
    // next to the location pin.
    let location = ""
    if (name != null) {
        location = country != null ? `${name}, ${country}` : `${name}`
    }

    if (sunset) {
        let sec = sunset;
        let date = new Date(sec * 1000) //converts sec to ms
        sunsetTime = `${date.getHours()}:${date.getMinutes()} PM`
    } 
    else sunsetTime="--"
    useEffect(() => {
        if (weather == null) return
        // dt, sunrise and sunset are all UTC epochs straight from the API, so this
        // compares three points on the same timeline - no local-clock conversion,
        // which is what made cities in other timezones show a sun after dark.
        let isNight = !!(dt && sunrise && sunset) && (dt < sunrise || dt >= sunset)
        setWeatherState(iconFor(weather, isNight))
        // dt changes on every lookup, so the icon re-evaluates even when two
        // cities in a row report the same condition.
    }, [weather, sunrise, sunset, dt])

    return (
        <>

            <div className='search'>
                <div className='tempCard'>
                    <div>
                        <img src={weatherState} alt={weatherDesc || "weather icon"} className='weatherImg' />
                    </div>
                    <div className='rightCard'>
                        <div className='temp'>
                            {temp}<sup className='celsius'>&deg;C</sup>
                            {/* 23<sup className='celsius'>&deg;C</sup> */}
                        </div>
                        <div>
                            <div>{weatherDesc}</div>
                            <div className='cityName'><img src={icons.location} alt='location icon' className='locationIcon'></img>{location}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <br />
                </div>
                <div className='cardLower'>
                    <div className="humidity">
                        <div className="humidityVal">
                            {humidity}
                            <hr />
                        </div>
                        <div className="humidityText">
                            Humidity
                        </div>
                    </div>
                    <div className="pressure">
                        <div className="pressureVal">
                            {pressure}
                            <hr />
                        </div>
                        <div className="pressureText">
                            Pressure
                        </div>
                    </div>
                    <div className="wind">
                        <div className="windVal">
                            {windspeed}
                            <hr />
                        </div>
                        <div className="windText">
                            Wind Speed
                        </div>
                    </div>
                    <div className="sunset">
                        <div className="sunsetVal">
                            {sunsetTime}
                            <hr />
                        </div>
                        <div className="sunsetText">
                            Sunset
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WeatherCard