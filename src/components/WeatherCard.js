import React, { useEffect, useState } from 'react';
import "../components/styles.css";

function WeatherCard(
    //props
    { temp, humidity, pressure, weather, weatherDesc, icon, name, windspeed, sunset, country, arr }
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
    const [weatherState, setWeatherState] = useState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/day.svg?alt=media&token=c05777c6-714c-433d-910c-b4ece5ff47e3")

    let sunsetTime
    let months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let day = new Date().toLocaleString().split(",")[0].split("/")[0]
    let mon = months[parseInt(new Date().toLocaleString().split(",")[0].split("/")[1])]
    let year = new Date().toLocaleString().split(",")[0].split("/")[2]
    let formattedDate = `${day} ${mon}, ${year}`

    let location
    if(name!=null)
    location = `${name}, ${country}`
    else location=""

    if(country==null){
        location = `${name}`
    }

    if (sunset) {
        let sec = sunset;
        // console.log(sunset)
        let date = new Date(sec * 1000) //converts sec to ms
        sunsetTime = `${date.getHours()}:${date.getMinutes()} PM`
    } 
    else sunsetTime="--"
    if(typeof(sunsetTime)==undefined){
        console.log("")
    }
    useEffect(() => {
        let timeofday = new Date().toLocaleString().split(",")[1]
        timeofday = timeofday.split(":")[0]
        if (weather != null) {
            switch (weather) {
                case "Clouds":
                    if (parseInt(timeofday) >= parseInt(sunsetTime.split(":")[0])) {
                        setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy-night-1.svg?alt=media&token=f24c29ba-49c4-46ff-a68b-44df1b0cd5b1")
                    }
                    else if (parseInt(timeofday) >= 9) {
                        setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy-day-1.svg?alt=media&token=cd5a7e2c-b1de-4113-aaea-0d6f0ae4579a")
                    }
                    else {
                        setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy.svg?alt=media&token=25408052-f921-4b43-9810-cf1feba1a167")
                    }
                    break;
                case "Haze":
                    setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy.svg?alt=media&token=25408052-f921-4b43-9810-cf1feba1a167")
                    break;
                case "Clear":
                    if (parseInt(timeofday) >= parseInt(sunsetTime.split(":")[0])) {
                        setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/night.svg?alt=media&token=d47b39e4-6932-4f28-a91e-8ed9ef72545f")
                    }
                    else {
                        setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/day.svg?alt=media&token=c05777c6-714c-433d-910c-b4ece5ff47e3")
                    }
                    break;
                case "Mist":
                    setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy.svg?alt=media&token=25408052-f921-4b43-9810-cf1feba1a167")
                    break;
                case "Rain":
                    setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/rainy-6.svg?alt=media&token=52cf8077-8eee-4ee4-b556-151e057077cb")
                    break;
                case "Thunder":
                    setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/thunder.svg?alt=media&token=857cc305-adb0-4861-a7fc-5a99489606b9")
                    break;
                case "Fog":
                    setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy.svg?alt=media&token=25408052-f921-4b43-9810-cf1feba1a167")
                    break;
                case "Snow":
                    if (parseInt(timeofday) < 14) {
                        setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy.svg?alt=media&token=25408052-f921-4b43-9810-cf1feba1a167")
                    }
                    else {
                        setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/snowy-5.svg?alt=media&token=f9535c51-92ac-46c0-8d28-575506db7c0f")
                    }
                    break;
                default:
                    setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/day.svg?alt=media&token=c05777c6-714c-433d-910c-b4ece5ff47e3")
                    break;
            }
        }
    }, [weather]) //each time weather changes function inside this useEffect will be executed

    return (
        <>

            <div className='search'>
                <div className='tempCard'>
                    <div>
                        <img src={weatherState} alt="" className='weatherImg' />
                    </div>
                    <div className='rightCard'>
                        <div className='temp'>
                            {temp}<sup className='celsius'>&deg;C</sup>
                            {/* 23<sup className='celsius'>&deg;C</sup> */}
                        </div>
                        <div>
                            <div>{weatherDesc}</div>
                            <div className='cityName'><img src="https://cdn-icons-png.flaticon.com/512/3416/3416100.png" alt='location icon' className='locationIcon'></img>{location}</div>
                            {/* <div className='date'>{formattedDate}</div> */}
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