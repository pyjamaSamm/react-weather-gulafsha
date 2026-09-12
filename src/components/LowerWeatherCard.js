import React, { useEffect, useState } from 'react';
import "../components/styles.css";
import icons, { iconFor } from '../assets/icons';

function LowerWeatherCard(
    { temp, humidity, pressure, weather, weatherDesc, icon, name, windspeed, sunset, country, arr }
) {
    console.log(arr)
    let d1
    const [t1, forData1] = useState("")
    const [t2, forData2] = useState("")
    const [t3, forData3] = useState("")
    const [t4, forData4] = useState("")
    const [weatherState, setWeatherState] = useState(icons.cloudy)
    const [weatherState2, setWeatherState2] = useState(icons.cloudy)
    const [weatherState3, setWeatherState3] = useState(icons.cloudy)
    const [weatherState4, setWeatherState4] = useState(icons.cloudy)
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
                    setWeatherState(iconFor(description))
                }
                description = arr[2]["desc"];
                date_desc = arr[2]["date"].split(" ")[1]
                date_desc += " " + arr[2]["date"].split(" ")[0]
                arr[2]["date"] = date_desc;
                d1 = `${arr[2]["temp"]}` + "/" + date_desc + "/" + description;
                forData2(d1)
                if (description != null) {
                    setWeatherState2(iconFor(description))
                }
                description = arr[3]["desc"];
                date_desc = arr[3]["date"].split(" ")[1]
                date_desc += " " + arr[3]["date"].split(" ")[0]
                arr[3]["date"] = date_desc;
                d1 = `${arr[3]["temp"]}` + "/" + date_desc + "/" + description;
                forData3(d1)
                if (description != null) {
                    setWeatherState3(iconFor(description))
                }

                description = arr[4]["desc"];
                date_desc = arr[4]["date"].split(" ")[1]
                date_desc += " " + arr[4]["date"].split(" ")[0]
                arr[4]["date"] = date_desc;
                d1 = `${arr[4]["temp"]}` + "/" + date_desc + "/" + description;
                forData4(d1)
                if (description != null) {
                    setWeatherState4(iconFor(description))
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