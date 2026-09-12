# Weather App

A React weather app that looks up current conditions for any city and shows a four-day outlook alongside them. Built with Create React App against the OpenWeather API.

**Live:** https://pyjamaSamm.github.io/react-weather-gulafsha

Search a city and you get temperature in °C, a written description, humidity, pressure, wind speed and sunset time, plus a row of forecast cards. The weather icon changes with the conditions and switches to a night variant after the searched city's sunset. The app opens on Kolkata.

## How it works

Everything hangs off one component. [`Search.js`](src/components/Search.js) owns the input, calls the API and holds the response in a single `tempInfo` object, which it spreads into the two display components as props:

```
Search.js  ──┬─→  WeatherCard.js       current conditions + the big icon
             └─→  LowerWeatherCard.js  four forecast cards
```

Two requests per lookup:

| Endpoint | Used for |
| --- | --- |
| `/data/2.5/weather?q={city}` | current conditions, and the `lat`/`lon` for the second call |
| `/data/2.5/forecast?lat=&lon=` | the forecast row |

The forecast endpoint returns readings every three hours. `Search.js` samples indexes `9, 17, 25, 33` out of that list — roughly 27, 51, 75 and 99 hours out — so each card lands about a day apart at a similar time of day.

### Day vs. night icons

`dt`, `sys.sunrise` and `sys.sunset` in the response are all UTC epochs, so [`WeatherCard.js`](src/components/WeatherCard.js) compares them directly:

```js
let isNight = !!(dt && sunrise && sunset) && (dt < sunrise || dt >= sunset)
```

This deliberately avoids `new Date().getHours()`. Comparing the browser's clock against a sunset in another timezone reads as daytime whenever the two straddle local midnight — searching London from India in the morning would show a sun after dark.


### Icons

The icons are hand-written SVGs in [`src/assets/icons/`](src/assets/icons/), animated with CSS inside each file, so they run from a plain `<img src>` with no library and no network request.

| File | Conditions (OpenWeather `main`) |
| --- | --- |
| `day.svg` | `Clear` before sunset, and the fallback for anything unrecognised |
| `night.svg` | `Clear` after sunset |
| `cloudy-day.svg` | `Clouds` before sunset |
| `cloudy-night.svg` | `Clouds` after sunset |
| `cloudy.svg` | `Haze`, `Mist`, `Fog`, `Smoke`, `Dust` |
| `rainy.svg` | `Rain`, `Drizzle` |
| `thunder.svg` | `Thunder`, `Thunderstorm` |
| `snowy.svg` | `Snow` |
| `location.svg` | the pin next to the city name |

The mapping lives in one place, [`src/assets/icons/index.js`](src/assets/icons/index.js), as `iconFor(weather, isNight)` — both cards call it, so adding a condition is a one-file change. Every icon also carries a `prefers-reduced-motion: reduce` block that parks it in a still frame.

## Running it locally

You need your own OpenWeather API key — a free one from [openweathermap.org/api](https://openweathermap.org/api) covers both endpoints used here. `.env` is gitignored, so a fresh clone has no key.

```bash
git clone https://github.com/pyjamaSamm/react-weather-gulafsha.git
cd react-weather-gulafsha
npm install

echo "REACT_APP_API_KEY=your_key_here" > .env

npm start
```

Then open http://localhost:3000.

The `REACT_APP_` prefix is required — Create React App only exposes variables with that prefix to the browser. Changing `.env` needs a dev-server restart; it is read at build time, not on reload.


## Deploying

`homepage` in `package.json` points at the GitHub Pages URL, and `gh-pages` publishes the build:

```bash
npm run deploy   # runs the build first via predeploy
```

`index.js` wraps the app in `HashRouter` so the Pages URL keeps working — a static host has no server-side routing to fall back on. No routes are defined yet; the router is there for when they are.

## Project layout

```
public/
  index.html          favicon.svg alongside it is local, not hosted
src/
  index.js            entry point, wraps <App> in HashRouter
  App.js              renders <Search>
  assets/icons/       the animated SVG set + iconFor() mapping
  components/
    Search.js         input, both API calls, shared state
    WeatherCard.js    current conditions
    LowerWeatherCard.js  forecast row
    styles.css        styles for all three components
```

## Input handling

The search box is normalised before the request goes out: ends trimmed, runs of inner whitespace collapsed to a single space (OpenWeather rejects `new  york`), and the result passed through `encodeURIComponent`. An empty box skips the request entirely.

## Note
No UI or charting libraries — the icons and layout are hand-written.
