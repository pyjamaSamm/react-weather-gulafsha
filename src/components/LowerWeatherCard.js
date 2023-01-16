import React, { useEffect, useState } from 'react';
import "../components/styles.css";

function LowerWeatherCard(
    { temp, humidity, pressure, weather, weatherDesc, icon, name, windspeed, sunset, country, arr }
) {
    console.log(arr)
    let d1
    const [t1, forData1] = useState("")
    const [t2, forData2] = useState("")
    const [t3, forData3] = useState("")
    const [t4, forData4] = useState("")
    const [weatherState, setWeatherState] = useState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy.svg?alt=media&token=25408052-f921-4b43-9810-cf1feba1a167")
    const [weatherState2, setWeatherState2] = useState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy.svg?alt=media&token=25408052-f921-4b43-9810-cf1feba1a167")
    const [weatherState3, setWeatherState3] = useState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy.svg?alt=media&token=25408052-f921-4b43-9810-cf1feba1a167")
    const [weatherState4, setWeatherState4] = useState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy.svg?alt=media&token=25408052-f921-4b43-9810-cf1feba1a167")
    useEffect(() => {
        try {
            if (typeof (arr) !== undefined || arr.length === undefined) {
                let description, date_desc
                description = arr[1]["desc"];
                date_desc = arr[1]["date"].split(" ")[1]
                date_desc += " " + arr[1]["date"].split(" ")[0]
                arr[1]["date"] = date_desc;
                d1 = `${arr[1]["temp"]}` + "/" + date_desc + "/" + description;
                console.log(arr[1]["date"])
                console.log("d1 "+ d1)
                forData1(d1)
                if (description != null) {
                    switch (description) {
                        case "Clouds":
                            setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy.svg?alt=media&token=25408052-f921-4b43-9810-cf1feba1a167")
                            break;
                        case "Fog":
                        case "Mist":
                        case "Haze":
                            setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy.svg?alt=media&token=25408052-f921-4b43-9810-cf1feba1a167")
                            break;
                        case "Clear":
                            setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/day.svg?alt=media&token=c05777c6-714c-433d-910c-b4ece5ff47e3")
                            break;
                        case "Rain":
                            setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/rainy-6.svg?alt=media&token=52cf8077-8eee-4ee4-b556-151e057077cb")
                            break;
                        case "Thunder":
                            setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/thunder.svg?alt=media&token=857cc305-adb0-4861-a7fc-5a99489606b9")
                            break;
                        case "Snow":
                            setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/snowy-5.svg?alt=media&token=f9535c51-92ac-46c0-8d28-575506db7c0f")
                            break;
                        default:
                            setWeatherState("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/snowy-5.svg?alt=media&token=f9535c51-92ac-46c0-8d28-575506db7c0f")
                            break;
                    }
                }
                description = arr[2]["desc"];
                date_desc = arr[2]["date"].split(" ")[1]
                date_desc += " " + arr[2]["date"].split(" ")[0]
                arr[2]["date"] = date_desc;
                d1 = `${arr[2]["temp"]}` + "/" + date_desc + "/" + description;
                forData2(d1)
                if (description != null) {
                    switch (description) {
                        case "Clouds":
                            setWeatherState2("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy.svg?alt=media&token=25408052-f921-4b43-9810-cf1feba1a167")
                            break;
                        case "Fog":
                        case "Mist":
                        case "Haze":
                            setWeatherState2("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy.svg?alt=media&token=25408052-f921-4b43-9810-cf1feba1a167")
                            break;
                        case "Clear":
                            setWeatherState2("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/day.svg?alt=media&token=c05777c6-714c-433d-910c-b4ece5ff47e3")
                            break;
                        case "Rain":
                            setWeatherState2("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/rainy-6.svg?alt=media&token=52cf8077-8eee-4ee4-b556-151e057077cb")
                            break;
                        case "Thunder":
                            setWeatherState2("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/thunder.svg?alt=media&token=857cc305-adb0-4861-a7fc-5a99489606b9")
                            break;
                        case "Snow":
                            setWeatherState2("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/snowy-5.svg?alt=media&token=f9535c51-92ac-46c0-8d28-575506db7c0f")
                            break;
                        default:
                            setWeatherState2("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/snowy-5.svg?alt=media&token=f9535c51-92ac-46c0-8d28-575506db7c0f")
                            break;
                    }
                }
                description = arr[3]["desc"];
                date_desc = arr[3]["date"].split(" ")[1]
                date_desc += " " + arr[3]["date"].split(" ")[0]
                arr[3]["date"] = date_desc;
                d1 = `${arr[3]["temp"]}` + "/" + date_desc + "/" + description;
                forData3(d1)
                if (description != null) {
                    switch (description) {
                        case "Clouds":
                            setWeatherState3("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy.svg?alt=media&token=25408052-f921-4b43-9810-cf1feba1a167")
                            break;
                        case "Fog":
                        case "Mist":
                        case "Haze":
                            setWeatherState3("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy.svg?alt=media&token=25408052-f921-4b43-9810-cf1feba1a167")
                            break;
                        case "Clear":
                            setWeatherState3("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/day.svg?alt=media&token=c05777c6-714c-433d-910c-b4ece5ff47e3")
                            break;
                        case "Rain":
                            setWeatherState3("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/rainy-6.svg?alt=media&token=52cf8077-8eee-4ee4-b556-151e057077cb")
                            break;
                        case "Thunder":
                            setWeatherState3("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/thunder.svg?alt=media&token=857cc305-adb0-4861-a7fc-5a99489606b9")
                            break;
                        case "Snow":
                            setWeatherState3("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/snowy-5.svg?alt=media&token=f9535c51-92ac-46c0-8d28-575506db7c0f")
                            break;
                        default:
                            setWeatherState3("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/snowy-5.svg?alt=media&token=f9535c51-92ac-46c0-8d28-575506db7c0f")
                            break;
                    }
                }

                description = arr[4]["desc"];
                date_desc = arr[4]["date"].split(" ")[1]
                date_desc += " " + arr[4]["date"].split(" ")[0]
                arr[4]["date"] = date_desc;
                d1 = `${arr[4]["temp"]}` + "/" + date_desc + "/" + description;
                forData4(d1)
                if (description != null) {
                    switch (description) {
                        case "Clouds":
                            setWeatherState4("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy.svg?alt=media&token=25408052-f921-4b43-9810-cf1feba1a167")
                            break;
                        case "Fog":
                        case "Mist":
                        case "Haze":
                            setWeatherState4("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/cloudy.svg?alt=media&token=25408052-f921-4b43-9810-cf1feba1a167")
                            break;
                        case "Clear":
                            setWeatherState4("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/day.svg?alt=media&token=c05777c6-714c-433d-910c-b4ece5ff47e3")
                            break;
                        case "Rain":
                            setWeatherState4("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/rainy-6.svg?alt=media&token=52cf8077-8eee-4ee4-b556-151e057077cb")
                            break;
                        case "Thunder":
                            setWeatherState4("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/thunder.svg?alt=media&token=857cc305-adb0-4861-a7fc-5a99489606b9")
                            break;
                        case "Snow":
                            setWeatherState4("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/snowy-5.svg?alt=media&token=f9535c51-92ac-46c0-8d28-575506db7c0f")
                            break;
                        default:
                            setWeatherState4("https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/snowy-5.svg?alt=media&token=f9535c51-92ac-46c0-8d28-575506db7c0f")
                            break;
                    }
                }
            }
        } catch (err) {

        }
    }, [name])


    return (
        <div className='lowerDiv'>
            <div className="day">
                <div>
                    <img src={weatherState} alt="weather icon" />
                </div>
                <div className='descTexr'>
                    {t1.split("/")[2]}
                    <hr />
                </div>
                <div className="val">
                    {t1.split("/")[0]}&deg;
                </div>
                <div className="dayText">
                    {t1.split("/")[1]}
                </div>


            </div>
            <div className="day1">
                <div>
                    <img src={weatherState2} alt="weather icon" />
                </div>
                <div className='descTexr'>
                    {t2.split("/")[2]}
                    <hr />
                </div>
                <div className="val">
                    {t2.split("/")[0]}&deg;
                </div>
                <div className="dayText">
                    {t2.split("/")[1]}
                </div>
            </div>
            <div className="day1 spl">
                <div>
                    <img src={weatherState3} alt="weather icon" />
                </div>
                <div className='descTexr'>
                    {t3.split("/")[2]}
                    <hr />
                </div>
                <div className="val">
                    {t3.split("/")[0]}&deg;
                </div>
                <div className="dayText">
                    {t3.split("/")[1]}
                </div>
            </div>
            <div className="day1 spl">
                <div>
                    <img src={weatherState4} alt="weather icon" />
                </div>
                <div className='descTexr'>
                    {t4.split("/")[2]}
                    <hr />
                </div>
                <div className="val">
                    {t4.split("/")[0]}&deg;
                </div>
                <div className="dayText">
                    {t4.split("/")[1]}
                </div>
            </div>
        </div >
    )
}

export default LowerWeatherCard