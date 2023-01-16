import React, { useEffect, useState } from 'react';
import "../components/styles.css"
import WeatherCard from './WeatherCard';
import LowerWeatherCard from './LowerWeatherCard';

function Search() {
    // pass the city to be searched
    // const [cityToSearch, functionName] = useState("default value")
    // functionName is responsible for changing the value of cityToSearch(aka value=searchTerm)
    //kolkata is the default value
    const [searchTerm, searchTermFunction] = useState("kolkata");
    const [isStart, setIsStart] = useState(false);

    //({}) empty object will help us send all the details to weather card for displaying it
    const [tempInfo, setTempInfo] = useState({})

    let count = 0;
    const getWeatherInfo = async () => {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
            let result = await fetch(url);
            let data = await result.json();

            //if(data.cod >=400)alert("OOps we encountered some error! Try again later");

            const { lon, lat } = data.coord
            let arr = [
                {
                    temp: String,
                    date: String,
                    desc: String,
                    link: String,
                }
                
            ];
            if (lat != null && lon != null) {
                count++;
                let url5days = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
                let result5 = await fetch(url5days)
                let data2 = await result5.json();
                // console.log(data2)
                let dates = ["9", "17", "25", "33", "39"];
                for (let i = 0; i < dates.length; i++) {
                    let ind = dates[i];
                    let day1 = data2.list[ind]["main"]["temp"];
                    let day1_date = data2.list[ind]["dt_txt"].split(" ")[0]
                    console.log("date:: "+day1_date)
                    let day1_date_format = new Date(day1_date).toString().split(" ")[0]
                    day1_date_format += " " + new Date(day1_date).toString().split(" ")[2]
                    let des = data2.list[ind]["weather"]["0"]["main"]
                    if(day1_date_format==="Invalid undefined") day1_date_format=""
                    let data = {
                        temp: day1,
                        date: day1_date_format,
                        desc: des,
                        link: "https://firebasestorage.googleapis.com/v0/b/weather-react-74239.appspot.com/o/day.svg?alt=media&token=c05777c6-714c-433d-910c-b4ece5ff47e3"
                    }
                    arr.push(data)
                }
            }
            else {
                for (let i = 1; i <= 7; i++) {
                    let nv = {
                        temp: "xxx",
                        date: new Date(),
                        desc: "weather"
                    }
                    arr.push(nv)
                }
            }

            //destructure
            const { temp, humidity, pressure } = data.main;

            // giving custom name to "main" under weather
            let { main: weather, description: weatherDesc, icon } = data.weather[0]
            const { name } = data; //name of the place
            let windspeed = data["wind"]["speed"]
            let sunset = data["sys"]["sunset"]
            let { country } = data.sys

            let foundData = {}
            //make object of the found data to send it
            if (lat != null && lon != null && arr.length!=0) {
                foundData = {
                    temp, humidity, pressure, weather, weatherDesc, icon, name, windspeed, sunset, country, arr
                };
            }
            else{
                foundData = {
                    temp, humidity, pressure, weather, weatherDesc, icon, name, windspeed, sunset, country
                };
            }
        
            setTempInfo(foundData); //[tempInfo, setTempInfo] above...now tempInfo will be filled with values of foundData

        } catch (error) {
            console.log(error)
            if(count>1)
            alert("OOps we encountered some error! Please try again later or try checking your input.")
        }
    }
    useEffect(() => {
        if (count === 0)
            getWeatherInfo()
        if (isStart)
            getWeatherInfo()
        //call it only when the page refreshes hence []
        setIsStart(false)
    }, [isStart])

    return (
        <>
        
            <WeatherCard {...tempInfo} />
            <div className="search">
                {/* onChange listens when value is being entered and will trigger the respective function (using inline function here) */}
                {/* e.target.value holds whatever is being typed and will send it to searchTermFunction */}
                <input type="search" placeholder='City Name' id='search' value={searchTerm} onChange={(e) => searchTermFunction(e.target.value)} />
                <button className='searchButton' onClick={() => setIsStart(true)}>
                    {/* onClick={getWeatherInfo} */}
                    Forecast
                </button>
            </div>
            
            <LowerWeatherCard {...tempInfo} />
            <br />
            <p>Gulafsha's Weather App
        </p>
            <br />
        </>
    )
}

export default Search
